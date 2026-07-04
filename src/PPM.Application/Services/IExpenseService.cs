using PPM.Application.DTOs;

namespace PPM.Application.Services;

public interface IExpenseService
{
    Task<ExpenseDto> CreateAsync(CreateExpenseDto dto);
    Task<IEnumerable<ExpenseDto>> GetAllAsync(int userId);
    Task<ExpenseDto?> GetByIdAsync(int id);
    Task<bool> UpdateAsync(UpdateExpenseDto dto);
    Task<bool> DeleteAsync(int id);
    Task<decimal> GetMonthlyTotalAsync(int userId, int month, int year);
    Task<MonthlyExpenseSummaryDto> GetMonthlySummaryAsync(int userId, int month, int year);
}
