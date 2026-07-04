using Microsoft.EntityFrameworkCore;
using PPM.Domain.Entities;
using PPM.Domain.Interfaces;
using PPM.Infrastructure.Data;

namespace PPM.Infrastructure.Repositories;

public class DebtRepository(AppDbContext context) : IDebtRepository
{
    public async Task<IEnumerable<Debt>> GetAllByUserAsync(int userId) =>
        await context.Debts
            .Where(d => d.UserId == userId)
            .OrderByDescending(d => d.StartDate)
            .ToListAsync();

    public async Task<Debt?> GetByIdAsync(int id) =>
        await context.Debts.FirstOrDefaultAsync(d => d.Id == id);

    public async Task AddAsync(Debt debt)
    {
        await context.Debts.AddAsync(debt);
        await context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Debt debt)
    {
        context.Debts.Update(debt);
        await context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var debt = await context.Debts.FirstOrDefaultAsync(d => d.Id == id);
        if (debt is null)
            return;

        context.Debts.Remove(debt);
        await context.SaveChangesAsync();
    }
}
