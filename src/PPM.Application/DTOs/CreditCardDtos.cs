using PPM.Domain.Enums;

namespace PPM.Application.DTOs;

public record CreateCreditCardDto(int UserId, string Name, decimal AvailableBalance, decimal InitialBalance, decimal MonthlyInterestRate, int ClosingDay);
public record UpdateCreditCardDto(int Id, string Name, decimal AvailableBalance, decimal MonthlyInterestRate, int ClosingDay);
public record CreditCardDto(int Id, string Name, decimal AvailableBalance, decimal InitialBalance, decimal CurrentDebt, decimal MonthlyInterestRate, int ClosingDay, decimal MonthlyInterest, decimal TotalWithInterest, decimal MinimumPayment);

// Consumo / pago normal (ajustan el saldo, sin exigir mínimo)
public record RegisterMovementDto(int CreditCardId, decimal Amount, string Description);
public record CardMovementDto(int Id, CardMovementType Type, decimal Amount, DateTime Date, string Description);

// Pago de cierre (con interés y validación de pago mínimo)
public record RegisterPaymentDto(int CreditCardId, decimal PaidAmount);
public record PaymentResultDto(bool Success, string Message, decimal? NewBalance = null);
public record CreditCardPaymentDto(
    int Id,
    decimal PaidAmount,
    decimal DebtBeforePayment,
    decimal DebtAfterPayment,
    decimal InterestApplied,
    decimal MinimumPaymentRequired,
    bool MetMinimumPayment,
    DateTime PaymentDate);
