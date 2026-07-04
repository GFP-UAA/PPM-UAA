using Microsoft.EntityFrameworkCore;
using PPM.Domain.Entities;
using PPM.Domain.Interfaces;
using PPM.Infrastructure.Data;

namespace PPM.Infrastructure.Repositories;

public class ExpenseRepository(AppDbContext context) : IExpenseRepository
{
    public async Task<IEnumerable<Expense>> GetByMonthAsync(int userId, int month, int year) =>
        await context.Expenses
            .Where(e => e.UserId == userId && e.Month == month && e.Year == year)
            .OrderByDescending(e => e.Date)
            .ToListAsync();

    public async Task<IEnumerable<Expense>> GetAllByUserAsync(int userId) =>
        await context.Expenses
            .Where(e => e.UserId == userId)
            .OrderByDescending(e => e.Date)
            .ToListAsync();

    public async Task<Expense?> GetByIdAsync(int id) =>
        await context.Expenses.FirstOrDefaultAsync(e => e.Id == id);

    public async Task AddAsync(Expense expense)
    {
        await context.Expenses.AddAsync(expense);
        await context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Expense expense)
    {
        context.Expenses.Update(expense);
        await context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var expense = await context.Expenses.FirstOrDefaultAsync(e => e.Id == id);
        if (expense is null)
            return;

        context.Expenses.Remove(expense);
        await context.SaveChangesAsync();
    }

    public async Task<decimal> GetMonthlyTotalAsync(int userId, int month, int year)
    {
        // SQLite guarda los decimal como texto y no sabe hacer SUM sobre ellos en SQL.
        // Por eso traemos solo los montos del mes y los sumamos ya en memoria.
        var amounts = await context.Expenses
            .Where(e => e.UserId == userId && e.Month == month && e.Year == year)
            .Select(e => e.Amount)
            .ToListAsync();

        return amounts.Sum();
    }
}
