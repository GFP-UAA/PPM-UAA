namespace PPM.Application.DTOs;

public record ExportResultDto(bool Success, string Message, string? FilePath = null);
