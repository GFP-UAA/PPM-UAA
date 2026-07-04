using PPM.Application.DTOs;
using PPM.Domain.Entities;
using PPM.Domain.Interfaces;

namespace PPM.Application.Services;

public class AuthService(IUserRepository userRepository, IPasswordHasher passwordHasher) : IAuthService
{
    public async Task<AuthResultDto> RegisterAsync(RegisterDto dto)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(dto.Username))
                return new AuthResultDto(false, "El nombre de usuario es obligatorio.");

            if (string.IsNullOrWhiteSpace(dto.Password))
                return new AuthResultDto(false, "La contraseña es obligatoria.");

            if (dto.Password != dto.ConfirmPassword)
                return new AuthResultDto(false, "Las contraseñas no coinciden.");

            if (await userRepository.ExistsAsync(dto.Username))
                return new AuthResultDto(false, "El nombre de usuario ya está en uso.");

            var user = new User
            {
                Username = dto.Username,
                PasswordHash = passwordHasher.Hash(dto.Password)
            };

            await userRepository.AddAsync(user);

            return new AuthResultDto(true, "Usuario registrado correctamente.", user.Id);
        }
        catch (Exception ex)
        {
            return new AuthResultDto(false, $"Error al registrar el usuario: {ex.Message}");
        }
    }

    public async Task<AuthResultDto> LoginAsync(LoginDto dto)
    {
        try
        {
            var user = await userRepository.GetByUsernameAsync(dto.Username);
            if (user is null)
                return new AuthResultDto(false, "Usuario o contraseña incorrectos.");

            if (!passwordHasher.Verify(dto.Password, user.PasswordHash))
                return new AuthResultDto(false, "Usuario o contraseña incorrectos.");

            return new AuthResultDto(true, "Inicio de sesión exitoso.", user.Id);
        }
        catch (Exception ex)
        {
            return new AuthResultDto(false, $"Error al iniciar sesión: {ex.Message}");
        }
    }
}
