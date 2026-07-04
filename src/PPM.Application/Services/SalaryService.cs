using PPM.Application.DTOs;
using PPM.Domain.Entities;
using PPM.Domain.Interfaces;

namespace PPM.Application.Services;

public class SalaryService(ISalaryRepository salaryRepository) : ISalaryService
{
    public async Task<SalaryDto> CreateAsync(CreateSalaryDto dto)
    {
        var salary = new Salary
        {
            UserId = dto.UserId,
            Amount = dto.Amount,
            EffectiveFrom = dto.EffectiveFrom,
            ContributesToIps = dto.ContributesToIps
        };

        await salaryRepository.AddAsync(salary);

        return MapToDto(salary);
    }

    public async Task<SalaryDto?> GetCurrentAsync(int userId)
    {
        var salary = await salaryRepository.GetCurrentAsync(userId);
        return salary is null ? null : MapToDto(salary);
    }

    public async Task<IEnumerable<SalaryDto>> GetHistoryAsync(int userId)
    {
        var salaries = await salaryRepository.GetHistoryAsync(userId);
        return salaries.Select(MapToDto);
    }

    private static SalaryDto MapToDto(Salary s) =>
        new(s.Id, s.Amount, s.EffectiveFrom, s.ContributesToIps, s.NetAmount);
}
