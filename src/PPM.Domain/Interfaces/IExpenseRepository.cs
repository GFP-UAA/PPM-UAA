using PPM.Domain.Entities;

namespace PPM.Domain.Interfaces;

public interface IExpenseRepository
{
    Task<IEnumerable<Expense>> GetByMonthAsync(int userId, int month, int year);
    Task<IEnumerable<Expense>> GetAllByUserAsync(int userId);
    Task<Expense?> GetByIdAsync(int id);
    Task AddAsync(Expense expense);
    Task UpdateAsync(Expense expense);
    Task DeleteAsync(int id);
    Task<decimal> GetMonthlyTotalAsync(int userId, int month, int year);
}
