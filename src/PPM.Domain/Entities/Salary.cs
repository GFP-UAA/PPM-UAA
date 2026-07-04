using PPM.Domain.Constants;

namespace PPM.Domain.Entities;

public class Salary
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public decimal Amount { get; set; }          // Salario bruto en Guaraníes
    public DateTime EffectiveFrom { get; set; }  // Fecha desde cuando aplica
    public bool ContributesToIps { get; set; }   // Si aporta el 9% al IPS
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public User User { get; set; } = null!;

    // Salario neto: si el usuario aporta al IPS, le descontamos el 9% del bruto.
    public decimal NetAmount =>
        ContributesToIps ? Amount * (1 - FinancialConstants.IpsEmployeeRate) : Amount;
}
