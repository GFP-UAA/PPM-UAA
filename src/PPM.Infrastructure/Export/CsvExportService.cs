using System.Globalization;
using System.Text;
using PPM.Application.DTOs;
using PPM.Application.Services;

namespace PPM.Infrastructure.Export;

// Genera el resumen mensual como archivo CSV. Si algo falla al escribir en disco,
// lo atrapamos acá y lo devolvemos como resultado en vez de dejar que reviente.
public class CsvExportService(IExpenseService expenseService) : IExportService
{
    private const char Delimiter = ';';
    private static readonly CultureInfo Culture = CultureInfo.InvariantCulture;

    public async Task<ExportResultDto> ExportMonthlySummaryAsync(int userId, int month, int year, string destinationPath)
    {
        try
        {
            var summary = await expenseService.GetMonthlySummaryAsync(userId, month, year);

            var sb = new StringBuilder();
            sb.AppendLine($"Resumen mensual PPM - {month:D2}/{year}");
            sb.AppendLine();
            sb.AppendLine(Row("Descripción", "Categoría", "Fecha", "Monto (Gs)"));

            foreach (var e in summary.Expenses)
            {
                sb.AppendLine(Row(
                    e.Description,
                    e.Type.ToString(),
                    e.Date.ToString("yyyy-MM-dd", Culture),
                    e.Amount.ToString("0", Culture)));
            }

            sb.AppendLine();
            sb.AppendLine(Row("TOTAL DEL MES", "", "", summary.Total.ToString("0", Culture)));
            sb.AppendLine(Row("% del salario consumido", "", "", summary.SalaryPercentage.ToString("0.##", Culture) + "%"));

            // Escribimos en UTF-8 con BOM para que Excel muestre bien los acentos y el símbolo ₲.
            await File.WriteAllTextAsync(destinationPath, sb.ToString(), new UTF8Encoding(true));

            return new ExportResultDto(true, "Exportación completada correctamente.", destinationPath);
        }
        catch (Exception ex)
        {
            return new ExportResultDto(false, $"Error al exportar el archivo: {ex.Message}");
        }
    }

    private static string Row(params string[] fields) =>
        string.Join(Delimiter, fields.Select(Escape));

    private static string Escape(string field)
    {
        // Si el texto trae el separador, comillas o saltos de línea, hay que entrecomillarlo
        // para no romper las columnas del CSV.
        if (field.Contains(Delimiter) || field.Contains('"') || field.Contains('\n') || field.Contains('\r'))
            return $"\"{field.Replace("\"", "\"\"")}\"";
        return field;
    }
}
