using System;
using System.Collections.ObjectModel;
using System.Threading.Tasks;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using PPM.Application.DTOs;
using PPM.Application.Services;

namespace PPM.UI.ViewModels;

public partial class SalaryViewModel(ISalaryService salaryService) : ModuleViewModelBase
{
    [ObservableProperty] private decimal _newAmount;
    [ObservableProperty] private DateTimeOffset? _effectiveFrom = DateTimeOffset.Now;
    [ObservableProperty] private bool _contributesToIps = true;

    [ObservableProperty] private SalaryDto? _currentSalary;

    public ObservableCollection<SalaryDto> History { get; } = [];

    public override Task LoadAsync() => RunGuardedAsync(async () =>
    {
        CurrentSalary = await salaryService.GetCurrentAsync(UserId);

        History.Clear();
        foreach (var s in await salaryService.GetHistoryAsync(UserId))
            History.Add(s);
    });

    [RelayCommand]
    private async Task SaveAsync()
    {
        StatusMessage = null;
        ErrorMessage = null;

        if (NewAmount <= 0)
        {
            ErrorMessage = "El monto del salario debe ser mayor a cero.";
            return;
        }

        await RunGuardedAsync(async () =>
        {
            await salaryService.CreateAsync(new CreateSalaryDto(UserId, NewAmount, (EffectiveFrom ?? DateTimeOffset.Now).DateTime, ContributesToIps));
            NewAmount = 0;
            EffectiveFrom = DateTimeOffset.Now;
            await LoadAsync();
            StatusMessage = "Salario registrado correctamente.";
        });
    }
}
