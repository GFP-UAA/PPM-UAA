using System.Threading.Tasks;

namespace PPM.UI.Services;

// Sirve para pedirle al usuario dónde guardar un archivo. Envuelve el diálogo de Avalonia
// para que los ViewModels no tengan que conocer detalles de la ventana.
public interface IFileDialogService
{
    Task<string?> SaveFileAsync(string suggestedName, string extension, string typeDescription);
}
