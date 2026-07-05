namespace PPM.Domain.Entities;

public class CreditCard
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Name { get; set; } = string.Empty;       // Ej: "Visa Personal"
    public decimal AvailableBalance { get; set; }          // Límite disponible
    public decimal InitialBalance { get; set; }            // Saldo inicial cargado al registrar la tarjeta
    public decimal CurrentDebt { get; set; }               // Saldo actual DERIVADO (mantenido por el servicio)
    public decimal MonthlyInterestRate { get; set; }       // Tasa mensual en %
    public int ClosingDay { get; set; }                    // Día de cierre/vencimiento
    public decimal MinPaymentPercentage { get; set; } = 0.05m; // 5% fijo por defecto
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public User User { get; set; } = null!;
    public ICollection<CreditCardPayment> Payments { get; set; } = [];   // Historial de cierres
    public ICollection<CardMovement> Movements { get; set; } = [];       // Libro de consumos/pagos

    // Estos cálculos trabajan sobre el saldo actual y se usan al momento del cierre.
    public decimal CalculateMonthlyInterest() =>
     CurrentDebt <= 0 ? 0 : CurrentDebt * (MonthlyInterestRate / 100);

    public decimal CalculateTotalDebtWithInterest() =>
        CurrentDebt <= 0 ? 0 : CurrentDebt + CalculateMonthlyInterest();

    public decimal CalculateMinimumPayment() =>
        CurrentDebt <= 0 ? 0 : CalculateTotalDebtWithInterest() * MinPaymentPercentage;
}
