using PPM.Domain.Enums;

namespace PPM.Domain.Entities;

public class Debt
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string EntityName { get; set; } = string.Empty;        // Nombre de la entidad acreedora
    public string ProductOrService { get; set; } = string.Empty;  // Servicio o producto adquirido
    public string Description { get; set; } = string.Empty;
    public decimal InstallmentAmount { get; set; }                // Monto de la CUOTA (en Guaraníes)
    public int? TermMonths { get; set; }                          // Plazo en meses (null si es indefinido)
    public bool IsOpenEnded { get; set; }                         // Plazo indefinido (obligación recurrente)
    public int CurrentInstallment { get; set; }                   // Nro de cuota actual / ya pagada
    public DateTime StartDate { get; set; }
    public DebtStatus Status { get; set; } = DebtStatus.Activa;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public User User { get; set; } = null!;

    // Lo que sigue se calcula al vuelo a partir de la cuota y el plazo; no se guarda en la base.
    // Cuando la deuda es de plazo indefinido no tiene sentido proyectar total ni fin, así que
    // esas propiedades devuelven null.

    // La cuota mensual es directamente el monto de la cuota que carga el usuario.
    public decimal MonthlyPayment => InstallmentAmount;

    // Total estimado de la deuda (cuota por la cantidad de meses).
    public decimal? TotalAmount =>
        TermMonths.HasValue ? InstallmentAmount * TermMonths.Value : null;

    // Cuántas cuotas faltan según en cuál va el usuario.
    public int? RemainingInstallments =>
        TermMonths.HasValue ? Math.Max(TermMonths.Value - CurrentInstallment, 0) : null;

    // Cuánto falta pagar en total.
    public decimal? RemainingAmount =>
        RemainingInstallments.HasValue ? InstallmentAmount * RemainingInstallments.Value : null;

    // Fecha aproximada en la que terminaría de pagarla.
    public DateTime? EstimatedPayoffDate =>
        TermMonths.HasValue ? StartDate.AddMonths(TermMonths.Value) : null;
}
