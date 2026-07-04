using PPM.Application.DTOs;

namespace PPM.Application.Services;

public interface ISalaryService
{
    Task<SalaryDto> CreateAsync(CreateSalaryDto dto);
    Task<SalaryDto?> GetCurrentAsync(int userId);
    Task<IEnumerable<SalaryDto>> GetHistoryAsync(int userId);
}
