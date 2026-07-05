using Microsoft.EntityFrameworkCore;
using PPM.Domain.Entities;
using PPM.Domain.Interfaces;
using PPM.Infrastructure.Data;

namespace PPM.Infrastructure.Repositories;

public class IncomeRepository(AppDbContext dbContext) : IIncomeRepository
{
    public async Task AddAsync(Income income)
    {
        await dbContext.Incomes.AddAsync(income);
        await dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var income = await dbContext.Incomes.FindAsync(id);
        if (income != null)
        {
            dbContext.Incomes.Remove(income);
            await dbContext.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<Income>> GetAllAsync(int userId)
    {
        return await dbContext.Incomes
            .AsNoTracking()
            .Where(i => i.UserId == userId)
            .OrderByDescending(i => i.Date)
            .ToListAsync();
    }

    public async Task<IEnumerable<Income>> GetByMonthAsync(int userId, int month, int year)
    {
        return await dbContext.Incomes
            .AsNoTracking()
            .Where(i => i.UserId == userId && i.Month == month && i.Year == year)
            .OrderByDescending(i => i.Date)
            .ToListAsync();
    }

    public async Task<decimal> GetMonthlyTotalAsync(int userId, int month, int year)
    {
        var amounts = await dbContext.Incomes
            .AsNoTracking()
            .Where(i => i.UserId == userId && i.Month == month && i.Year == year)
            .Select(i => i.Amount)
            .ToListAsync();

        return amounts.Sum();
    }
}
