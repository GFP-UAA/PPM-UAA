# PPM — Personal Process Manager
**Documentación Técnica Actualizada**

* **Versión:** 1.1 — Actualización basada en código fuente
* **Plataforma:** Desktop — Windows / macOS / Linux
* **Moneda:** Guaraní Paraguayo (₲)
* **Estado:** En desarrollo

---

## SECCIÓN 01: Descripción General del Proyecto

### ¿Qué es PPM?
PPM (Personal Process Manager) es una aplicación de escritorio diseñada para que el usuario pueda administrar sus finanzas personales de manera integral, visualizando su situación económica en el pasado, el presente y el futuro.

El sistema gira en torno al **salario** y otros **ingresos** declarados por el usuario. A partir de estos valores se calculan automáticamente todos los indicadores financieros: saldo disponible, proyecciones de deuda, carga mensual de gastos y estado detallado de tarjetas de crédito.

### Objetivos del sistema
1. Centralizar la información financiera del usuario en un solo lugar. (Alta)
2. Calcular automáticamente el saldo disponible en base al salario y otros ingresos. (Alta)
3. Registrar y proyectar deudas a lo largo del tiempo. (Alta)
4. Gestionar tarjetas de crédito con historial de movimientos, intereses y pago mínimo. (Alta)
5. Registrar gastos mensuales y comparar con períodos anteriores. (Alta)
6. Proveer un dashboard con el estado financiero en tiempo real. (Alta)
7. Permitir actualizar el salario y reflejar el cambio automáticamente. (Media)
8. Exportar resúmenes financieros en archivos de texto. (Media)

### Alcance
La aplicación corre de forma **100% local**, sin conexión a internet. Los datos se almacenan en una base de datos SQLite en el equipo del usuario. La aplicación es compatible con Windows, macOS y Linux gracias a Avalonia UI.

> [!NOTE]
> La moneda base del sistema es el Guaraní Paraguayo (₲). Los campos numéricos se autoformatean con puntos de miles y no admiten decimales.

---

## SECCIÓN 02: Stack Tecnológico

### Backend
| Componente | Tecnología | Detalle |
| :--- | :--- | :--- |
| Lenguaje | C# | .NET 8 |
| ORM | Entity Framework Core | v8.0.x |
| Base de datos | SQLite | Archivo local `.db` |
| Encriptación | BCrypt.Net-Next | Paquete NuGet (Hash + Salt) |
| Arquitectura | Clean Architecture | Capas: Domain / Application / Infrastructure / UI |
| Patrón de datos | Repository Pattern | Interfaces definidas en la capa Domain |
| Inyección de dep. | MS DependencyInjection | Integrado en .NET 8 |

### Frontend
| Componente | Tecnología | Detalle |
| :--- | :--- | :--- |
| Framework UI | Avalonia UI | Cross-platform (Windows / macOS / Linux) |
| Patrón UI | MVVM | Model-View-ViewModel |
| Binding toolkit | CommunityToolkit.Mvvm | `ObservableProperty`, `RelayCommand` |
| Estilos | Avalonia Styles | Diseño minimalista personalizado |

### Arquitectura de capas
El proyecto se organiza siguiendo los principios de Clean Architecture. Ninguna capa interna conoce a las externas.

* **PPM.Domain**: Entidades, enumeradores (`IncomeType`, `ExpenseType`, etc.), interfaces de repositorio. Sin dependencias externas.
* **PPM.Application**: Casos de uso y orquestación. Solo conoce el Domain.
* **PPM.Infrastructure**: Implementación de repositorios y DbContext con EF Core + SQLite.
* **PPM.UI**: Vistas Avalonia, ViewModels (MVVM), inyector de dependencias.

---

## SECCIÓN 03: Módulos Funcionales

### 3.1 Autenticación y Registro (Users)
El sistema cuenta con una pantalla de login y registro.
* Validaciones contra la BD local (`User`).
* Contraseñas encriptadas con `BCrypt` (nunca texto plano).

### 3.2 Módulo de Salarios e Ingresos Adicionales (Salaries / Incomes)
* **Salario:** El usuario declara su salario mensual neto (entidad `Salary`). Se mantiene el historial de cambios.
* **Ingresos Adicionales:** Se pueden registrar ingresos extra (entidad `Income`) clasificados por tipo (`Bono`, `Freelance`, `Regalo`, `Venta`, `Otros`).
* Todas las estadísticas y saldos disponibles se recalculan usando la suma del salario activo más los ingresos del mes.

