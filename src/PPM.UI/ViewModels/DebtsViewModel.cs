using System;
using System.Collections.ObjectModel;
using System.Threading.Tasks;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using PPM.Application.DTOs;
using PPM.Application.Services;
using PPM.Domain.Enums;

namespace PPM.UI.ViewModels;

public partial class DebtsViewModel(IDebtService debtService) : ModuleViewModelBase
{
    public ObservableCollection<DebtDto> Items { get; } = [];

    public DebtStatus[] Statuses { get; } = Enum.GetValues<DebtStatus>();

    [ObservableProperty] private DebtDto? _selectedItem;

    // --- Formulario ---
    [ObservableProperty] private int? _editingId;
    [ObservableProperty] private string _entityName = string.Empty;
    [ObservableProperty] private string _productOrService = string.Empty;
    [ObservableProperty] private string _description = string.Empty;
    [ObservableProperty] private decimal? _installmentAmount;
    [ObservableProperty] private int? _termMonths = 1;
    [ObservableProperty] private bool _isOpenEnded;
    [ObservableProperty] private int? _currentInstallment;
    [ObservableProperty] private DateTimeOffset? _startDate = DateTimeOffset.Now;
    [ObservableProperty] private DebtStatus _status = DebtStatus.Active;

    public bool IsEditing => EditingId is not null;

    // El plazo solo tiene sentido cargarlo si la deuda no es de plazo indefinido.
    public bool IsTermEnabled => !IsOpenEnded;

    partial void OnIsOpenEndedChanged(bool value) => OnPropertyChanged(nameof(IsTermEnabled));

    public override Task LoadAsync() => RunGuardedAsync(async () =>
    {
        Items.Clear();
        foreach (var d in await debtService.GetAllAsync(UserId))
            Items.Add(d);
    });

    partial void OnSelectedItemChanged(DebtDto? value)
    {
        if (value is null)
            return;

        EditingId = value.Id;
        EntityName = value.EntityName;
        ProductOrService = value.ProductOrService;
        Description = value.Description;
        InstallmentAmount = value.InstallmentAmount;
        IsOpenEnded = value.IsOpenEnded;
        TermMonths = value.TermMonths ?? 1;
        CurrentInstallment = value.CurrentInstallment;
        StartDate = new DateTimeOffset(value.StartDate);
        Status = value.Status;
        OnPropertyChanged(nameof(IsEditing));
        StatusMessage = null;
        ErrorMessage = null;
    }

    [RelayCommand]
    private void New()
    {
        SelectedItem = null;
        EditingId = null;
        EntityName = string.Empty;
        ProductOrService = string.Empty;
        Description = string.Empty;
        InstallmentAmount = 0;
        IsOpenEnded = false;
        TermMonths = 1;
        CurrentInstallment = 0;
        StartDate = DateTimeOffset.Now;
        Status = DebtStatus.Active;
        OnPropertyChanged(nameof(IsEditing));
        StatusMessage = null;
        ErrorMessage = null;
    }

    [RelayCommand]
    private async Task SaveAsync()
    {
        StatusMessage = null;
        ErrorMessage = null;

        if (string.IsNullOrWhiteSpace(EntityName))
        {
            ErrorMessage = "El nombre de la entidad es obligatorio.";
            return;
        }
        if (InstallmentAmount is null || InstallmentAmount <= 0)
        {
            ErrorMessage = "El monto de la cuota debe ser mayor a cero.";
            return;
        }
        if (!IsOpenEnded && (TermMonths is null || TermMonths <= 0))
        {
            ErrorMessage = "El plazo en meses debe ser mayor a cero (o marcá plazo indefinido).";
            return;
        }
        if (CurrentInstallment is null || CurrentInstallment < 0)
        {
            ErrorMessage = "El número de cuota actual no puede ser negativo.";
            return;
        }

        int? term = IsOpenEnded ? null : TermMonths;

        await RunGuardedAsync(async () =>
        {
            if (EditingId is null)
            {
                await debtService.CreateAsync(new CreateDebtDto(
                    UserId, EntityName, ProductOrService, Description,
                    InstallmentAmount.Value, term, IsOpenEnded, CurrentInstallment ?? 0,
                    (StartDate ?? DateTimeOffset.Now).DateTime));
                StatusMessage = "Deuda creada correctamente.";
            }
            else
            {
                var ok = await debtService.UpdateAsync(new UpdateDebtDto(
                    EditingId.Value, EntityName, ProductOrService, Description,
                    InstallmentAmount.Value, term, IsOpenEnded, CurrentInstallment ?? 0, Status));
                StatusMessage = ok ? "Deuda actualizada correctamente." : "No se pudo actualizar la deuda.";
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
            ErrorMessage = "Seleccioná una deuda para eliminar.";
            return;
        }

        await RunGuardedAsync(async () =>
        {
            var ok = await debtService.DeleteAsync(EditingId.Value);
            StatusMessage = ok ? "Deuda eliminada." : "No se pudo eliminar la deuda.";
            await LoadAsync();
            New();
        });
    }
}
