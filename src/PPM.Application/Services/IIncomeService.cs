using PPM.Application.DTOs;

namespace PPM.Application.Services;

public interface IIncomeService
{
    Task<IncomeDto> CreateAsync(CreateIncomeDto dto);
    Task DeleteAsync(int id);
    Task<IEnumerable<IncomeDto>> GetAllAsync(int userId);
    Task<IEnumerable<IncomeDto>> GetByMonthAsync(int userId, int month, int year);
    Task<decimal> GetMonthlyTotalAsync(int userId, int month, int year);
}
