namespace PPM.Domain.Entities;

public class CreditCardPayment
{
    public int Id { get; set; }
    public int CreditCardId { get; set; }
    public decimal PaidAmount { get; set; }
    public decimal DebtBeforePayment { get; set; }
    public decimal DebtAfterPayment { get; set; }
    public decimal InterestApplied { get; set; }
    public decimal MinimumPaymentRequired { get; set; }
    public bool MetMinimumPayment { get; set; }
    public DateTime PaymentDate { get; set; } = DateTime.UtcNow;

    public CreditCard CreditCard { get; set; } = null!;
}
