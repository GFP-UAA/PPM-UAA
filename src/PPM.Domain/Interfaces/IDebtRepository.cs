using PPM.Domain.Entities;

namespace PPM.Domain.Interfaces;

public interface IDebtRepository
{
    Task<IEnumerable<Debt>> GetAllByUserAsync(int userId);
    Task<Debt?> GetByIdAsync(int id);
    Task AddAsync(Debt debt);
    Task UpdateAsync(Debt debt);
    Task DeleteAsync(int id);
}
