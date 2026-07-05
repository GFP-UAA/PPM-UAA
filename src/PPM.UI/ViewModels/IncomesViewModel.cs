using System;
using System.Collections.ObjectModel;
using System.Threading.Tasks;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using PPM.Application.DTOs;
using PPM.Application.Services;
using PPM.Domain.Enums;

namespace PPM.UI.ViewModels;

public partial class IncomesViewModel(IIncomeService incomeService) : ModuleViewModelBase
{
    public ObservableCollection<IncomeDto> Items { get; } = [];

    public IncomeType[] Types { get; } = Enum.GetValues<IncomeType>();

    [ObservableProperty] private IncomeDto? _selectedItem;

    // --- Formulario ---
    [ObservableProperty] private int? _editingId;
    [ObservableProperty] private string _description = string.Empty;
    [ObservableProperty] private decimal? _amount;
    [ObservableProperty] private IncomeType _type = IncomeType.Otros;
    [ObservableProperty] private DateTimeOffset? _date = DateTimeOffset.Now;

    // --- Resumen mensual ---
    [ObservableProperty] private int? _summaryMonth = DateTime.Now.Month;
    [ObservableProperty] private int? _summaryYear = DateTime.Now.Year;
    [ObservableProperty] private decimal _monthlyTotal;
    [ObservableProperty] private decimal _previousMonthTotal;
    [ObservableProperty] private decimal _monthDelta;
    [ObservableProperty] private decimal _monthDeltaPercentage;

    public bool IsEditing => EditingId is not null;

    public override Task LoadAsync() => RunGuardedAsync(async () =>
    {
        Items.Clear();
        foreach (var i in await incomeService.GetAllAsync(UserId))
            Items.Add(i);

        await RefreshSummaryInternalAsync();
    });

    private async Task RefreshSummaryInternalAsync()
    {
        if (SummaryMonth is null || SummaryYear is null)
            return;

        MonthlyTotal = await incomeService.GetMonthlyTotalAsync(UserId, SummaryMonth.Value, SummaryYear.Value);

        var prev = new DateTime(SummaryYear.Value, SummaryMonth.Value, 1).AddMonths(-1);
        PreviousMonthTotal = await incomeService.GetMonthlyTotalAsync(UserId, prev.Month, prev.Year);
        MonthDelta = MonthlyTotal - PreviousMonthTotal;
        MonthDeltaPercentage = PreviousMonthTotal > 0
            ? Math.Round(MonthDelta / PreviousMonthTotal * 100, 2)
            : (MonthlyTotal > 0 ? 100m : 0m);
    }

    [RelayCommand]
    private Task RefreshSummaryAsync() => RunGuardedAsync(RefreshSummaryInternalAsync);

    partial void OnSelectedItemChanged(IncomeDto? value)
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
        Type = IncomeType.Otros;
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
            ErrorMessage = "La descripción del ingreso extra es obligatoria.";
            return;
        }
        if (Amount is null || Amount <= 0)
        {
            ErrorMessage = "El monto del ingreso extra debe ser mayor a cero.";
            return;
        }

        await RunGuardedAsync(async () =>
        {
            if (EditingId is null)
            {
                var dt = (Date ?? DateTimeOffset.Now).DateTime;
                await incomeService.CreateAsync(new CreateIncomeDto(UserId, Description, Amount.Value, Type, dt, dt.Month, dt.Year));
                StatusMessage = "Ingreso extra registrado correctamente.";
            }
            else
            {
                // Solo permitimos crear o eliminar por ahora, ya que IncomeService no tiene UpdateAsync.
                ErrorMessage = "La edición no está implementada, por favor elimina y crea uno nuevo.";
                return;
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
            ErrorMessage = "Seleccioná un ingreso extra para eliminar.";
            return;
        }

        await RunGuardedAsync(async () =>
        {
            await incomeService.DeleteAsync(EditingId.Value);
            StatusMessage = "Ingreso extra eliminado.";
            await LoadAsync();
            New();
        });
    }
}
