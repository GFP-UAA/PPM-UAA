using System.Collections.ObjectModel;
using System.Threading.Tasks;

namespace PPM.UI.ViewModels;

public partial class AboutViewModel : ModuleViewModelBase
{
    public string AppName => "PPM — Personal Process Manager";
    public string Version => "1.0.0";
    public string Description =>
        "Aplicación de escritorio para la administración de finanzas personales. " +
        "Corre 100% local y sin conexión a internet.";

    public ObservableCollection<string> TeamMembers { get; } =
    [
        "Mauro Silvero",
        "Francesco Paez",
        "Wilson Ayala",
        "Ana Gayoso",
        "Marcos Bogado"
    ];

    public override Task LoadAsync() => Task.CompletedTask;
}
