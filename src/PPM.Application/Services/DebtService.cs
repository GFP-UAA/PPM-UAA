using PPM.Application.DTOs;
using PPM.Domain.Entities;
using PPM.Domain.Interfaces;

namespace PPM.Application.Services;

public class DebtService(IDebtRepository debtRepository) : IDebtService
{
    public async Task<DebtDto> CreateAsync(CreateDebtDto dto)
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
        catch
        {
            return false;
        }
    }

    public async Task<bool> DeleteAsync(int id)
    {
        try
        {
            await debtRepository.DeleteAsync(id);
            return true;
        }
        catch
        {
            return false;
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
