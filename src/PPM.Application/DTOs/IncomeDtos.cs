using PPM.Domain.Enums;

namespace PPM.Application.DTOs;

public record CreateIncomeDto(
    int UserId,
    string Description,
    decimal Amount,
    IncomeType Type,
    DateTime Date,
    int Month,
    int Year
);

public record IncomeDto(
    int Id,
    string Description,
    decimal Amount,
    IncomeType Type,
    DateTime Date
);
