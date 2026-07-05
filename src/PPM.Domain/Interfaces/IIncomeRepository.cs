using PPM.Domain.Entities;

namespace PPM.Domain.Interfaces;

public interface IIncomeRepository
{
    Task AddAsync(Income income);
    Task DeleteAsync(int id);
    Task<IEnumerable<Income>> GetAllAsync(int userId);
    Task<IEnumerable<Income>> GetByMonthAsync(int userId, int month, int year);
    Task<decimal> GetMonthlyTotalAsync(int userId, int month, int year);
}
