using System.Threading.Tasks;
using Avalonia.Controls;
using Avalonia.Controls.ApplicationLifetimes;
using Avalonia.Platform.Storage;

namespace PPM.UI.Services;

public class FileDialogService : IFileDialogService
{
    public async Task<string?> SaveFileAsync(string suggestedName, string extension, string typeDescription)
    {
        var window = (Avalonia.Application.Current?.ApplicationLifetime
            as IClassicDesktopStyleApplicationLifetime)?.MainWindow;

        var topLevel = window is null ? null : TopLevel.GetTopLevel(window);
        if (topLevel is null)
            return null;

        var file = await topLevel.StorageProvider.SaveFilePickerAsync(new FilePickerSaveOptions
        {
            SuggestedFileName = suggestedName,
            DefaultExtension = extension,
            FileTypeChoices =
            [
                new FilePickerFileType(typeDescription) { Patterns = [$"*.{extension}"] }
            ]
        });

        return file?.Path.LocalPath;
    }
}
