using PPM.Application.DTOs;

namespace PPM.Application.Services;

// Contrato para exportar datos a un archivo. Como el acceso a disco es cosa de
// Infrastructure, la implementación concreta vive allá.
public interface IExportService
{
    // Guarda el resumen mensual de gastos del usuario en la ruta indicada, en formato CSV.
    Task<ExportResultDto> ExportMonthlySummaryAsync(int userId, int month, int year, string destinationPath);
}
