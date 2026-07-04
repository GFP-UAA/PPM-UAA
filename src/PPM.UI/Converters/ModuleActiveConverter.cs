using System;
using System.Globalization;
using Avalonia.Data.Converters;
using Avalonia.Media;

namespace PPM.UI.Converters;

// Pinta de fondo el botón del menú que corresponde a la pantalla en la que estamos.
// Recibe el módulo activo y, como parámetro, el módulo de cada botón: si son el mismo,
// devuelve el color resaltado; si no, transparente.
public class ModuleActiveConverter : IValueConverter
{
    private static readonly IBrush ActiveBrush = new SolidColorBrush(Color.Parse("#2F6FED"));
    private static readonly IBrush InactiveBrush = Brushes.Transparent;

    public object Convert(object? value, Type targetType, object? parameter, CultureInfo culture)
    {
        var active = value?.ToString();
        var self = parameter?.ToString();
        return string.Equals(active, self, StringComparison.Ordinal) ? ActiveBrush : InactiveBrush;
    }

    public object? ConvertBack(object? value, Type targetType, object? parameter, CultureInfo culture)
        => throw new NotSupportedException();
}
