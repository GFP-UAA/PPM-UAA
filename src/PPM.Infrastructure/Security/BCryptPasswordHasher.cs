using PPM.Application.Services;

namespace PPM.Infrastructure.Security;

// Implementa el hasheo de contraseñas con BCrypt. Al dejarlo solo en Infrastructure,
// el resto del proyecto no queda atado a esta librería en particular.
public class BCryptPasswordHasher : IPasswordHasher
{
    public string Hash(string password) => BCrypt.Net.BCrypt.HashPassword(password);

    public bool Verify(string password, string hash) => BCrypt.Net.BCrypt.Verify(password, hash);
}
