using PPM.Application.DTOs;

namespace PPM.Application.Services;

public interface IDebtService
{
    Task<DebtDto> CreateAsync(CreateDebtDto dto);
    Task<IEnumerable<DebtDto>> GetAllAsync(int userId);
    Task<DebtDto?> GetByIdAsync(int id);
    Task<bool> UpdateAsync(UpdateDebtDto dto);
    Task<bool> DeleteAsync(int id);
}
