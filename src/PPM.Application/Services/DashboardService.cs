using PPM.Application.DTOs;
using PPM.Domain.Enums;

namespace PPM.Application.Services;

public class DashboardService(
    ISalaryService salaryService,
    IDebtService debtService,
    IExpenseService expenseService,
    ICreditCardService creditCardService) : IDashboardService
{
    public async Task<DashboardDto> GetDashboardAsync(int userId)
    {
        var now = DateTime.UtcNow;

        var currentSalaryDto = await salaryService.GetCurrentAsync(userId);
        var grossSalary = currentSalaryDto?.Amount ?? 0m;
        var netSalary = currentSalaryDto?.NetAmount ?? 0m;
        var ipsDiscount = grossSalary - netSalary;

        var debts = (await debtService.GetAllAsync(userId)).ToList();
        var activeDebts = debts.Where(d => d.Status == DebtStatus.Active).ToList();
        var totalMonthlyDebts = activeDebts.Sum(d => d.MonthlyPayment);

        var totalMonthlyExpenses = await expenseService.GetMonthlyTotalAsync(userId, now.Month, now.Year);

        var cards = (await creditCardService.GetAllAsync(userId)).ToList();
        var totalCreditDebt = cards.Sum(c => c.CurrentDebt);
        var totalCreditMinimumPayments = cards.Sum(c => c.MinimumPayment);
        // Cada tarjeta tiene su propia tasa, así que sumamos el interés de una por una.
        var totalCreditInterest = cards.Sum(c => c.MonthlyInterest);

        // Lo que realmente le queda al usuario parte del salario neto (ya sin el IPS)
        // y le restamos las cuotas de deudas, los gastos y el mínimo de las tarjetas.
        var availableBalance = netSalary
            - totalMonthlyDebts
            - totalMonthlyExpenses
            - totalCreditMinimumPayments;

        return new DashboardDto(
            CurrentSalary: netSalary,
            TotalMonthlyDebts: totalMonthlyDebts,
            TotalMonthlyExpenses: totalMonthlyExpenses,
            AvailableBalance: availableBalance,
            ActiveDebtsCount: activeDebts.Count,
            CreditCardsCount: cards.Count,
            TotalCreditDebt: totalCreditDebt,
            TotalCreditMinimumPayments: totalCreditMinimumPayments,
            TotalCreditInterest: totalCreditInterest,
            GrossSalary: grossSalary,
            IpsDiscount: ipsDiscount);
    }
}
