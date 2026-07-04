using PPM.Application.DTOs;
using PPM.Domain.Entities;
using PPM.Domain.Enums;
using PPM.Domain.Interfaces;

namespace PPM.Application.Services;

public class CreditCardService(ICreditCardRepository creditCardRepository) : ICreditCardService
{
    public async Task<CreditCardDto> CreateAsync(CreateCreditCardDto dto)
    {
        var card = new CreditCard
        {
            UserId = dto.UserId,
            Name = dto.Name,
            AvailableBalance = dto.AvailableBalance,
            InitialBalance = dto.InitialBalance,
            CurrentDebt = dto.InitialBalance, // al crearla, el saldo es el mismo que el inicial
            MonthlyInterestRate = dto.MonthlyInterestRate,
            ClosingDay = dto.ClosingDay
        };

        await creditCardRepository.AddAsync(card);

        return MapToDto(card);
    }

    public async Task<IEnumerable<CreditCardDto>> GetAllAsync(int userId)
    {
        var cards = await creditCardRepository.GetAllByUserAsync(userId);
        return cards.Select(MapToDto);
    }

    public async Task<CreditCardDto?> GetByIdAsync(int id)
    {
        var card = await creditCardRepository.GetByIdAsync(id);
        return card is null ? null : MapToDto(card);
    }

