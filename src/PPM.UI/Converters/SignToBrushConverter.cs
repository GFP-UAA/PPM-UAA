using System;
using System.Globalization;
using Avalonia.Data.Converters;
using Avalonia.Media;

namespace PPM.UI.Converters;

// Pinta de verde los montos en cero o positivos y de rojo los negativos.
// Lo usamos donde el signo comunica algo, como el saldo disponible del dashboard.
public class SignToBrushConverter : IValueConverter
{
    private static readonly IBrush Positive = new SolidColorBrush(Color.Parse("#1F9254"));
    private static readonly IBrush Danger = new SolidColorBrush(Color.Parse("#D64545"));

    public object Convert(object? value, Type targetType, object? parameter, CultureInfo culture)
    {
        try
        {
            var amount = System.Convert.ToDecimal(value, CultureInfo.InvariantCulture);
            return amount < 0 ? Danger : Positive;
        }
        catch
        {
            return Positive;
        }
    }

    public object? ConvertBack(object? value, Type targetType, object? parameter, CultureInfo culture)
        => throw new NotSupportedException();
}
