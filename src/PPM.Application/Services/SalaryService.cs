using PPM.Application.DTOs;
using PPM.Domain.Entities;
using PPM.Domain.Interfaces;
using PPM.Domain.Exceptions;
using System;

namespace PPM.Application.Services;

public class SalaryService(ISalaryRepository salaryRepository) : ISalaryService
{
    public async Task<SalaryDto> CreateAsync(CreateSalaryDto dto)
    {
        if (dto.Amount <= 0)
            throw new BusinessRuleException("El monto del salario debe ser mayor a cero.");

        try
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
        catch (Exception ex)
        {
            throw new BusinessRuleException($"Error al registrar el salario: {ex.Message}");
        }
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
