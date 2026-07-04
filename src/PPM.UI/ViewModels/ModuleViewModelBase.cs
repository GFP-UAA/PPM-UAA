using System;
using System.Threading.Tasks;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;

namespace PPM.UI.ViewModels;

// Clase base de todos los módulos que se muestran dentro del shell (Salario, Deudas, etc.).
// Cada módulo sabe qué usuario está logueado y cómo cargar sus datos. Acá dejamos lo común:
// el estado de carga, el mensaje de error y el try/catch para que un fallo no cierre la app.
public abstract partial class ModuleViewModelBase : ViewModelBase
{
    public int UserId { get; set; }

    [ObservableProperty]
    private bool _isLoading;

    [ObservableProperty]
    private string? _errorMessage;

    [ObservableProperty]
    private string? _statusMessage;

    // Carga (o recarga) los datos del módulo. Cada módulo lo resuelve a su manera.
    public abstract Task LoadAsync();

    // Comando que reusan las vistas para el botón "Actualizar".
    [RelayCommand]
    private Task Reload() => LoadAsync();

    // Corre una tarea asíncrona y, si algo sale mal, guarda el mensaje de error en vez
    // de dejar que la excepción se propague y cierre la aplicación.
    protected async Task RunGuardedAsync(Func<Task> action)
    {
        IsLoading = true;
        ErrorMessage = null;
        try
        {
            await action();
        }
        catch (Exception ex)
        {
            ErrorMessage = ex.Message;
        }
        finally
        {
            IsLoading = false;
        }
    }
}
