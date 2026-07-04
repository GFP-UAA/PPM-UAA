using System;
using System.Collections.ObjectModel;
using System.Threading.Tasks;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using PPM.Application.DTOs;
using PPM.Application.Services;
using PPM.Domain.Enums;

namespace PPM.UI.ViewModels;

public partial class ExpensesViewModel(IExpenseService expenseService) : ModuleViewModelBase
{
    public ObservableCollection<ExpenseDto> Items { get; } = [];

    public ExpenseType[] Types { get; } = Enum.GetValues<ExpenseType>();

    [ObservableProperty] private ExpenseDto? _selectedItem;

    // --- Formulario ---
    [ObservableProperty] private int? _editingId;
    [ObservableProperty] private string _description = string.Empty;
    [ObservableProperty] private decimal? _amount;
    [ObservableProperty] private ExpenseType _type = ExpenseType.Other;
    [ObservableProperty] private DateTimeOffset? _date = DateTimeOffset.Now;

    // --- Resumen mensual ---
    [ObservableProperty] private int? _summaryMonth = DateTime.Now.Month;
    [ObservableProperty] private int? _summaryYear = DateTime.Now.Year;
    [ObservableProperty] private decimal _monthlyTotal;
    [ObservableProperty] private decimal _salaryPercentage;
    [ObservableProperty] private decimal _previousMonthTotal;
    [ObservableProperty] private decimal _monthDelta;
    [ObservableProperty] private decimal _monthDeltaPercentage;

    public bool IsEditing => EditingId is not null;

    public override Task LoadAsync() => RunGuardedAsync(async () =>
    {
        Items.Clear();
        foreach (var e in await expenseService.GetAllAsync(UserId))
            Items.Add(e);

        await RefreshSummaryInternalAsync();
    });

    private async Task RefreshSummaryInternalAsync()
    {
        if (SummaryMonth is null || SummaryYear is null)
            return;

        var summary = await expenseService.GetMonthlySummaryAsync(UserId, SummaryMonth.Value, SummaryYear.Value);
        MonthlyTotal = summary.Total;
        SalaryPercentage = summary.SalaryPercentage;

        var prev = new DateTime(SummaryYear.Value, SummaryMonth.Value, 1).AddMonths(-1);
        PreviousMonthTotal = await expenseService.GetMonthlyTotalAsync(UserId, prev.Month, prev.Year);
        MonthDelta = MonthlyTotal - PreviousMonthTotal;
        MonthDeltaPercentage = PreviousMonthTotal > 0
            ? Math.Round(MonthDelta / PreviousMonthTotal * 100, 2)
            : (MonthlyTotal > 0 ? 100m : 0m);
    }

    [RelayCommand]
    private Task RefreshSummaryAsync() => RunGuardedAsync(RefreshSummaryInternalAsync);

    partial void OnSelectedItemChanged(ExpenseDto? value)
    {
        if (value is null)
            return;

        EditingId = value.Id;
        Description = value.Description;
        Amount = value.Amount;
        Type = value.Type;
        Date = new DateTimeOffset(value.Date);
        OnPropertyChanged(nameof(IsEditing));
        StatusMessage = null;
        ErrorMessage = null;
    }

    [RelayCommand]
    private void New()
    {
        SelectedItem = null;
        EditingId = null;
        Description = string.Empty;
        Amount = 0;
        Type = ExpenseType.Other;
        Date = DateTimeOffset.Now;
        OnPropertyChanged(nameof(IsEditing));
        StatusMessage = null;
        ErrorMessage = null;
    }

    [RelayCommand]
    private async Task SaveAsync()
    {
        StatusMessage = null;
        ErrorMessage = null;

        if (string.IsNullOrWhiteSpace(Description))
        {
            ErrorMessage = "La descripción del gasto es obligatoria.";
            return;
        }
        if (Amount is null || Amount <= 0)
        {
            ErrorMessage = "El monto del gasto debe ser mayor a cero.";
            return;
        }

        await RunGuardedAsync(async () =>
        {
            if (EditingId is null)
            {
                await expenseService.CreateAsync(new CreateExpenseDto(UserId, Description, Amount.Value, Type, (Date ?? DateTimeOffset.Now).DateTime));
                StatusMessage = "Gasto creado correctamente.";
            }
            else
            {
                var ok = await expenseService.UpdateAsync(new UpdateExpenseDto(EditingId.Value, Description, Amount.Value, Type, (Date ?? DateTimeOffset.Now).DateTime));
                StatusMessage = ok ? "Gasto actualizado correctamente." : "No se pudo actualizar el gasto.";
            }

            await LoadAsync();
            New();
        });
    }

    [RelayCommand]
    private async Task DeleteAsync()
    {
        if (EditingId is null)
        {
            ErrorMessage = "Seleccioná un gasto para eliminar.";
            return;
        }

        await RunGuardedAsync(async () =>
        {
            var ok = await expenseService.DeleteAsync(EditingId.Value);
            StatusMessage = ok ? "Gasto eliminado." : "No se pudo eliminar el gasto.";
            await LoadAsync();
            New();
        });
    }
}
