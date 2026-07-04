using PPM.Domain.Entities;

namespace PPM.Domain.Interfaces;

public interface ICreditCardRepository
{
    Task<IEnumerable<CreditCard>> GetAllByUserAsync(int userId);
    Task<CreditCard?> GetByIdAsync(int id);
    Task AddAsync(CreditCard card);
    Task UpdateAsync(CreditCard card);
    Task DeleteAsync(int id);
    Task AddPaymentAsync(CreditCardPayment payment);
    Task<IEnumerable<CreditCardPayment>> GetPaymentsAsync(int cardId);
    Task AddMovementAsync(CardMovement movement);
    Task<IEnumerable<CardMovement>> GetMovementsAsync(int cardId);
}
