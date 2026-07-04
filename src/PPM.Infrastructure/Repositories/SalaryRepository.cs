using Microsoft.EntityFrameworkCore;
using PPM.Domain.Entities;
using PPM.Domain.Interfaces;
using PPM.Infrastructure.Data;

namespace PPM.Infrastructure.Repositories;

public class SalaryRepository(AppDbContext context) : ISalaryRepository
{
    public async Task<Salary?> GetCurrentAsync(int userId) =>
        await context.Salaries
            .Where(s => s.UserId == userId && s.EffectiveFrom <= DateTime.UtcNow)
            .OrderByDescending(s => s.EffectiveFrom)
            .ThenByDescending(s => s.CreatedAt)
            .FirstOrDefaultAsync();

    public async Task<IEnumerable<Salary>> GetHistoryAsync(int userId) =>
        await context.Salaries
            .Where(s => s.UserId == userId)
            .OrderByDescending(s => s.EffectiveFrom)
            .ToListAsync();

    public async Task AddAsync(Salary salary)
    {
        await context.Salaries.AddAsync(salary);
        await context.SaveChangesAsync();
    }
}
