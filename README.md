# PPM — Personal Process Manager

Aplicación de escritorio para administrar finanzas personales. Corre 100% local y sin conexión a internet: el usuario administra su salario, deudas, tarjetas de crédito y gastos, y todos los cálculos parten del salario declarado.

## Integrantes

- Mauro Silvero
- Francesco Paez
- Wilson Ayala
- Ana Gayoso
- Marcos Bogado

## Stack tecnológico

| Componente        | Tecnología                                | Versión   |
|-------------------|-------------------------------------------|-----------|
| Plataforma        | .NET                                      | 8.0 (LTS) |
| Lenguaje          | C#                                        | 12.0      |
| UI                | Avalonia UI                               | 11.3.10   |
| MVVM              | CommunityToolkit.Mvvm                     | 8.4.2     |
| ORM               | Entity Framework Core                     | 8.0.11    |
| Base de datos     | SQLite (archivo local)                    | —         |
| Contraseñas       | BCrypt.Net-Next                           | 4.0.3     |
| Inyección de dep. | Microsoft.Extensions.DependencyInjection  | 8.0.x     |

Arquitectura: Clean Architecture en 4 proyectos (`PPM.Domain`, `PPM.Application`, `PPM.Infrastructure`, `PPM.UI`), con las dependencias apuntando siempre hacia el dominio.

---

## Requisitos previos

Lo único imprescindible para correr el proyecto es el **SDK de .NET 8.0**.

- Descarga: https://dotnet.microsoft.com/download/dotnet/8.0
- Verificá que quedó instalado:
  ```bash
  dotnet --version
  ```
  Debería mostrar una versión `8.0.x`.

No hace falta instalar SQLite aparte: el motor viene embebido y el archivo de base de datos se crea solo la primera vez que abrís la app.

---

## Cómo clonar, instalar dependencias y correr

```bash
# 1. Clonar el repositorio
git clone <URL-DEL-REPO>
cd PPM

# 2. Restaurar las dependencias (descarga los paquetes NuGet)
dotnet restore

# 3. Correr la aplicación
dotnet run --project src/PPM.UI
```

Al abrir por primera vez, la app crea la base de datos y aplica las migraciones sola. Vas a ver la pantalla de **Login**: usá "Registrarse" para crear un usuario y entrás directo al panel principal.

Opcional, para compilar sin ejecutar o generar una versión Release:

```bash
dotnet build PPM.sln
dotnet run --project src/PPM.UI --configuration Release
```

---

## Dónde se guardan los datos

La base de datos (`ppm.db`) vive en una carpeta fija por usuario, para que se use siempre la misma sin importar cómo lances la app (Run and Debug, `dotnet run`, etc.):

- Windows: `%LOCALAPPDATA%\PPM\ppm.db`
- macOS: `~/Library/Application Support/PPM/ppm.db`
- Linux: `~/.local/share/PPM/ppm.db`

Si querés empezar de cero, borrá ese archivo y se vuelve a crear vacío al iniciar.

---

## Estructura del proyecto

```
PPM/
├── PPM.sln
├── README.md
└── src/
    ├── PPM.Domain/          Entidades, enums, constantes e interfaces de repositorio
    ├── PPM.Application/      DTOs (records) y servicios (casos de uso)
    ├── PPM.Infrastructure/   EF Core (DbContext, migraciones), repositorios, BCrypt, export CSV
    └── PPM.UI/               Avalonia: Views, ViewModels, converters y arranque con DI
```

---

## Funcionalidades

- **Autenticación**: registro y login con contraseña hasheada (BCrypt).
- **Salario**: registro con fecha de vigencia e historial; opción de aporte al IPS (descuenta el 9% y el dashboard trabaja sobre el neto).
- **Deudas**: alta por monto de cuota, con plazo fijo o indefinido, número de cuota actual, entidad y producto; muestra cuota mensual, cuotas restantes y fecha estimada de fin.
- **Tarjetas de crédito**: libro de movimientos (consumos y pagos) del que se deriva el saldo; el interés y el pago mínimo se aplican solo en el cierre y solo sobre el saldo no pagado.
- **Gastos**: alta por categoría, resumen mensual con porcentaje del salario y comparativa con el mes anterior.
- **Dashboard**: consolida salario neto, saldo disponible, deudas, tarjetas y gastos.
- **Exportación**: guarda el resumen mensual a un archivo CSV.
- **Acerca de**: datos de la aplicación y del equipo.

---

## Comandos útiles

```bash
# Compilar toda la solución
dotnet build PPM.sln

# Ejecutar la app
dotnet run --project src/PPM.UI

# (Solo si trabajás sobre el modelo de datos) generar y aplicar migraciones.
# Requiere la herramienta dotnet-ef: dotnet tool install --global dotnet-ef
dotnet ef migrations add <Nombre> --project src/PPM.Infrastructure --startup-project src/PPM.UI
dotnet ef database update        --project src/PPM.Infrastructure --startup-project src/PPM.UI
```

---

## Notas

- El dinero se maneja en guaraníes, como enteros (sin centavos).
- La tasa de interés de tarjetas se guarda con decimales; el porcentaje de pago mínimo es 5% por defecto.
- Los gastos hechos con tarjeta se cargan como consumo en el módulo de Tarjetas, no en Gastos, para no contarlos dos veces.
