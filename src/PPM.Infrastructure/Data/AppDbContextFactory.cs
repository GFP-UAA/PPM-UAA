using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace PPM.Infrastructure.Data;

// La usan los comandos de EF Core (dotnet ef migrations / database update) para armar
// el contexto en tiempo de diseño, sin tener que levantar toda la app de UI.
public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
        optionsBuilder.UseSqlite(DbConstants.ConnectionString);
        return new AppDbContext(optionsBuilder.Options);
    }
}
