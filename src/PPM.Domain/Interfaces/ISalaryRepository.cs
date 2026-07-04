using PPM.Domain.Entities;

namespace PPM.Domain.Interfaces;

public interface ISalaryRepository
{
    Task<Salary?> GetCurrentAsync(int userId);
    Task<IEnumerable<Salary>> GetHistoryAsync(int userId);
    Task AddAsync(Salary salary);
}
