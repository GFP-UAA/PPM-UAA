using PPM.Domain.Enums;

namespace PPM.Application.DTOs;

public record CreateDebtDto(
    int UserId,
    string EntityName,
    string ProductOrService,
    string Description,
    decimal InstallmentAmount,
    int? TermMonths,
    bool IsOpenEnded,
    int CurrentInstallment,
    DateTime StartDate);

public record UpdateDebtDto(
    int Id,
    string EntityName,
    string ProductOrService,
    string Description,
    decimal InstallmentAmount,
    int? TermMonths,
    bool IsOpenEnded,
    int CurrentInstallment,
    DebtStatus Status);

public record DebtDto(
    int Id,
    string EntityName,
    string ProductOrService,
    string Description,
    decimal InstallmentAmount,
    int? TermMonths,
    bool IsOpenEnded,
    int CurrentInstallment,
    DateTime StartDate,
    DebtStatus Status,
    decimal MonthlyPayment,
    decimal? TotalAmount,
    int? RemainingInstallments,
    decimal? RemainingAmount,
    DateTime? EstimatedPayoffDate);
