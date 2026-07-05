using PPM.Application.DTOs;
using PPM.Domain.Entities;
using PPM.Domain.Interfaces;
using PPM.Domain.Exceptions;
using System;

namespace PPM.Application.Services;

public class DebtService(IDebtRepository debtRepository) : IDebtService
{
    public async Task<DebtDto> CreateAsync(CreateDebtDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.EntityName))
            throw new BusinessRuleException("El nombre de la entidad es obligatorio.");
        if (dto.InstallmentAmount <= 0)
            throw new BusinessRuleException("El monto de la cuota debe ser mayor a cero.");
        if (!dto.IsOpenEnded && (dto.TermMonths is null || dto.TermMonths <= 0))
            throw new BusinessRuleException("El plazo en meses debe ser mayor a cero (o marcá plazo indefinido).");
        if (dto.CurrentInstallment < 0)
            throw new BusinessRuleException("El número de cuota actual no puede ser negativo.");

        try
        {
            var debt = new Debt
            {
                UserId = dto.UserId,
                EntityName = dto.EntityName,
                ProductOrService = dto.ProductOrService,
                Description = dto.Description,
                InstallmentAmount = dto.InstallmentAmount,
                TermMonths = dto.IsOpenEnded ? null : dto.TermMonths,
                IsOpenEnded = dto.IsOpenEnded,
                CurrentInstallment = dto.CurrentInstallment,
                StartDate = dto.StartDate
            };

            await debtRepository.AddAsync(debt);

            return MapToDto(debt);
        }
        catch (Exception ex)
        {
            throw new BusinessRuleException($"Error al crear la deuda: {ex.Message}");
        }
    }

    public async Task<IEnumerable<DebtDto>> GetAllAsync(int userId)
    {
        var debts = await debtRepository.GetAllByUserAsync(userId);
        return debts.Select(MapToDto);
    }

    public async Task<DebtDto?> GetByIdAsync(int id)
    {
        var debt = await debtRepository.GetByIdAsync(id);
        return debt is null ? null : MapToDto(debt);
    }

    public async Task<bool> UpdateAsync(UpdateDebtDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.EntityName))
            throw new BusinessRuleException("El nombre de la entidad es obligatorio.");
        if (dto.InstallmentAmount <= 0)
            throw new BusinessRuleException("El monto de la cuota debe ser mayor a cero.");
        if (!dto.IsOpenEnded && (dto.TermMonths is null || dto.TermMonths <= 0))
            throw new BusinessRuleException("El plazo en meses debe ser mayor a cero (o marcá plazo indefinido).");
        if (dto.CurrentInstallment < 0)
            throw new BusinessRuleException("El número de cuota actual no puede ser negativo.");

        try
        {
            var debt = await debtRepository.GetByIdAsync(dto.Id);
            if (debt is null)
                return false;

            debt.EntityName = dto.EntityName;
            debt.ProductOrService = dto.ProductOrService;
            debt.Description = dto.Description;
            debt.InstallmentAmount = dto.InstallmentAmount;
            debt.TermMonths = dto.IsOpenEnded ? null : dto.TermMonths;
            debt.IsOpenEnded = dto.IsOpenEnded;
            debt.CurrentInstallment = dto.CurrentInstallment;
            debt.Status = dto.Status;

            await debtRepository.UpdateAsync(debt);
            return true;
        }
        catch (Exception ex)
        {
            throw new BusinessRuleException($"Error al actualizar la deuda: {ex.Message}");
        }
    }

    public async Task<bool> DeleteAsync(int id)
    {
        try
        {
            await debtRepository.DeleteAsync(id);
            return true;
        }
        catch (Exception ex)
        {
            throw new BusinessRuleException($"Error al eliminar la deuda: {ex.Message}");
        }
    }

    private static DebtDto MapToDto(Debt debt) =>
        new(debt.Id,
            debt.EntityName,
            debt.ProductOrService,
            debt.Description,
            debt.InstallmentAmount,
            debt.TermMonths,
            debt.IsOpenEnded,
            debt.CurrentInstallment,
            debt.StartDate,
            debt.Status,
            debt.MonthlyPayment,
            debt.TotalAmount,
            debt.RemainingInstallments,
            debt.RemainingAmount,
            debt.EstimatedPayoffDate);
}
