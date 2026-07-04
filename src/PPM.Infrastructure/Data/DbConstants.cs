namespace PPM.Infrastructure.Data;

/// <summary>
/// Constantes de configuración de la base de datos.
/// El archivo ppm.db vive en una carpeta fija por usuario, para que TODAS las formas de
/// ejecutar la app (dotnet run, Run and Debug, publish) usen la MISMA base de datos.
/// </summary>
public static class DbConstants
{
    public const string DatabaseFileName = "ppm.db";

    /// <summary>Ruta absoluta del archivo de base de datos (crea la carpeta si no existe).</summary>
    public static string DatabasePath
    {
        get
        {
            var folder = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                "PPM");
            Directory.CreateDirectory(folder);
            return Path.Combine(folder, DatabaseFileName);
        }
    }

    public static string ConnectionString => $"Data Source={DatabasePath}";
}