### 3.3 Módulo de Deudas (Debts)
Permite registrar compromisos financieros (préstamos, cuotas).
* **Campos:** Nombre, Descripción, Monto Total, Plazo en meses, Estado (`Pending`, `Paid`).
* **Cálculos:** Cuota mensual estimada, total acumulado, deuda restante.

### 3.4 Módulo de Tarjetas de Crédito (CreditCards / CardMovements)
Seguimiento avanzado de tarjetas de crédito.
* **Campos de tarjeta:** Nombre, Límite de crédito, Tasa de interés, Día de cierre/vencimiento.
* **Movimientos (`CardMovement`):** Historial detallado por cada consumo (`Consumo`) o pago (`Pago`).
* **Intereses:** El interés generado al corte se registra automáticamente como un consumo más ("Interés de cierre") para mantener el saldo cuadrado.

### 3.5 Módulo de Gastos Mensuales (Expenses)
Permite registrar salidas de dinero del mes.
* **Campos:** Descripción, Monto, Tipo de gasto (`Housing`, `Food`, `Transport`, `Entertainment`, `Health`, `Other`).
* **Cálculos:** Total de gastos del mes en curso, comparativas con el mes anterior.

### 3.6 Dashboard Principal
Ofrece una visión instantánea de la situación financiera:
* Saldo disponible estimado.
* Deudas activas y carga mensual.
* Resumen de tarjetas y gastos.

---

## SECCIÓN 04: Lineamientos de UI / UX

La interfaz sigue principios de diseño minimalista contemporáneo, inspirada en Apple Human Interface Guidelines.
* **Jerarquía visual:** Tamaños y pesos tipográficos claros.
* **Feedback inmediato:** Reacciones a interacciones del usuario.
* **Formato de moneda:** Separador de miles con punto (ej. 1.500.000). Sin decimales. El símbolo ₲ actúa como prefijo.

---

## SECCIÓN 05: Modelo de Base de Datos

Las tablas se definen en inglés en el código, respetando los estándares de desarrollo.

| Entidad (C#) | Mapeo / Función | Descripción |
| :--- | :--- | :--- |
| `User` | Usuarios | Datos de login (username y hash de contraseña). |
| `Salary` | Salarios | Historial de salarios mensuales declarados. |
| **`Income`** (Nuevo) | Ingresos Extras | Ingresos adicionales clasificados por `IncomeType`. |
| `Debt` | Deudas | Deudas a plazos, estado según `DebtStatus`. |
| `CreditCard` | Tarjetas | Límite, tasa de interés y fechas de corte. |
| **`CardMovement`** (Nuevo) | Libro de tarjeta | Detalle de consumos y pagos (`CardMovementType`). |
| `CreditCardPayment` | Pagos de tarjeta | Histórico de pagos de tarjeta de crédito consolidados. |
| `Expense` | Gastos | Gastos clasificados por `ExpenseType`. |

> [!TIP]
> El comando de migraciones usado es: `dotnet ef migrations add InitialCreate --project src/PPM.Infrastructure --startup-project src/PPM.UI`

---

## SECCIÓN 06: Requerimientos del Proyecto Académico

| Requerimiento | Implementación real en PPM-UAA |
| :--- | :--- |
| 3 operaciones/consultas | Dashboard, proyecciones (Incomes/Expenses), resúmenes. |
| 6 CRUDs completos | Implementados para `Users`, `Salaries`, `Debts`, `CreditCards`, `Incomes`, `Expenses`. |
| Lectura / escritura archivos | *(Módulo en desarrollo / Exportación de resúmenes)* |
| Menú principal | Interfaz basada en Avalonia con Sidebar y Vistas. |
| Login encriptado | Implementado usando `BCrypt.Net-Next`. |
| Enums requeridos | Creados: `ExpenseType`, `DebtStatus`, `UserRole`, `IncomeType`, `CardMovementType`. |
| Excepciones | Try/catch integrados en repositorios y ViewModels. |
| Controles responsivos | Uso de `Grid`, `StackPanel` y Data Binding en `.axaml`. |

---

## SECCIÓN 07: Entregables del Proyecto

El paquete final deberá contener la carpeta raíz comprimida que incluya:
1. **Código fuente:** La solución `.sln` y los proyectos en `/src`.
2. **Base de Datos:** Al correr el proyecto, la base `ppm.db` se auto-crea en la carpeta de ejecución gracias a las migraciones de EF Core.
3. **Documentación:** Este documento actualizado.
