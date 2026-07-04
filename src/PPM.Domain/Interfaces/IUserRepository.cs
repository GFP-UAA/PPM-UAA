using PPM.Domain.Entities;

namespace PPM.Domain.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByIdAsync(int id);
    Task<User?> GetByUsernameAsync(string username);
    Task<bool> ExistsAsync(string username);
    Task AddAsync(User user);
    Task UpdateAsync(User user);
}
