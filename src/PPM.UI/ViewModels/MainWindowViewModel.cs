using System;
using CommunityToolkit.Mvvm.ComponentModel;
using Microsoft.Extensions.DependencyInjection;

namespace PPM.UI.ViewModels;

// Es el punto de entrada de la ventana: decide si mostramos el login o, ya con el usuario
// dentro, el shell. También maneja el cierre de sesión, que nos devuelve al login.
public partial class MainWindowViewModel : ViewModelBase
{
    private readonly IServiceProvider _services;

    [ObservableProperty]
    private ViewModelBase _currentPage;

    public MainWindowViewModel(IServiceProvider services)
    {
        _services = services;
        _currentPage = CreateLogin();
    }

    private LoginViewModel CreateLogin()
    {
        var login = _services.GetRequiredService<LoginViewModel>();
        login.LoginSucceeded += OnLoginSucceeded;
        return login;
    }

    private async void OnLoginSucceeded(object? sender, int userId)
    {
        if (sender is LoginViewModel login)
            login.LoginSucceeded -= OnLoginSucceeded;

        try
        {
            var shell = _services.GetRequiredService<ShellViewModel>();
            shell.UserId = userId;
            shell.LogoutRequested += OnLogoutRequested;
            CurrentPage = shell;
            await shell.InitializeAsync();
        }
        catch (Exception)
        {
            // Si algo falla al preparar el shell, mejor volver al login que cerrar la app.
            CurrentPage = CreateLogin();
        }
    }

    private void OnLogoutRequested(object? sender, EventArgs e)
    {
        if (sender is ShellViewModel shell)
            shell.LogoutRequested -= OnLogoutRequested;

        CurrentPage = CreateLogin();
    }
}
