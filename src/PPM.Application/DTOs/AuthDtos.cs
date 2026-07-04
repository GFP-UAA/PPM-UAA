namespace PPM.Application.DTOs;

public record RegisterDto(string Username, string Password, string ConfirmPassword);
public record LoginDto(string Username, string Password);
public record AuthResultDto(bool Success, string Message, int? UserId = null);
