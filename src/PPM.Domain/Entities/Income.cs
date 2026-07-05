using PPM.Domain.Enums;

namespace PPM.Domain.Entities;

public class Income
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Description { get; set; } = string.Empty;
    public decimal Amount { get; set; }          // En Guaraníes
    public IncomeType Type { get; set; } = IncomeType.Otros;
    public DateTime Date { get; set; } = DateTime.UtcNow;
    public int Month { get; set; }               // Mes al que pertenece
    public int Year { get; set; }                // Año al que pertenece

    public User User { get; set; } = null!;
}