    public async Task<bool> UpdateAsync(UpdateCreditCardDto dto)
    {
        try
        {
            var card = await creditCardRepository.GetByIdAsync(dto.Id);
            if (card is null)
                return false;

            // Desde la edición solo tocamos los datos de la tarjeta. El saldo nunca se
            // escribe a mano: sale siempre de sumar y restar los movimientos.
            card.Name = dto.Name;
            card.AvailableBalance = dto.AvailableBalance;
            card.MonthlyInterestRate = dto.MonthlyInterestRate;
            card.ClosingDay = dto.ClosingDay;

            await creditCardRepository.UpdateAsync(card);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public async Task<bool> DeleteAsync(int id)
    {
        try
        {
            await creditCardRepository.DeleteAsync(id);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public async Task<PaymentResultDto> RegisterConsumoAsync(RegisterMovementDto dto)
    {
        try
        {
            var card = await creditCardRepository.GetByIdAsync(dto.CreditCardId);
            if (card is null)
                return new PaymentResultDto(false, "Tarjeta de crédito no encontrada.");
            if (dto.Amount <= 0)
                return new PaymentResultDto(false, "El monto del consumo debe ser mayor a cero.");

            await creditCardRepository.AddMovementAsync(new CardMovement
            {
                CreditCardId = card.Id,
                Type = CardMovementType.Consumo,
                Amount = dto.Amount,
                Description = string.IsNullOrWhiteSpace(dto.Description) ? "Consumo" : dto.Description
            });

            await RecomputeBalanceAsync(card);
            return new PaymentResultDto(true, "Consumo registrado correctamente.", card.CurrentDebt);
        }
        catch (Exception ex)
        {
            return new PaymentResultDto(false, $"Error al registrar el consumo: {ex.Message}");
        }
    }

    public async Task<PaymentResultDto> RegisterPaymentAsync(RegisterMovementDto dto)
    {
        try
        {
            var card = await creditCardRepository.GetByIdAsync(dto.CreditCardId);
            if (card is null)
                return new PaymentResultDto(false, "Tarjeta de crédito no encontrada.");
            if (dto.Amount <= 0)
                return new PaymentResultDto(false, "El monto del pago debe ser mayor a cero.");

            await creditCardRepository.AddMovementAsync(new CardMovement
            {
                CreditCardId = card.Id,
                Type = CardMovementType.Pago,
                Amount = dto.Amount,
                Description = string.IsNullOrWhiteSpace(dto.Description) ? "Pago" : dto.Description
            });

            await RecomputeBalanceAsync(card);
            return new PaymentResultDto(true, "Pago registrado correctamente.", card.CurrentDebt);
        }
        catch (Exception ex)
        {
            return new PaymentResultDto(false, $"Error al registrar el pago: {ex.Message}");
        }
    }

    public async Task<PaymentResultDto> ProcessClosingAsync(RegisterPaymentDto dto)
    {
        try
        {
            var card = await creditCardRepository.GetByIdAsync(dto.CreditCardId);
            if (card is null)
                return new PaymentResultDto(false, "Tarjeta de crédito no encontrada.");

            var saldo = card.CurrentDebt;

            // Si el usuario ya pagó todo lo que consumió, el cierre no genera interés
            // ni exige un pago mínimo. Es el caso de quien usa la tarjeta como medio de pago.
            if (saldo <= 0)
            {
                await creditCardRepository.AddPaymentAsync(new CreditCardPayment
                {
                    CreditCardId = card.Id,
                    PaidAmount = 0,
                    DebtBeforePayment = 0,
                    DebtAfterPayment = 0,
                    InterestApplied = 0,
                    MinimumPaymentRequired = 0,
                    MetMinimumPayment = true
                });
                return new PaymentResultDto(true, "Cierre sin saldo: no se aplicó interés ni pago mínimo.", 0);
            }

            // Si arrastra saldo, ahí sí se cobra interés sobre lo no pagado y se le
            // exige cubrir al menos el pago mínimo.
            var interest = saldo * (card.MonthlyInterestRate / 100);
            var totalWithInterest = saldo + interest;
            var minimumPayment = totalWithInterest * card.MinPaymentPercentage;

            if (dto.PaidAmount < minimumPayment)
                return new PaymentResultDto(false, "El monto ingresado no cubre el pago mínimo exigido.");

            // Anotamos el interés como un consumo más y el pago del cierre como un pago,
            // así el saldo sigue saliendo naturalmente de la suma de los movimientos.
            await creditCardRepository.AddMovementAsync(new CardMovement
            {
                CreditCardId = card.Id,
                Type = CardMovementType.Consumo,
                Amount = interest,
                Description = "Interés de cierre"
            });
            await creditCardRepository.AddMovementAsync(new CardMovement
            {
                CreditCardId = card.Id,
                Type = CardMovementType.Pago,
                Amount = dto.PaidAmount,
                Description = "Pago de cierre"
            });

            await RecomputeBalanceAsync(card);

            await creditCardRepository.AddPaymentAsync(new CreditCardPayment
            {
                CreditCardId = card.Id,
                PaidAmount = dto.PaidAmount,
                DebtBeforePayment = saldo,
                DebtAfterPayment = card.CurrentDebt,
                InterestApplied = interest,
                MinimumPaymentRequired = minimumPayment,
                MetMinimumPayment = true
            });

            return new PaymentResultDto(true, "Cierre procesado correctamente.", card.CurrentDebt);
        }
        catch (Exception ex)
        {
            return new PaymentResultDto(false, $"Error al procesar el cierre: {ex.Message}");
        }
    }

    public async Task<IEnumerable<CardMovementDto>> GetMovementsAsync(int cardId)
    {
        var movements = await creditCardRepository.GetMovementsAsync(cardId);
        return movements.Select(m => new CardMovementDto(m.Id, m.Type, m.Amount, m.Date, m.Description));
    }

    public async Task<IEnumerable<CreditCardPaymentDto>> GetPaymentsAsync(int cardId)
    {
        var payments = await creditCardRepository.GetPaymentsAsync(cardId);
        return payments.Select(p => new CreditCardPaymentDto(
            p.Id, p.PaidAmount, p.DebtBeforePayment, p.DebtAfterPayment,
            p.InterestApplied, p.MinimumPaymentRequired, p.MetMinimumPayment, p.PaymentDate));
    }

    // Recalcula el saldo desde cero: parte del saldo inicial, suma todos los consumos
    // y resta todos los pagos. Nunca queda por debajo de cero.
    private async Task RecomputeBalanceAsync(CreditCard card)
    {
        var movements = await creditCardRepository.GetMovementsAsync(card.Id);
        var consumos = movements.Where(m => m.Type == CardMovementType.Consumo).Sum(m => m.Amount);
        var pagos = movements.Where(m => m.Type == CardMovementType.Pago).Sum(m => m.Amount);

        var saldo = card.InitialBalance + consumos - pagos;
        card.CurrentDebt = saldo < 0 ? 0 : saldo;

        await creditCardRepository.UpdateAsync(card);
    }

    private static CreditCardDto MapToDto(CreditCard card) =>
        new(card.Id, card.Name, card.AvailableBalance, card.InitialBalance, card.CurrentDebt,
            card.MonthlyInterestRate, card.ClosingDay, card.CalculateMonthlyInterest(),
            card.CalculateTotalDebtWithInterest(), card.CalculateMinimumPayment());
}
