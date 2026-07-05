using System;
using Avalonia;
using Avalonia.Controls.ApplicationLifetimes;
using Avalonia.Markup.Xaml;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PPM.Application.Services;
using PPM.Domain.Interfaces;
using PPM.Infrastructure.Data;
using PPM.Infrastructure.Export;
using PPM.Infrastructure.Repositories;
using PPM.Infrastructure.Security;
using PPM.UI.Services;
using PPM.UI.ViewModels;

namespace PPM.UI;

public partial class App : Avalonia.Application
{
    public static IServiceProvider Services { get; private set; } = null!;

    public override void Initialize()
    {
        AvaloniaXamlLoader.Load(this);
    }

    public override void OnFrameworkInitializationCompleted()
    {
        // Acá armamos el contenedor de dependencias: registramos todo (base de datos,
        // repositorios, servicios y ViewModels) para poder pedirlo por constructor.
        var services = new ServiceCollection();

        // Base de datos (SQLite mediante EF Core)
        services.AddDbContext<AppDbContext>(opt =>
            opt.UseSqlite(DbConstants.ConnectionString));

        // Hasheo de contraseñas
        services.AddScoped<IPasswordHasher, BCryptPasswordHasher>();

        // Repositorios (acceso a datos)
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<ISalaryRepository, SalaryRepository>();
        services.AddScoped<IDebtRepository, DebtRepository>();
        services.AddScoped<ICreditCardRepository, CreditCardRepository>();
        services.AddScoped<IExpenseRepository, ExpenseRepository>();
        services.AddScoped<IIncomeRepository, IncomeRepository>();

        // Casos de uso (lógica de la aplicación)
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<ISalaryService, SalaryService>();
        services.AddScoped<IDebtService, DebtService>();
        services.AddScoped<ICreditCardService, CreditCardService>();
        services.AddScoped<IExpenseService, ExpenseService>();
        services.AddScoped<IIncomeService, IncomeService>();
        services.AddScoped<IDashboardService, DashboardService>();
        services.AddScoped<IExportService, CsvExportService>();

        // Servicios propios de la interfaz
        services.AddSingleton<IFileDialogService, FileDialogService>();

        // ViewModels
        services.AddTransient<MainWindowViewModel>();
        services.AddTransient<LoginViewModel>();
        services.AddTransient<ShellViewModel>();
        services.AddTransient<DashboardViewModel>();
        services.AddTransient<SalaryViewModel>();
        services.AddTransient<DebtsViewModel>();
        services.AddTransient<CreditCardsViewModel>();
        services.AddTransient<ExpensesViewModel>();
        services.AddTransient<IncomesViewModel>();
        services.AddTransient<AboutViewModel>();

        var provider = services.BuildServiceProvider();
        Services = provider;

        // Aplicamos las migraciones pendientes al arrancar, así la base queda lista
        // (y se crea sola la primera vez) sin que el usuario tenga que hacer nada.
        using (var scope = provider.CreateScope())
        {
            scope.ServiceProvider.GetRequiredService<AppDbContext>().Database.Migrate();
        }

        if (ApplicationLifetime is IClassicDesktopStyleApplicationLifetime desktop)
        {
            desktop.MainWindow = new MainWindow
            {
                DataContext = provider.GetRequiredService<MainWindowViewModel>()
            };
        }

        base.OnFrameworkInitializationCompleted();
    }
}
