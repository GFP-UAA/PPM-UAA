using PPM.Domain.Enums;

namespace PPM.Domain.Entities;

public class Expense
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Description { get; set; } = string.Empty;
    public decimal Amount { get; set; }          // En Guaraníes
    public ExpenseType Type { get; set; } = ExpenseType.Other;
    public DateTime Date { get; set; } = DateTime.UtcNow;
    public int Month { get; set; }               // Mes al que pertenece
    public int Year { get; set; }                // Año al que pertenece

    public User User { get; set; } = null!;
}
