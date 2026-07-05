using PPM.Application.DTOs;
using PPM.Domain.Entities;
using PPM.Domain.Interfaces;
using PPM.Domain.Exceptions;
using System;

namespace PPM.Application.Services;

public class ExpenseService(IExpenseRepository expenseRepository, ISalaryService salaryService) : IExpenseService
{
    public async Task<ExpenseDto> CreateAsync(CreateExpenseDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Description))
            throw new BusinessRuleException("La descripción es obligatoria.");
        if (dto.Amount <= 0)
            throw new BusinessRuleException("El monto del gasto debe ser mayor a cero.");

        try
        {
            var expense = new Expense
            {
                UserId = dto.UserId,
                Description = dto.Description,
                Amount = dto.Amount,
                Type = dto.Type,
                Date = dto.Date,
                Month = dto.Date.Month,
                Year = dto.Date.Year
            };

            await expenseRepository.AddAsync(expense);

            return MapToDto(expense);
        }
        catch (Exception ex)
        {
            throw new BusinessRuleException($"Error al registrar el gasto: {ex.Message}");
        }
    }

    public async Task<IEnumerable<ExpenseDto>> GetAllAsync(int userId)
    {
        var expenses = await expenseRepository.GetAllByUserAsync(userId);
        return expenses.Select(MapToDto);
    }

    public async Task<ExpenseDto?> GetByIdAsync(int id)
    {
        var expense = await expenseRepository.GetByIdAsync(id);
        return expense is null ? null : MapToDto(expense);
    }

    public async Task<bool> UpdateAsync(UpdateExpenseDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Description))
            throw new BusinessRuleException("La descripción es obligatoria.");
        if (dto.Amount <= 0)
            throw new BusinessRuleException("El monto del gasto debe ser mayor a cero.");

        try
        {
            var expense = await expenseRepository.GetByIdAsync(dto.Id);
            if (expense is null)
                return false;

            expense.Description = dto.Description;
            expense.Amount = dto.Amount;
            expense.Type = dto.Type;
            expense.Date = dto.Date;
            expense.Month = dto.Date.Month;
            expense.Year = dto.Date.Year;

            await expenseRepository.UpdateAsync(expense);
            return true;
        }
        catch (Exception ex)
        {
            throw new BusinessRuleException($"Error al actualizar el gasto: {ex.Message}");
        }
    }

    public async Task<bool> DeleteAsync(int id)
    {
        try
        {
            await expenseRepository.DeleteAsync(id);
            return true;
        }
        catch (Exception ex)
        {
            throw new BusinessRuleException($"Error al eliminar el gasto: {ex.Message}");
        }
    }

    public Task<decimal> GetMonthlyTotalAsync(int userId, int month, int year) =>
        expenseRepository.GetMonthlyTotalAsync(userId, month, year);

    public async Task<MonthlyExpenseSummaryDto> GetMonthlySummaryAsync(int userId, int month, int year)
    {
        var expenses = (await expenseRepository.GetByMonthAsync(userId, month, year)).ToList();
        var total = expenses.Sum(e => e.Amount);

        var currentSalary = await salaryService.GetCurrentAsync(userId);
        var salaryPercentage = currentSalary is { Amount: > 0 }
            ? Math.Round(total / currentSalary.Amount * 100, 2)
            : 0m;

        return new MonthlyExpenseSummaryDto(
            month,
            year,
            total,
            salaryPercentage,
            expenses.Select(MapToDto));
    }

    private static ExpenseDto MapToDto(Expense expense) =>
        new(expense.Id, expense.Description, expense.Amount, expense.Type, expense.Date);
}
