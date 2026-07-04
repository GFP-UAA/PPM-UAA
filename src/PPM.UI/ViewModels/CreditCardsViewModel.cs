using System;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using PPM.Application.DTOs;
using PPM.Application.Services;

namespace PPM.UI.ViewModels;

public partial class CreditCardsViewModel(ICreditCardService creditCardService) : ModuleViewModelBase
{
    public ObservableCollection<CreditCardDto> Items { get; } = [];
    public ObservableCollection<CardMovementDto> Movements { get; } = [];
    public ObservableCollection<CreditCardPaymentDto> Payments { get; } = [];

    [ObservableProperty] private CreditCardDto? _selectedItem;

    // --- Formulario CRUD ---
    [ObservableProperty] private int? _editingId;
    [ObservableProperty] private string _name = string.Empty;
    [ObservableProperty] private decimal _availableBalance;
    [ObservableProperty] private decimal _initialBalance;
    [ObservableProperty] private decimal _monthlyInterestRate;
    [ObservableProperty] private int _closingDay = 1;

    // --- Movimientos / cierre ---
    [ObservableProperty] private decimal _consumoAmount;
    [ObservableProperty] private string _consumoDescription = string.Empty;
    [ObservableProperty] private decimal _pagoAmount;
    [ObservableProperty] private string _pagoDescription = string.Empty;
    [ObservableProperty] private decimal _closingAmount;
    [ObservableProperty] private string? _actionMessage;

    public bool IsEditing => EditingId is not null;
    public bool IsNew => EditingId is null;

    public override Task LoadAsync() => RunGuardedAsync(async () =>
    {
        Items.Clear();
        foreach (var c in await creditCardService.GetAllAsync(UserId))
            Items.Add(c);
    });

    partial void OnSelectedItemChanged(CreditCardDto? value)
    {
        ActionMessage = null;
        StatusMessage = null;
        ErrorMessage = null;

        if (value is null)
        {
            Movements.Clear();
            Payments.Clear();
            return;
        }

        EditingId = value.Id;
        Name = value.Name;
        AvailableBalance = value.AvailableBalance;
        InitialBalance = value.InitialBalance;
        MonthlyInterestRate = value.MonthlyInterestRate;
        ClosingDay = value.ClosingDay;
        OnPropertyChanged(nameof(IsEditing));
        OnPropertyChanged(nameof(IsNew));

        _ = LoadCardDetailsAsync(value.Id);
    }

    private async Task LoadCardDetailsAsync(int cardId) => await RunGuardedAsync(async () =>
    {
        Movements.Clear();
        foreach (var m in await creditCardService.GetMovementsAsync(cardId))
            Movements.Add(m);

        Payments.Clear();
        foreach (var pmt in await creditCardService.GetPaymentsAsync(cardId))
            Payments.Add(pmt);
    });

    [RelayCommand]
    private void New()
    {
        SelectedItem = null;
        EditingId = null;
        Name = string.Empty;
        AvailableBalance = 0;
        InitialBalance = 0;
        MonthlyInterestRate = 0;
        ClosingDay = 1;
        ConsumoAmount = 0;
        ConsumoDescription = string.Empty;
        PagoAmount = 0;
        PagoDescription = string.Empty;
        ClosingAmount = 0;
        ActionMessage = null;
        Movements.Clear();
        Payments.Clear();
        OnPropertyChanged(nameof(IsEditing));
        OnPropertyChanged(nameof(IsNew));
        StatusMessage = null;
        ErrorMessage = null;
    }

    [RelayCommand]
    private async Task SaveAsync()
    {
        StatusMessage = null;
        ErrorMessage = null;

        if (string.IsNullOrWhiteSpace(Name))
        {
            ErrorMessage = "El nombre de la tarjeta es obligatorio.";
            return;
        }
        if (AvailableBalance < 0 || InitialBalance < 0 || MonthlyInterestRate < 0)
        {
            ErrorMessage = "Los montos y la tasa no pueden ser negativos.";
            return;
        }
        if (ClosingDay is < 1 or > 31)
        {
            ErrorMessage = "El día de cierre debe estar entre 1 y 31.";
            return;
        }

        await RunGuardedAsync(async () =>
        {
            if (EditingId is null)
            {
                await creditCardService.CreateAsync(
                    new CreateCreditCardDto(UserId, Name, AvailableBalance, InitialBalance, MonthlyInterestRate, ClosingDay));
                StatusMessage = "Tarjeta creada correctamente.";
            }
            else
            {
                var ok = await creditCardService.UpdateAsync(
                    new UpdateCreditCardDto(EditingId.Value, Name, AvailableBalance, MonthlyInterestRate, ClosingDay));
                StatusMessage = ok ? "Tarjeta actualizada correctamente." : "No se pudo actualizar la tarjeta.";
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
            ErrorMessage = "Seleccioná una tarjeta para eliminar.";
            return;
        }

        await RunGuardedAsync(async () =>
        {
            var ok = await creditCardService.DeleteAsync(EditingId.Value);
            StatusMessage = ok ? "Tarjeta eliminada." : "No se pudo eliminar la tarjeta.";
            await LoadAsync();
            New();
        });
    }

    [RelayCommand]
    private Task RegisterConsumoAsync() => RunMovementAsync(
        () => creditCardService.RegisterConsumoAsync(new RegisterMovementDto(EditingId!.Value, ConsumoAmount, ConsumoDescription)),
        () => { ConsumoAmount = 0; ConsumoDescription = string.Empty; });

    [RelayCommand]
    private Task RegisterPagoAsync() => RunMovementAsync(
        () => creditCardService.RegisterPaymentAsync(new RegisterMovementDto(EditingId!.Value, PagoAmount, PagoDescription)),
        () => { PagoAmount = 0; PagoDescription = string.Empty; });

    [RelayCommand]
    private Task ProcessClosingAsync() => RunMovementAsync(
        () => creditCardService.ProcessClosingAsync(new RegisterPaymentDto(EditingId!.Value, ClosingAmount)),
        () => { ClosingAmount = 0; });

    private async Task RunMovementAsync(Func<Task<PaymentResultDto>> action, Action onSuccess)
    {
        ActionMessage = null;
        ErrorMessage = null;

        if (EditingId is null)
        {
            ErrorMessage = "Seleccioná una tarjeta primero.";
            return;
        }

        await RunGuardedAsync(async () =>
        {
            var result = await action();
            ActionMessage = result.Message;
            if (result.Success)
            {
                onSuccess();
                var cardId = EditingId.Value;
                await LoadAsync();
                // Reseleccionar para refrescar saldo, movimientos e historial.
                SelectedItem = Items.FirstOrDefault(c => c.Id == cardId);
            }
        });
    }
}
