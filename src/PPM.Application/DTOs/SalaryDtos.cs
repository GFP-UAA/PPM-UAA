namespace PPM.Application.DTOs;

public record CreateSalaryDto(int UserId, decimal Amount, DateTime EffectiveFrom, bool ContributesToIps);
public record SalaryDto(int Id, decimal Amount, DateTime EffectiveFrom, bool ContributesToIps, decimal NetAmount);
