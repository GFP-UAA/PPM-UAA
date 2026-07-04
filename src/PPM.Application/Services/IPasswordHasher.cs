namespace PPM.Application.Services;

// Contrato para hashear y verificar contraseñas. Lo definimos acá para que la capa
// Application no dependa de BCrypt: la implementación concreta vive en Infrastructure.
public interface IPasswordHasher
{
    string Hash(string password);
    bool Verify(string password, string hash);
}
