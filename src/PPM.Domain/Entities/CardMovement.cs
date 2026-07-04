using PPM.Domain.Enums;

namespace PPM.Domain.Entities;

// Cada línea del libro de la tarjeta: un consumo (sube el saldo) o un pago (lo baja).
// El interés que se cobra en el cierre lo guardamos como un consumo más, con la
// descripción "Interés de cierre", para que el saldo siga cuadrando solo.
public class CardMovement
{
    public int Id { get; set; }
    public int CreditCardId { get; set; }
    public CardMovementType Type { get; set; }
    public decimal Amount { get; set; }          // En Guaraníes
    public DateTime Date { get; set; } = DateTime.UtcNow;
    public string Description { get; set; } = string.Empty;

    public CreditCard CreditCard { get; set; } = null!;
}
