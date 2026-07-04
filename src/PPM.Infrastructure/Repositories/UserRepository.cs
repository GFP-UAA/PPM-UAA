using Microsoft.EntityFrameworkCore;
using PPM.Domain.Entities;
using PPM.Domain.Interfaces;
using PPM.Infrastructure.Data;

namespace PPM.Infrastructure.Repositories;

public class UserRepository(AppDbContext context) : IUserRepository
{
    public async Task<User?> GetByIdAsync(int id) =>
        await context.Users.FirstOrDefaultAsync(u => u.Id == id);

    public async Task<User?> GetByUsernameAsync(string username) =>
        await context.Users.FirstOrDefaultAsync(u => u.Username == username);

    public async Task<bool> ExistsAsync(string username) =>
        await context.Users.AnyAsync(u => u.Username == username);

    public async Task AddAsync(User user)
    {
        await context.Users.AddAsync(user);
        await context.SaveChangesAsync();
    }

    public async Task UpdateAsync(User user)
    {
        context.Users.Update(user);
        await context.SaveChangesAsync();
    }
}
