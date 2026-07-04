using System;
using System.Globalization;
using Avalonia.Data.Converters;

namespace PPM.UI.Converters;

// Muestra un número como guaraníes: punto para los miles y sin decimales.
// Por ejemplo, 1500000 se ve como "₲ 1.500.000".
public class GuaraniConverter : IValueConverter
{
    private static readonly NumberFormatInfo GuaraniFormat = new()
    {
        NumberGroupSeparator = ".",
        NumberDecimalDigits = 0
    };

    public object Convert(object? value, Type targetType, object? parameter, CultureInfo culture)
    {
        if (value is null)
            return "₲ 0";

        try
        {
            var amount = System.Convert.ToDecimal(value, CultureInfo.InvariantCulture);
            return "₲ " + amount.ToString("N0", GuaraniFormat);
        }
        catch
        {
            return value.ToString() ?? string.Empty;
        }
    }

    public object? ConvertBack(object? value, Type targetType, object? parameter, CultureInfo culture)
        => throw new NotSupportedException();
}
