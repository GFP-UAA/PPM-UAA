using System;
using Avalonia.Controls;
using Avalonia.Controls.Templates;
using PPM.UI.ViewModels;

namespace PPM.UI;

// Dado un ViewModel, encuentra su View siguiendo la convención de nombres:
// PPM.UI.ViewModels.XxxViewModel se corresponde con PPM.UI.Views.XxxView.
public class ViewLocator : IDataTemplate
{
    public Control Build(object? param)
    {
        if (param is null)
            return new TextBlock { Text = "Null DataContext" };

        var name = param.GetType().FullName!
            .Replace("ViewModels", "Views", StringComparison.Ordinal)
            .Replace("ViewModel", "View", StringComparison.Ordinal);

        var type = Type.GetType(name);

        if (type != null)
            return (Control)Activator.CreateInstance(type)!;

        return new TextBlock { Text = "Not Found: " + name };
    }

    public bool Match(object? data) => data is ViewModelBase;
}
