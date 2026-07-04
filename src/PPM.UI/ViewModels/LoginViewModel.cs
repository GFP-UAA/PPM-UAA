using System;
using System.Threading.Tasks;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using PPM.Application.DTOs;
using PPM.Application.Services;

namespace PPM.UI.ViewModels;

public partial class LoginViewModel(IAuthService authService) : ViewModelBase
{
    // Se dispara con el Id del usuario cuando el login (o el registro) sale bien.
    public event EventHandler<int>? LoginSucceeded;

    [ObservableProperty]
    private string _username = string.Empty;

    [ObservableProperty]
    private string _password = string.Empty;

    [ObservableProperty]
    private string _confirmPassword = string.Empty;

    [ObservableProperty]
    private string? _errorMessage;

    [ObservableProperty]
    private bool _isLoading;

    [RelayCommand]
    private async Task LoginAsync()
    {
        ErrorMessage = null;
        IsLoading = true;
        try
        {
            var result = await authService.LoginAsync(new LoginDto(Username, Password));
            if (result is { Success: true, UserId: not null })
                LoginSucceeded?.Invoke(this, result.UserId.Value);
            else
                ErrorMessage = result.Message;
        }
        finally
        {
            IsLoading = false;
        }
    }

    [RelayCommand]
    private async Task RegisterAsync()
    {
        ErrorMessage = null;
        IsLoading = true;
        try
        {
            var result = await authService.RegisterAsync(new RegisterDto(Username, Password, ConfirmPassword));
            if (result is { Success: true, UserId: not null })
                LoginSucceeded?.Invoke(this, result.UserId.Value);
            else
                ErrorMessage = result.Message;
        }
        finally
        {
            IsLoading = false;
        }
    }
}
