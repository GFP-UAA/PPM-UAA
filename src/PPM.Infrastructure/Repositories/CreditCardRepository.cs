using Microsoft.EntityFrameworkCore;
using PPM.Domain.Entities;
using PPM.Domain.Interfaces;
using PPM.Infrastructure.Data;

namespace PPM.Infrastructure.Repositories;

public class CreditCardRepository(AppDbContext context) : ICreditCardRepository
{
    public async Task<IEnumerable<CreditCard>> GetAllByUserAsync(int userId) =>
        await context.CreditCards
            .Where(c => c.UserId == userId)
            .OrderBy(c => c.Name)
            .ToListAsync();

    public async Task<CreditCard?> GetByIdAsync(int id) =>
        await context.CreditCards.FirstOrDefaultAsync(c => c.Id == id);

    public async Task AddAsync(CreditCard card)
    {
        await context.CreditCards.AddAsync(card);
        await context.SaveChangesAsync();
    }

    public async Task UpdateAsync(CreditCard card)
    {
        context.CreditCards.Update(card);
        await context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var card = await context.CreditCards.FirstOrDefaultAsync(c => c.Id == id);
        if (card is null)
            return;

        context.CreditCards.Remove(card);
        await context.SaveChangesAsync();
    }

    public async Task AddPaymentAsync(CreditCardPayment payment)
    {
        await context.CreditCardPayments.AddAsync(payment);
        await context.SaveChangesAsync();
    }

    public async Task<IEnumerable<CreditCardPayment>> GetPaymentsAsync(int cardId) =>
        await context.CreditCardPayments
            .Where(p => p.CreditCardId == cardId)
            .OrderByDescending(p => p.PaymentDate)
            .ToListAsync();

    public async Task AddMovementAsync(CardMovement movement)
    {
        await context.CardMovements.AddAsync(movement);
        await context.SaveChangesAsync();
    }

    public async Task<IEnumerable<CardMovement>> GetMovementsAsync(int cardId) =>
        await context.CardMovements
            .Where(m => m.CreditCardId == cardId)
            .OrderByDescending(m => m.Date)
            .ToListAsync();
}
