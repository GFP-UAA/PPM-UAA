namespace PPM.Application.DTOs;

public record DashboardDto(
    decimal CurrentSalary,          // Salario NETO (base del saldo disponible)
    decimal TotalMonthlyDebts,
    decimal TotalMonthlyExpenses,
    decimal AvailableBalance,
    int ActiveDebtsCount,
    int CreditCardsCount,
    decimal TotalCreditDebt,
    decimal TotalCreditMinimumPayments,
    decimal TotalCreditInterest,
    decimal GrossSalary,            // Salario bruto declarado
    decimal IpsDiscount             // Descuento por aporte al IPS (bruto - neto)
);
