using PPM.Application.DTOs;
using PPM.Domain.Entities;
using PPM.Domain.Exceptions;
using PPM.Domain.Interfaces;

namespace PPM.Application.Services;

public class IncomeService(IIncomeRepository incomeRepository) : IIncomeService
{
    public async Task<IncomeDto> CreateAsync(CreateIncomeDto dto)
    {
        if (dto.Amount <= 0)
            throw new BusinessRuleException("El monto del ingreso extra debe ser mayor a cero.");

        if (string.IsNullOrWhiteSpace(dto.Description))
            throw new BusinessRuleException("La descripción es obligatoria.");

        var income = new Income
        {
            UserId = dto.UserId,
            Description = dto.Description.Trim(),
            Amount = dto.Amount,
            Type = dto.Type,
            Date = dto.Date,
            Month = dto.Month,
            Year = dto.Year
        };

        await incomeRepository.AddAsync(income);

        return MapToDto(income);
    }

    public async Task DeleteAsync(int id)
    {
        await incomeRepository.DeleteAsync(id);
    }

    public async Task<IEnumerable<IncomeDto>> GetAllAsync(int userId)
    {
        var incomes = await incomeRepository.GetAllAsync(userId);
        return incomes.Select(MapToDto);
    }

    public async Task<IEnumerable<IncomeDto>> GetByMonthAsync(int userId, int month, int year)
    {
        var incomes = await incomeRepository.GetByMonthAsync(userId, month, year);
        return incomes.Select(MapToDto);
    }

    public async Task<decimal> GetMonthlyTotalAsync(int userId, int month, int year)
    {
        return await incomeRepository.GetMonthlyTotalAsync(userId, month, year);
    }

    private static IncomeDto MapToDto(Income income) =>
        new(income.Id, income.Description, income.Amount, income.Type, income.Date);
}
