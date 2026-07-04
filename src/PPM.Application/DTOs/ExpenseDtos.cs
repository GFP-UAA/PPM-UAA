using PPM.Domain.Enums;

namespace PPM.Application.DTOs;

public record CreateExpenseDto(int UserId, string Description, decimal Amount, ExpenseType Type, DateTime Date);
public record UpdateExpenseDto(int Id, string Description, decimal Amount, ExpenseType Type, DateTime Date);
public record ExpenseDto(int Id, string Description, decimal Amount, ExpenseType Type, DateTime Date);
public record MonthlyExpenseSummaryDto(int Month, int Year, decimal Total, decimal SalaryPercentage, IEnumerable<ExpenseDto> Expenses);
