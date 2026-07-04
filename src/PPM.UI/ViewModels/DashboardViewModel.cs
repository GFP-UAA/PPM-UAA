using System;
using System.Threading.Tasks;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using PPM.Application.Services;
using PPM.UI.Services;

namespace PPM.UI.ViewModels;

public partial class DashboardViewModel(
    IDashboardService dashboardService,
    IExpenseService expenseService,
    IExportService exportService,
    IFileDialogService fileDialogService) : ModuleViewModelBase
{
    [ObservableProperty] private decimal _currentSalary;
    [ObservableProperty] private decimal _grossSalary;
    [ObservableProperty] private decimal _ipsDiscount;
    [ObservableProperty] private decimal _availableBalance;
    [ObservableProperty] private decimal _totalDebts;
    [ObservableProperty] private int _activeDebtsCount;

    [ObservableProperty] private decimal _totalCreditDebt;
    [ObservableProperty] private decimal _totalCreditInterest;
    [ObservableProperty] private decimal _totalCreditMinimumPayments;
    [ObservableProperty] private int _creditCardsCount;

    [ObservableProperty] private decimal _totalExpenses;
    [ObservableProperty] private decimal _previousMonthExpenses;
    [ObservableProperty] private decimal _expenseDelta;
    [ObservableProperty] private decimal _expenseDeltaPercentage;

    public override Task LoadAsync() => RunGuardedAsync(async () =>
    {
        StatusMessage = null;
        var data = await dashboardService.GetDashboardAsync(UserId);
        CurrentSalary = data.CurrentSalary;
        GrossSalary = data.GrossSalary;
        IpsDiscount = data.IpsDiscount;
        AvailableBalance = data.AvailableBalance;
        TotalDebts = data.TotalMonthlyDebts;
        ActiveDebtsCount = data.ActiveDebtsCount;
        TotalCreditDebt = data.TotalCreditDebt;
        TotalCreditInterest = data.TotalCreditInterest;
        TotalCreditMinimumPayments = data.TotalCreditMinimumPayments;
        CreditCardsCount = data.CreditCardsCount;
        TotalExpenses = data.TotalMonthlyExpenses;

        // Comparativa con el mes anterior (aritmética de presentación sobre dos totales del servicio).
        var now = DateTime.Now;
        var prev = now.AddMonths(-1);
        PreviousMonthExpenses = await expenseService.GetMonthlyTotalAsync(UserId, prev.Month, prev.Year);
        ExpenseDelta = TotalExpenses - PreviousMonthExpenses;
        ExpenseDeltaPercentage = PreviousMonthExpenses > 0
            ? Math.Round(ExpenseDelta / PreviousMonthExpenses * 100, 2)
            : (TotalExpenses > 0 ? 100m : 0m);
    });

    [RelayCommand]
    private async Task ExportCsvAsync()
    {
        StatusMessage = null;
        ErrorMessage = null;
        try
        {
            var now = DateTime.Now;
            var suggested = $"resumen_{now.Year}_{now.Month:D2}.csv";
            var path = await fileDialogService.SaveFileAsync(suggested, "csv", "Archivo CSV");
            if (string.IsNullOrEmpty(path))
                return; // el usuario canceló

            var result = await exportService.ExportMonthlySummaryAsync(UserId, now.Month, now.Year, path);
            if (result.Success)
                StatusMessage = $"Resumen exportado a: {result.FilePath}";
            else
                ErrorMessage = result.Message;
        }
        catch (Exception ex)
        {
            ErrorMessage = $"No se pudo exportar: {ex.Message}";
        }
    }
}
