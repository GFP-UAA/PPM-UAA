using System;
using System.Threading.Tasks;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Microsoft.Extensions.DependencyInjection;

namespace PPM.UI.ViewModels;

// Es la pantalla principal una vez que el usuario entró: el menú lateral más el área de
// contenido que va cambiando. Cuando se navega a un módulo, lo pide al contenedor de
// dependencias, le pasa el usuario de la sesión y le dice que cargue sus datos.
public partial class ShellViewModel(IServiceProvider services) : ViewModelBase
{
    public int UserId { get; set; }

    // Avisa a la ventana principal que el usuario quiere cerrar sesión.
    public event EventHandler? LogoutRequested;

    [ObservableProperty]
    private ViewModelBase? _currentPage;

    [ObservableProperty]
    private string _activeModule = string.Empty;

    // Al entrar, arrancamos mostrando el dashboard.
    public Task InitializeAsync() => NavigateDashboardAsync();

    [RelayCommand]
    private Task NavigateDashboardAsync() => NavigateAsync<DashboardViewModel>("Dashboard");

    [RelayCommand]
    private Task NavigateSalaryAsync() => NavigateAsync<SalaryViewModel>("Salario");

    [RelayCommand]
    private Task NavigateDebtsAsync() => NavigateAsync<DebtsViewModel>("Deudas");

    [RelayCommand]
    private Task NavigateCreditCardsAsync() => NavigateAsync<CreditCardsViewModel>("Tarjetas");

    [RelayCommand]
    private Task NavigateExpensesAsync() => NavigateAsync<ExpensesViewModel>("Gastos");

    [RelayCommand]
    private Task NavigateIncomesAsync() => NavigateAsync<IncomesViewModel>("Ingresos");

    [RelayCommand]
    private Task NavigateAboutAsync() => NavigateAsync<AboutViewModel>("Acerca de");

    [RelayCommand]
    private void Logout() => LogoutRequested?.Invoke(this, EventArgs.Empty);

    private async Task NavigateAsync<TViewModel>(string module) where TViewModel : ModuleViewModelBase
    {
        try
        {
            var vm = services.GetRequiredService<TViewModel>();
            vm.UserId = UserId;
            ActiveModule = module;
            CurrentPage = vm;
            await vm.LoadAsync();
        }
        catch (Exception)
        {
            // Cambiar de pantalla nunca debería tumbar la app; si un módulo falla al cargar,
            // él mismo muestra su error. Acá solo evitamos que una excepción se escape.
        }
    }
}
