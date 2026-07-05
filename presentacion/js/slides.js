// js/slides.js
const presentationData = {
    metadata: {
        title: "Defensa Técnica: PPM (Personal Process Manager)",
        totalTimeMinutes: 20,
        team: ["Mauro Silvero", "Francesco Paez", "Wilson Ayala", "Ana Gayoso", "Marcos Bogado"]
    },
    slides: [
        {
            id: 1,
            title: "PPM — Personal Process Manager",
            subtitle: "Sistema Multiplataforma de Gestión de Finanzas 100% Local",
            presenter: "Mauro Silvero",
            nextPresenter: "Mauro Silvero",
            recommendedTimeSeconds: 90,
            content: `
                <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; height: 100%; gap: 1.5rem;">
                    <div style="font-size: 1.8rem; font-weight: 600; color: var(--accent-emerald); background: rgba(16, 185, 129, 0.08); padding: 0.8rem 2rem; border-radius: 50px; border: 1px solid rgba(16, 185, 129, 0.2);">
                        Universidad Autónoma de Asunción (UAA)
                    </div>
                    <p style="font-size: 1.5rem; color: var(--text-muted); margin: 0.5rem 0;">Materia: Introduccion a la programacion orientada a objetos / C#</p>
                    
                    <div class="fragment" style="margin-top: 1rem; width: 100%; max-width: 800px; display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem;">
                        <div style="background: rgba(30, 41, 59, 0.6); padding: 1.2rem 0.5rem; border-radius: 8px; border: 1px solid var(--border-color);">
                            <div style="color: var(--accent-blue); font-weight: 700; font-size: 1.1rem; margin-bottom: 5px;">Mauro Silvero</div>
                            <div style="font-size: 0.75rem; color: var(--text-muted);">Coordinador / UI</div>
                        </div>
                        <div style="background: rgba(30, 41, 59, 0.6); padding: 1.2rem 0.5rem; border-radius: 8px; border: 1px solid var(--border-color);">
                            <div style="color: var(--accent-blue); font-weight: 700; font-size: 1.1rem; margin-bottom: 5px;">Francesco Paez</div>
                            <div style="font-size: 0.75rem; color: var(--text-muted);">Arquitectura / QA</div>
                        </div>
                        <div style="background: rgba(30, 41, 59, 0.6); padding: 1.2rem 0.5rem; border-radius: 8px; border: 1px solid var(--border-color);">
                            <div style="color: var(--accent-blue); font-weight: 700; font-size: 1.1rem; margin-bottom: 5px;">Wilson Ayala</div>
                            <div style="font-size: 0.75rem; color: var(--text-muted);">Estructura / UX</div>
                        </div>
                        <div style="background: rgba(30, 41, 59, 0.6); padding: 1.2rem 0.5rem; border-radius: 8px; border: 1px solid var(--border-color);">
                            <div style="color: var(--accent-blue); font-weight: 700; font-size: 1.1rem; margin-bottom: 5px;">Ana Gayoso</div>
                            <div style="font-size: 0.75rem; color: var(--text-muted);">Frontend / UI</div>
                        </div>
                        <div style="background: rgba(30, 41, 59, 0.6); padding: 1.2rem 0.5rem; border-radius: 8px; border: 1px solid var(--border-color);">
                            <div style="color: var(--accent-blue); font-weight: 700; font-size: 1.1rem; margin-bottom: 5px;">Marcos Bogado</div>
                            <div style="font-size: 0.75rem; color: var(--text-muted);">Backend / DB</div>
                        </div>
                    </div>
                    
                    <p style="font-size: 1.2rem; color: var(--text-muted); margin-top: 1rem;">Asunción, Paraguay &bull; Julio 2026</p>
                </div>
            `,
            notes: {
                goal: "Presentar formalmente el proyecto, la institución, la materia y los integrantes del equipo de desarrollo, estableciendo un tono profesional y académico.",
                speech: "Buenas tardes, profesor y compañeros. Hoy venimos a presentar nuestro proyecto de fin de curso llamado PPM (Personal Process Manager). Es una aplicación de escritorio multiplataforma diseñada para ayudar a las personas a tomar el control absoluto de sus finanzas personales de forma privada, segura y sin depender de servicios en la nube. A lo largo de esta presentación, detallaremos no solo qué hace la aplicación, sino cómo la hemos diseñado bajo estándares de Clean Architecture y las decisiones tecnológicas que tomamos para garantizar un software robusto, mantenible y escalable.",
                cues: [
                    "Mantener contacto visual directo con la mesa examinadora.",
                    "Asegurar que los nombres de los integrantes aparezcan legibles.",
                    "El título destaca 'PPM', pero aclara inmediatamente que se trata de finanzas personales."
                ],
                bodyLanguage: [
                    "Postura erguida, hombros relajados para transmitir confianza.",
                    "Sonreír al saludar y mirar a todos los miembros de la mesa examinadora."
                ],
                keywords: ["Finanzas", "Privado", "Local", "Clean Architecture", "PPM"],
                dontForget: [
                    "Mencionar que el proyecto es 100% offline y local por diseño.",
                    "Agradecer la presencia del profesor evaluador."
                ],
                questions: [
                    {
                        q: "¿Cuál fue el rol del coordinador en el desarrollo de la arquitectura del proyecto?",
                        a: "El coordinador se encargó de alinear los esfuerzos, velar por la separación de responsabilidades y asegurar que la comunicación entre las capas a través de los contratos de interfaz se cumpliera según el diseño arquitectónico estipulado."
                    }
                ]
            }
        },
        {
            id: 2,
            title: "El Desafío de la Salud Financiera",
            subtitle: "Planteamiento del Problema y Propuesta de Valor",
            presenter: "Mauro Silvero",
            nextPresenter: "Francesco Paez",
            recommendedTimeSeconds: 120,
            content: `
                <div style="display: flex; gap: 2rem; height: 100%; align-items: center;">
                    <div style="flex: 1; display: flex; flex-direction: column; gap: 1.2rem;">
                        <div class="fragment" style="background: rgba(239, 68, 68, 0.08); padding: 1.5rem; border-left: 5px solid #EF4444; border-radius: 6px;">
                            <h3 style="color: #EF4444; margin: 0 0 0.5rem 0; font-size: 1.3rem;">El Problema Financiero Diario</h3>
                            <p style="margin: 0; font-size: 1.1rem; color: var(--text-muted);">
                                Falta de visibilidad del presupuesto real neto, complejidad en el cálculo acumulativo de tarjetas de crédito con proyección de intereses y descontrol de deudas fijas.
                            </p>
                        </div>
                        <div class="fragment" style="background: rgba(245, 158, 11, 0.08); padding: 1.5rem; border-left: 5px solid var(--accent-orange); border-radius: 6px;">
                            <h3 style="color: var(--accent-orange); margin: 0 0 0.5rem 0; font-size: 1.3rem;">La Falta de Privacidad</h3>
                            <p style="margin: 0; font-size: 1.1rem; color: var(--text-muted);">
                                El recelo natural de los usuarios a subir información extremadamente sensible de sus ingresos, egresos y contraseñas a servidores en la nube de terceros.
                            </p>
                        </div>
                    </div>
                    
                    <div class="fragment" style="flex: 1; background: rgba(16, 185, 129, 0.05); padding: 2rem; border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 8px; border-left: 6px solid var(--accent-emerald);">
                        <h3 style="color: var(--accent-emerald); margin: 0 0 1rem 0; font-size: 1.6rem; letter-spacing: -0.5px;">La Solución: PPM</h3>
                        <ul style="margin: 0; padding-left: 1.2rem; font-size: 1.15rem; display: flex; flex-direction: column; gap: 0.8rem;">
                            <li><strong>Offline por Diseño:</strong> Los datos se guardan exclusivamente en el disco del usuario.</li>
                            <li><strong>Dashboard Inteligente:</strong> Consolidación automática de salario neto tras descuentos de IPS.</li>
                            <li><strong>Tarjetas y Deudas:</strong> Control granular de cuotas pendientes y cálculo de intereses de cierres.</li>
                            <li><strong>Privacidad Garantizada:</strong> Seguridad local con cifrado adaptativo de credenciales.</li>
                        </ul>
                    </div>
                </div>
            `,
            notes: {
                goal: "Explicar el problema del descontrol financiero personal, la falta de privacidad en las herramientas existentes en la nube y cómo la propuesta offline de PPM responde a estas necesidades.",
                speech: "La mayoría de las personas no sabe con exactitud cuánto dinero libre tiene a fin de mes. Tienen un salario bruto, pero a este se le restan aportes jubilatorios como el IPS en Paraguay, cuotas de deudas fijas o el pago mínimo de las tarjetas de crédito. Muchas aplicaciones en el mercado exigen conexión a internet y suben datos financieros sensibles a la nube, lo que ahuyenta a usuarios preocupados por su privacidad. PPM resuelve esto de raíz: funciona de manera 100% local y offline, consolidando toda la información financiera en un Dashboard inteligente que parte del salario neto del usuario.",
                cues: [
                    "Enfatizar fuertemente las palabras 'Privacidad' y 'Control Local'. Esto justifica la elección de la base de datos SQLite.",
                    "Hacer un ademán de rechazo al hablar de la 'Nube' y de resguardo/seguridad al hablar de 'PPM'."
                ],
                bodyLanguage: [
                    "Usar las manos abiertas al explicar la propuesta de valor.",
                    "Dirigir la mirada a la pantalla al mostrar el contraste entre el problema y la solución."
                ],
                keywords: ["Privacidad", "Offline", "IPS", "Tarjetas de Crédito", "Salario Neto"],
                dontForget: [
                    "Mencionar que el IPS representa el 9% de descuento previsional para empleados en Paraguay.",
                    "Introducir formalmente el paso al stack tecnológico que justifica esta arquitectura offline."
                ],
                questions: [
                    {
                        q: "¿Por qué decidieron utilizar SQLite en lugar de un servidor de base de datos relacional robusto como SQL Server o PostgreSQL?",
                        a: "Al ser una aplicación orientada a finanzas personales de escritorio, el requerimiento principal era que el software funcione sin conexión a internet y sin configuraciones complejas por parte del usuario final. Usar SQL Server requeriría que el usuario instale y configure un servidor de bases de datos local en su sistema. SQLite embebe el motor SQL directamente en el binario compilado y almacena los datos en un solo archivo físico en el disco local, facilitando la portabilidad y garantizando el almacenamiento local privado."
                    }
                ]
            }
        },
        {
            id: 3,
            title: "Stack Tecnológico y Justificación",
            subtitle: "¿Por qué elegimos estas herramientas?",
            presenter: "Francesco Paez",
            nextPresenter: "Francesco Paez",
            recommendedTimeSeconds: 150,
            content: `
                <div style="display: flex; flex-direction: column; gap: 1.5rem; height: 100%; justify-content: center;">
                    <div style="overflow-x: auto;">
                        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 1.15rem;">
                            <thead>
                                <tr style="border-bottom: 2px solid var(--accent-blue); background: rgba(30, 41, 59, 0.4);">
                                    <th style="padding: 12px 20px; color: var(--accent-blue); font-weight: 700;">Capa</th>
                                    <th style="padding: 12px 20px; color: var(--accent-blue); font-weight: 700;">Tecnología Seleccionada</th>
                                    <th style="padding: 12px 20px; color: var(--accent-blue); font-weight: 700;">Criterio / Justificación Técnica</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="fragment" style="border-bottom: 1px solid var(--border-color);">
                                    <td style="padding: 12px 20px;"><strong>Lenguaje y SDK</strong></td>
                                    <td style="padding: 12px 20px; font-family: var(--font-mono); color: var(--accent-emerald);">.NET 8.0 LTS / C# 12.0</td>
                                    <td style="padding: 12px 20px; color: var(--text-muted);">Soporte corporativo de largo plazo, tipado estático fuerte, y sintaxis moderna (Primary Constructors, Colecciones).</td>
                                </tr>
                                <tr class="fragment" style="border-bottom: 1px solid var(--border-color);">
                                    <td style="padding: 12px 20px;"><strong>Interfaz de Usuario</strong></td>
                                    <td style="padding: 12px 20px; font-family: var(--font-mono); color: var(--accent-emerald);">Avalonia UI 11.3.10</td>
                                    <td style="padding: 12px 20px; color: var(--text-muted);">Framework XAML multiplataforma moderno. Reemplaza a WPF/WinForms con renderizado nativo en Windows, macOS y Linux.</td>
                                </tr>
                                <tr class="fragment" style="border-bottom: 1px solid var(--border-color);">
                                    <td style="padding: 12px 20px;"><strong>Acceso a Datos</strong></td>
                                    <td style="padding: 12px 20px; font-family: var(--font-mono); color: var(--accent-emerald);">EF Core 8.0 & SQLite</td>
                                    <td style="padding: 12px 20px; color: var(--text-muted);">ORM potente para el mapeo objeto-relacional y base de datos embebida ligera, almacenada en un archivo único local (.db).</td>
                                </tr>
                                <tr class="fragment">
                                    <td style="padding: 12px 20px;"><strong>Seguridad</strong></td>
                                    <td style="padding: 12px 20px; font-family: var(--font-mono); color: var(--accent-emerald);">BCrypt.Net-Next 4.0.3</td>
                                    <td style="padding: 12px 20px; color: var(--text-muted);">Mecanismo de hashing adaptativo unidireccional y sal para la protección local del login del usuario.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `,
            notes: {
                goal: "Describir y justificar el stack tecnológico seleccionado, demostrando que cada herramienta fue elegida bajo criterios rigurosos de diseño multiplataforma y portabilidad local.",
                speech: "Para construir PPM no recurrimos a tecnologías obsoletas como Windows Forms, que nos encadenarían a Windows. En su lugar, optamos por Avalonia UI combinado con .NET 8.0, permitiéndonos compilar un único ejecutable nativo para Windows, Linux o macOS. En la persistencia de datos elegimos Entity Framework Core con SQLite. Esto significa que la base de datos se guarda en un único archivo físico local (ppm.db), eliminando la necesidad de que el usuario final instale un motor de base de datos pesado. Finalmente, las contraseñas se almacenan cifradas con BCrypt, garantizando la seguridad incluso si un tercero accede al archivo de base de datos físico.",
                cues: [
                    "Estar preparado para justificar por qué no se usó Electron o tecnologías web (por consumo de RAM y rendimiento nativo).",
                    "Destacar el término 'LTS' (Long Term Support) de .NET 8.0."
                ],
                bodyLanguage: [
                    "Mantenerse de pie en el centro si es posible. Mostrar firmeza con un tono de voz moderado pero categórico.",
                    "Señalar las filas de la tabla según se van explicando con la mano extendida."
                ],
                keywords: ["LTS", "Multiplataforma", "Avalonia UI", "EF Core", "SQLite", "BCrypt"],
                dontForget: [
                    "Mencionar que BCrypt tiene resistencia innata ante ataques de fuerza bruta debido a su factor de costo configurable.",
                    "Aclarar que Avalonia utiliza renderizado de hardware nativo (Skia) para máxima fluidez visual."
                ],
                questions: [
                    {
                        q: "¿Qué mecanismo utilizaron para proteger las contraseñas de los usuarios y dónde se ejecuta este proceso?",
                        a: "Las contraseñas se protegen utilizando cifrado unidireccional con sal dinámica mediante el algoritmo de hash adaptativo BCrypt. Este proceso se ejecuta en la capa de servicios de la aplicación (AuthService) en la capa de Aplicación, consumiendo la abstracción IPasswordHasher cuya implementación concreta reside en la infraestructura bajo la clase BCryptPasswordHasher. Nunca se almacena ni compara la contraseña en texto plano."
                    }
                ]
            }
        },
        {
            id: 4,
            title: "Arquitectura General de la Aplicación",
            subtitle: "Principios de Clean Architecture (Arquitectura Limpia)",
            presenter: "Francesco Paez",
            nextPresenter: "Wilson Ayala",
            recommendedTimeSeconds: 180,
            content: `
                <div style="display: flex; gap: 2rem; height: 100%; align-items: center;">
                    <div style="flex: 1.1;">
                        <div class="mermaid">
                        graph TD
                            UI[PPM.UI - Interfaz de Usuario y ViewModels]
                            INFRA[PPM.Infrastructure - EF Core, BCrypt, CSV]
                            APP[PPM.Application - Servicios y Casos de Uso]
                            DOM[PPM.Domain - Entidades de Negocio y Contratos]
                            
                            UI -->|Depende de| APP
                            INFRA -->|Implementa contratos de| APP
                            INFRA -->|Depende de| DOM
                            APP -->|Depende de| DOM
                            
                            style DOM fill:#10B981,stroke:#047857,stroke-width:2px,color:#fff
                            style APP fill:#3B82F6,stroke:#1D4ED8,stroke-width:2px,color:#fff
                            style INFRA fill:#F59E0B,stroke:#D97706,stroke-width:2px,color:#fff
                            style UI fill:#8B5CF6,stroke:#6D28D9,stroke-width:2px,color:#fff
                        </div>
                    </div>
                    
                    <div style="flex: 0.9; display: flex; flex-direction: column; gap: 1rem;">
                        <div class="fragment" style="background: rgba(16, 185, 129, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid var(--accent-emerald);">
                            <h4 style="margin: 0 0 5px 0; color: var(--accent-emerald); font-size: 1.15rem;">PPM.Domain (El Núcleo)</h4>
                            <p style="margin: 0; font-size: 0.95rem; color: var(--text-muted);">Entidades puras del negocio y firmas de interfaces. Cero dependencias externas.</p>
                        </div>
                        <div class="fragment" style="background: rgba(59, 130, 246, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid var(--accent-blue);">
                            <h4 style="margin: 0 0 5px 0; color: var(--accent-blue); font-size: 1.15rem;">PPM.Application (Casos de Uso)</h4>
                            <p style="margin: 0; font-size: 0.95rem; color: var(--text-muted);">Lógica central de la aplicación y servicios financieros. Solo depende del dominio.</p>
                        </div>
                        <div class="fragment" style="background: rgba(245, 158, 11, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid var(--accent-orange);">
                            <h4 style="margin: 0 0 5px 0; color: var(--accent-orange); font-size: 1.15rem;">PPM.Infrastructure (Detalles)</h4>
                            <p style="margin: 0; font-size: 0.95rem; color: var(--text-muted);">Manejo físico de SQLite, cifrado con BCrypt, y exportador a archivos CSV.</p>
                        </div>
                        <div class="fragment" style="background: rgba(139, 92, 246, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid var(--accent-purple);">
                            <h4 style="margin: 0 0 5px 0; color: var(--accent-purple); font-size: 1.15rem;">PPM.UI (Presentación)</h4>
                            <p style="margin: 0; font-size: 0.95rem; color: var(--text-muted);">Vistas AXAML y ViewModels (MVVM). Une e inyecta las dependencias.</p>
                        </div>
                    </div>
                </div>
            `,
            notes: {
                goal: "Mostrar el diseño arquitectónico del software basado en la separación de responsabilidades y la regla de dependencia hacia el núcleo (Domain).",
                speech: "El proyecto está estructurado siguiendo principios rigurosos de Clean Architecture. Lo dividimos en cuatro proyectos C# claramente desacoplados. En el centro de todo reside PPM.Domain, donde viven las entidades y constantes de negocio puras, como la tasa del IPS. Esta capa es 100% pura y no conoce nada de bases de datos o interfaces visuales. En torno a ella está PPM.Application, que define los servicios del sistema. Por fuera se sitúan PPM.Infrastructure y PPM.UI. Esta separación física estricta nos permite cambiar mañana mismo la base de datos SQLite por SQL Server o migrar la interfaz Avalonia a Web sin alterar una sola línea de lógica de negocio o de las entidades en el núcleo.",
                cues: [
                    "Explicar que la flecha siempre apunta hacia adentro (la regla de dependencia).",
                    "Mencionar que el acoplamiento directo entre la interfaz y la infraestructura está prohibido en tiempo de compilación."
                ],
                bodyLanguage: [
                    "Hacer gestos con círculos concéntricos usando las manos para ilustrar las capas de la arquitectura.",
                    "Mirar al tribunal al explicar las ventajas de la mantenibilidad a largo plazo."
                ],
                keywords: ["Clean Architecture", "Regla de Dependencia", "Desacoplamiento", "SOLID", "Domain"],
                dontForget: [
                    "Aclarar que el acoplamiento físico entre capas se controla con referencias en archivos csproj.",
                    "Dar paso a Wilson Ayala para ver la organización física de las carpetas."
                ],
                questions: [
                    {
                        q: "¿Por qué decidieron dividir el proyecto en 4 subproyectos en lugar de hacer una única aplicación monolítica?",
                        a: "La división en múltiples subproyectos nos permite forzar físicamente la separación de responsabilidades en tiempo de compilación. Al no tener referencias directas desde el dominio hacia las capas de UI o infraestructura, garantizamos que las reglas de negocio permanezcan puras. Esto facilita el mantenimiento, la realización de pruebas unitarias aisladas y la posibilidad de cambiar de interfaz o motor de base de datos en el futuro sin tocar el núcleo."
                    },
                    {
                        q: "¿Por qué definieron las interfaces de los repositorios en la capa PPM.Domain en lugar de la capa PPM.Infrastructure donde se implementan?",
                        a: "Esta es la esencia del principio de Inversión de Dependencias (la D de SOLID). Si definiéramos las interfaces en la infraestructura, la capa de aplicación debería depender de la infraestructura para poder consumirlas, rompiendo la arquitectura limpia. Al colocar las interfaces en el dominio, indicamos al sistema que la persistencia es solo un detalle externo. El dominio dicta las reglas de cómo interactuar con los datos y es la infraestructura la que debe adaptarse implementando dichas interfaces."
                    }
                ]
            }
        },
        {
            id: 5,
            title: "Árbol de Directorios del Código Fuente",
            subtitle: "Organización Física de la Solución C#",
            presenter: "Wilson Ayala",
            nextPresenter: "Wilson Ayala",
            recommendedTimeSeconds: 150,
            content: `
                <div style="display: flex; gap: 1.5rem; height: 100%; align-items: center; justify-content: center;">
                    <div style="flex: 0.9; background-color: #0d1117; border: 1px solid var(--border-color); border-radius: 8px; padding: 0.8rem; box-shadow: inset 0 0 10px rgba(0,0,0,0.5);">
                        <pre style="margin: 0; background: none; border: none; padding: 0; font-size: 0.78rem; line-height: 1.3;"><code class="language-plaintext">src/
├── PPM.Domain/
│   ├── Constants/       # Constantes del negocio (e.g. IPS = 9%)
│   ├── Entities/        # Clases de dominio ricas (User, Salary, Debt, etc.)
│   ├── Enums/           # Enumeraciones (CardMovementType, DebtStatus)
│   ├── Exceptions/      # Excepciones de negocio personalizadas
│   └── Interfaces/      # Contratos de acceso a datos (IUserRepository)
├── PPM.Application/
│   ├── DTOs/            # Estructuras de datos planas inmutables (records)
│   └── Services/        # Lógica de aplicación y orquestación
├── PPM.Infrastructure/
│   ├── Data/            # DbContext de EF Core, configuraciones Fluent API
│   ├── Export/          # CsvExportService para reportes
│   ├── Migrations/      # Historial de cambios de base de datos
│   └── Repositories/    # Implementaciones concretas de acceso a datos con EF
└── PPM.UI/
    ├── Converters/      # Formateadores visuales de UI (GuaraniConverter)
    ├── ViewModels/      # Lógica de pantalla y enlaces de datos (MVVM)
    └── Views/           # Declaración visual en XAML (archivos .axaml)</code></pre>
                    </div>
                    
                    <div style="flex: 1.1; display: flex; flex-direction: column; gap: 0.6rem;">
                        <h3 style="color: var(--accent-blue); margin: 0 0 0.3rem 0; font-size: 1.2rem;">Coherencia entre Arquitectura y Estructura</h3>
                        <ul style="margin: 0; padding-left: 1.2rem; font-size: 0.95rem; display: flex; flex-direction: column; gap: 0.4rem;">
                            <li class="fragment"><strong>Domain Puro:</strong> La carpeta <code>Entities</code> contiene lógica rica, sin dependencias con el ORM ni con el framework de base de datos.</li>
                            <li class="fragment"><strong>Desacoplamiento con DTOs:</strong> Ubicados en <code>PPM.Application/DTOs</code> para evitar exponer entidades directamente a las pantallas.</li>
                            <li class="fragment"><strong>Aislamiento de Infraestructura:</strong> Separación estricta de repositorios y migraciones de Entity Framework de la lógica de negocio.</li>
                            <li class="fragment"><strong>Patrón MVVM Claro:</strong> ViewModels y Views separados de forma limpia en el proyecto ejecutable <code>PPM.UI</code>.</li>
                        </ul>
                    </div>
                </div>
            `,
            notes: {
                goal: "Mostrar la organización de carpetas del código fuente y explicar la responsabilidad física de cada directorio dentro de la solución.",
                speech: "Aquí podemos ver cómo se organiza físicamente el código de PPM en nuestro disco. Cada una de las carpetas responde a un propósito de diseño específico. En el dominio vemos que las entidades de negocio se separan de los contratos de persistencia. En la capa de aplicación, los servicios coordinan los flujos y se comunican con el exterior únicamente mediante DTOs (Data Transfer Objects), evitando exponer las entidades del dominio directamente a la UI. En infraestructura agrupamos la implementación de EF Core y los repositorios, y en la UI se sigue el patrón MVVM estricto, separando las vistas en XAML de sus correspondientes ViewModels de C#, enlazados dinámicamente mediante un ViewLocator.",
                cues: [
                    "Explicar brevemente que los archivos .axaml en Avalonia equivalen a los archivos .xaml de WPF.",
                    "Indicar que las carpetas reflejan exactamente la división conceptual que Francesco acaba de plantear."
                ],
                bodyLanguage: [
                    "Dirigir la mirada hacia el árbol del código en la pantalla y guiar con el dedo índice los directorios principales.",
                    "Girar hacia el tribunal para enfatizar la consistencia organizativa."
                ],
                keywords: ["Directorio", "ViewModels", "Views", "DTOs", "Entities", "XAML"],
                dontForget: [
                    "Mencionar que la inmutabilidad de los DTOs se logra utilizando 'public record' en C#.",
                    "Comentar que la carpeta Migrations permite reconstruir la base de datos de manera evolutiva."
                ],
                questions: [
                    {
                        q: "Si quisieran migrar la interfaz de usuario de Avalonia UI a una aplicación Web (por ejemplo, Blazor o ASP.NET Core), ¿qué partes del código deberían reescribir?",
                        a: "Únicamente deberíamos descartar el proyecto PPM.UI y crear un nuevo proyecto web. El 100% de la lógica de negocio (PPM.Application), las entidades financieras (PPM.Domain) y el motor de persistencia con SQLite (PPM.Infrastructure) se reutilizarían tal como están, ya que son proyectos independientes (bibliotecas de clases) desacoplados de la interfaz gráfica."
                    }
                ]
            }
        },
        {
            id: 6,
            title: "Flujo Completo del Programa",
            subtitle: "Ciclo de Vida de una Acción del Usuario (Mecanismo MVVM)",
            presenter: "Wilson Ayala",
            nextPresenter: "Wilson Ayala",
            recommendedTimeSeconds: 180,
            content: `
                <div style="display: flex; flex-direction: column; gap: 1rem; height: 100%; justify-content: center;">
                    <div style="width: 100%; display: flex; justify-content: center;">
                        <div class="mermaid" style="width: 90%;">
                        sequenceDiagram
                            participant UI as Vista (ExpensesView)
                            participant VM as ViewModel (ExpensesViewModel)
                            participant SV as Servicio (ExpenseService)
                            participant RP as Repositorio (ExpenseRepository)
                            participant DB as SQLite (AppDbContext)
                            
                            UI->>VM: Evento Clic (Guardar Gasto)
                            VM->>VM: Ejecuta RelayCommand asíncrono
                            VM->>SV: Llama CreateAsync(CreateExpenseDto)
                            Note over SV: Valida Negocio (Monto > 0)
                            SV->>RP: Instancia entidad y llama AddAsync(Expense)
                            RP->>DB: DbSet.AddAsync() & SaveChangesAsync()
                            DB-->>RP: Confirma Guardado Físico
                            RP-->>SV: Retorna Tarea Completa
                            SV-->>VM: Retorna ExpenseDto de respuesta
                            VM->>VM: Inserta en ObservableCollection
                            VM-->>UI: UI se actualiza reactivamente (Data Binding)
                        </div>
                    </div>
                </div>
            `,
            notes: {
                goal: "Ilustrar el viaje de los datos y el flujo de control a través de las capas de la arquitectura ante una interacción típica de usuario.",
                speech: "Para entender el funcionamiento interno de la aplicación, es fundamental ver cómo fluyen los datos. Cuando un usuario carga un gasto, por ejemplo de 'Alimentación' por 50.000 Gs, interactúa con ExpensesView. Al presionar 'Guardar', se ejecuta un comando asíncrono en el ExpensesViewModel. Este solicita al servicio ExpenseService que cree el gasto pasándole un DTO. El servicio aplica las reglas de negocio, validando que el monto no sea cero ni negativo. Si pasa, crea la entidad de dominio Expense y llama al ExpenseRepository. El repositorio, utilizando Entity Framework Core, traduce este objeto en una sentencia SQL e inserta la fila en SQLite de forma asíncrona. Finalmente, la respuesta viaja de vuelta, se actualiza la colección observable en el ViewModel y la interfaz se redibuja automáticamente gracias al enlace de datos reactivo.",
                cues: [
                    "Destacar el uso de operaciones asíncronas (async/await) en todo el ciclo, lo cual evita que el hilo de UI se congele mientras se escribe en disco.",
                    "Explicar que la comunicación de regreso se basa en eventos de notificación (Property Changed)."
                ],
                bodyLanguage: [
                    "Acompañar con un gesto fluido de la mano el recorrido de izquierda a derecha en el diagrama de secuencia.",
                    "Expresar tranquilidad mediante una postura estable al explicar el comportamiento asincrónico."
                ],
                keywords: ["Secuencia", "Data Binding", "RelayCommand", "Async/Await", "ObservableCollection"],
                dontForget: [
                    "Mencionar que el guardado físico ocurre recién al invocar SaveChangesAsync() en el repositorio.",
                    "Aclarar que los hilos no se bloquean gracias a la asincronía nativa de .NET 8.0."
                ],
                questions: [
                    {
                        q: "¿Por qué los métodos de navegación del menú del Shell retornan una Task y están marcados con el atributo [RelayCommand]?",
                        a: "Los métodos asíncronos de navegación deben solicitar información a la base de datos de manera no bloqueante al cargar el panel respectivo. Al retornar una Task, permitimos que la navegación sea asíncrona. El atributo [RelayCommand] (provisto por CommunityToolkit.Mvvm) le indica al compilador que genere automáticamente un comando de tipo IRelayCommand que la vista XAML puede enlazar directamente al atributo Command de un botón, respetando el diseño desacoplado de MVVM."
                    }
                ]
            }
        },
        {
            id: 7,
            title: "Relación entre Interfaz y Código",
            subtitle: "Contenedores y el Mecanismo de Navegación Dinámica",
            presenter: "Ana Gayoso",
            nextPresenter: "Ana Gayoso",
            recommendedTimeSeconds: 150,
            content: `
                <div style="display: flex; gap: 2rem; height: 100%; align-items: center;">
                    <div style="flex: 1.1; display: flex; flex-direction: column; gap: 1.2rem;">
                        <div class="fragment" style="background: rgba(139, 92, 246, 0.08); padding: 1.2rem; border-left: 4px solid var(--accent-purple); border-radius: 6px;">
                            <h4 style="margin: 0 0 5px 0; color: var(--accent-purple); font-size: 1.2rem;">MainWindow: El Anfitrión de la UI</h4>
                            <p style="margin: 0; font-size: 1rem; color: var(--text-muted);">Ventana contenedora principal. Aloja dinámicamente el contenido vinculando su propiedad <code>CurrentPage</code> a un <code>ViewModelBase</code>.</p>
                        </div>
                        <div class="fragment" style="background: rgba(59, 130, 246, 0.08); padding: 1.2rem; border-left: 4px solid var(--accent-blue); border-radius: 6px;">
                            <h4 style="margin: 0 0 5px 0; color: var(--accent-blue); font-size: 1.2rem;">LoginView a ShellView</h4>
                            <p style="margin: 0; font-size: 1rem; color: var(--text-muted);">Al autenticarse, <code>LoginViewModel</code> dispara un evento <code>LoginSucceeded</code>. El host captura el evento y sustituye la vista por <code>ShellView</code> destruyendo el login en memoria.</p>
                        </div>
                        <div class="fragment" style="background: rgba(16, 185, 129, 0.08); padding: 1.2rem; border-left: 4px solid var(--accent-emerald); border-radius: 6px;">
                            <h4 style="margin: 0 0 5px 0; color: var(--accent-emerald); font-size: 1.2rem;">Navegación Dinámica en ShellView</h4>
                            <p style="margin: 0; font-size: 1rem; color: var(--text-muted);">El menú lateral cambia <code>CurrentPage</code> en <code>ShellViewModel</code> solicitando los sub-ViewModels al contenedor de dependencias.</p>
                        </div>
                    </div>
                    
                    <div class="fragment" style="flex: 0.9; background: rgba(30, 41, 59, 0.5); border: 1px solid var(--border-color); border-radius: 8px; padding: 1.5rem; text-align: center;">
                        <h4 style="color: var(--accent-orange); margin-top: 0; font-size: 1.3rem;">El Rol del ViewLocator</h4>
                        <p style="font-size: 1.1rem; color: var(--text-muted); text-align: left; line-height: 1.5;">
                            Avalonia utiliza un mecanismo reflexivo para enlazar vistas. Cuando detecta que el contenido cambia a un ViewModel tipo <code>XxxViewModel</code>, el <code>ViewLocator</code> localiza automáticamente la clase visual <code>XxxView</code> mediante convención de nombres y la renderiza en el contenedor principal.
                        </p>
                        <div style="background: #0d1117; padding: 0.8rem; border-radius: 6px; font-family: var(--font-mono); font-size: 0.85rem; color: var(--accent-emerald); border: 1px solid var(--border-color); margin-top: 1rem;">
                            ViewModel &rarr; Reemplazar "ViewModels" por "Views" &rarr; Vista
                        </div>
                    </div>
                </div>
            `,
            notes: {
                goal: "Explicar cómo se comunican las pantallas principales sin acoplamiento y cómo funciona el motor de navegación dinámica en Avalonia UI.",
                speech: "Una de las preguntas típicas en una defensa es cómo se comunican las pantallas si no usamos variables globales. En PPM lo resolvimos de forma limpia mediante eventos y la sustitución dinámica del contexto de datos. MainWindow es una ventana vacía con un espacio reservado. Inicialmente aloja a LoginView. Cuando el login es correcto, el LoginViewModel dispara el evento LoginSucceeded. El MainWindowViewModel captura el evento y reemplaza la página por el ShellView. El ShellView maneja un menú lateral. Al hacer clic en un módulo, se solicita al contenedor de dependencias el ViewModel correspondiente y el ViewLocator localiza la vista asociada y la renderiza en pantalla al instante.",
                cues: [
                    "Destacar que este enfoque previene la acumulación de ventanas abiertas en el escritorio.",
                    "Explicar que la inyección de dependencias nos ayuda a resolver las vistas en caliente."
                ],
                bodyLanguage: [
                    "Usar gestos de expansión de brazos para indicar cómo MainWindow contiene y aloja dinámicamente a las demás sub-vistas.",
                    "Mantener un tono conversacional fluido e interactivo."
                ],
                keywords: ["MainWindow", "LoginView", "ShellView", "ViewLocator", "Navegación"],
                dontForget: [
                    "Recalcar que el ViewLocator reduce la cantidad de código repetitivo de UI.",
                    "Indicar que el LoginView se destruye en memoria por seguridad para no almacenar las credenciales."
                ],
                questions: [
                    {
                        q: "¿Qué es el ViewLocator y cómo lo utiliza Avalonia UI en este proyecto?",
                        a: "El ViewLocator es un proveedor de plantillas de datos implementado en ViewLocator.cs. Funciona bajo convención de nombres: toma el nombre completo del tipo del ViewModel (ej. PPM.UI.ViewModels.DashboardViewModel), reemplaza por reflexión 'ViewModels' por 'Views' y 'ViewModel' por 'View', obteniendo la clase PPM.UI.Views.DashboardView. Luego la instancia de forma dinámica, asociándole el ViewModel como su DataContext, lo que automatiza el dibujo de pantallas."
                    },
                    {
                        q: "¿Cómo se implementa la separación de las reglas de visualización y cómo evitaron el acoplamiento directo entre vistas en el ShellView?",
                        a: "Se logra delegando la navegación al ViewModel mediante enlace de datos dinámico. El ShellView contiene un control ContentControl cuya propiedad Content está vinculada a CurrentPage en el ShellViewModel. Al cambiar de módulo, actualizamos CurrentPage en el ViewModel. Gracias al ViewLocator, Avalonia instancia e inyecta la vista correspondiente sin que los archivos de código de las vistas conozcan la existencia de otras vistas."
                    }
                ]
            }
        },
        {
            id: 8,
            title: "Módulos de Negocio del Sistema",
            subtitle: "Funcionalidades Financieras Clave de PPM",
            presenter: "Ana Gayoso",
            nextPresenter: "Marcos Bogado",
            recommendedTimeSeconds: 180,
            content: `
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.2rem; height: 100%; align-content: center;">
                    <div class="fragment" style="background: rgba(16, 185, 129, 0.08); padding: 1.2rem; border-radius: 6px; border: 1px solid rgba(16, 185, 129, 0.2);">
                        <h3 style="color: var(--accent-emerald); margin: 0 0 0.5rem 0; font-size: 1.25rem;">Módulo de Salario</h3>
                        <p style="margin: 0; font-size: 0.95rem; color: var(--text-muted);">Carga del salario bruto y deducción automática del aporte jubilatorio del <strong>9% de IPS</strong>. Registro histórico de salarios.</p>
                    </div>
                    <div class="fragment" style="background: rgba(59, 130, 246, 0.08); padding: 1.2rem; border-radius: 6px; border: 1px solid rgba(3B, 82, 246, 0.2);">
                        <h3 style="color: var(--accent-blue); margin: 0 0 0.5rem 0; font-size: 1.25rem;">Módulo de Deudas</h3>
                        <p style="margin: 0; font-size: 0.95rem; color: var(--text-muted);">Registro de deudas activas/saldadas. Cálculos dinámicos en memoria del saldo remanente y fecha estimada de liquidación.</p>
                    </div>
                    <div class="fragment" style="background: rgba(245, 158, 11, 0.08); padding: 1.2rem; border-radius: 6px; border: 1px solid rgba(245, 158, 11, 0.2);">
                        <h3 style="color: var(--accent-orange); margin: 0 0 0.5rem 0; font-size: 1.25rem;">Módulo de Tarjetas</h3>
                        <p style="margin: 0; font-size: 0.95rem; color: var(--text-muted);">Gestión de movimientos tipo Diario (Consumos/Pagos). Lógica contable de cierres mensuales, cálculo de intereses y pago mínimo.</p>
                    </div>
                    <div class="fragment" style="background: rgba(139, 92, 246, 0.08); padding: 1.2rem; border-radius: 6px; border: 1px solid rgba(139, 92, 246, 0.2);">
                        <h3 style="color: var(--accent-purple); margin: 0 0 0.5rem 0; font-size: 1.25rem;">Dashboard & Reportes</h3>
                        <p style="margin: 0; font-size: 0.95rem; color: var(--text-muted);">Fórmula de <strong>Saldo Disponible Real</strong> consolidando todos los módulos. Motor de exportación a hojas de cálculo CSV.</p>
                    </div>
                </div>
            `,
            notes: {
                goal: "Explicar los módulos que integran PPM, detallando la lógica de negocio detrás de cada uno y su impacto en la salud financiera del usuario.",
                speech: "PPM está compuesto por 4 módulos financieros integrados. En el Salario definimos los ingresos base y si aplican aportes de IPS. En Deudas gestionamos compromisos a plazo fijo o variable. El módulo de Tarjetas es muy interesante: no registra deudas estáticas, sino un libro diario de consumos y pagos. Al realizar el cierre mensual, el sistema evalúa si quedó saldo pendiente y, de ser así, aplica los intereses sobre la deuda no saldada y calcula el pago mínimo. Todos estos datos convergen en el Dashboard, que calcula el Salario Disponible real restando deudas, gastos y pagos mínimos del salario neto, y permitiendo exportar el histórico a CSV con un solo clic.",
                cues: [
                    "Explicar que la moneda local (Guaraníes) se maneja internamente como números enteros para evitar problemas de centavos.",
                    "Recalcar que el saldo disponible evita la ilusión de liquidez que provoca el límite disponible en las tarjetas."
                ],
                bodyLanguage: [
                    "Mantener las manos a una altura media-alta para denotar dinamismo al describir los módulos.",
                    "Adoptar un tono entusiasta al describir el módulo de tarjetas por su complejidad contable."
                ],
                keywords: ["Salario", "Deudas", "Tarjetas de Crédito", "Dashboard", "Cierre Contable"],
                dontForget: [
                    "Mencionar que el interés de tarjetas se calcula sobre el saldo no abonado y se capitaliza en el cierre.",
                    "Preparar la transición a Marcos Bogado para examinar el código de tarjetas."
                ],
                questions: [
                    {
                        q: "¿Cómo se modela y calcula el descuento del IPS sobre el salario declarado del usuario?",
                        a: "El descuento del IPS se modela de manera dinámica en la propiedad calculada de solo lectura NetAmount dentro de la entidad Salary. Evalúa si el campo booleano ContributesToIps es verdadero y, de ser así, multiplica el salario bruto por (1 - FinancialConstants.IpsEmployeeRate). La constante IpsEmployeeRate está definida centralizadamente en 0.09 (9%) en la clase FinancialConstants."
                    },
                    {
                        q: "En el módulo de deudas, ¿cómo se diferencia una deuda de plazo fijo de una de plazo indefinido y cómo afecta esto a los cálculos financieros?",
                        a: "Una deuda de plazo fijo posee un valor entero asignado al campo anulable TermMonths e IsOpenEnded en falso. El sistema calcula propiedades proyectadas como el monto total estimado, las cuotas restantes, el saldo pendiente y la fecha estimada de finalización. Si es indefinida, IsOpenEnded es verdadero y TermMonths es nulo, lo cual hace que todas las proyecciones devuelvan valores nulos (null) al no existir una fecha de finalización o un total amortizable."
                    },
                    {
                        q: "¿Cómo se calcula aritméticamente el 'Saldo Disponible' que se muestra en el Dashboard de la aplicación?",
                        a: "El saldo disponible representa la liquidez mensual real del usuario. Se calcula en el backend mediante la fórmula: Saldo Disponible = Salario Neto + Ingresos Extras - Cuotas de Deudas - Gastos Mensuales - Pagos Mínimos de Tarjetas de Crédito activas en el mes."
                    }
                ]
            }
        },
        {
            id: 9,
            title: "Análisis de Código: Lógica de Negocio",
            subtitle: "Recálculo Contable de Saldos de Tarjetas de Crédito",
            presenter: "Marcos Bogado",
            nextPresenter: "Marcos Bogado",
            recommendedTimeSeconds: 210,
            content: `
                <div style="display: flex; flex-direction: column; gap: 0.8rem; height: 100%; justify-content: center;">
                    <div style="font-size: 1.1rem; color: var(--accent-blue); font-family: var(--font-sans); font-weight: 500;">
                        Método: <code style="color: var(--accent-emerald);">RecomputeBalanceAsync</code> en <code style="color: var(--accent-emerald);">CreditCardService.cs</code>
                    </div>
                    
                    <pre class="language-csharp"><code class="language-csharp">private async Task RecomputeBalanceAsync(CreditCard card)
{
    // Obtener los movimientos históricos de la tarjeta en la base de datos
    var movements = await creditCardRepository.GetMovementsAsync(card.Id);
    
    // Sumar consumos y pagos con agregación LINQ
    var consumos = movements.Where(m => m.Type == CardMovementType.Consumo).Sum(m => m.Amount);
    var pagos = movements.Where(m => m.Type == CardMovementType.Pago).Sum(m => m.Amount);

    // Saldo contable final derivado
    var saldo = card.InitialBalance + consumos - pagos;
    card.CurrentDebt = saldo;

    // Actualizar la entidad en el repositorio
    await creditCardRepository.UpdateAsync(card);
}</code></pre>
                    
                    <p class="fragment" style="margin: 0; font-size: 1.1rem; color: var(--text-muted); line-height: 1.45;">
                        <strong>Decisión de Diseño Contable:</strong> Para garantizar consistencia matemática absoluta, el saldo actual de una tarjeta (<code>CurrentDebt</code>) no es un campo modificable libremente en la base de datos; es una propiedad calculada que se deriva directamente del historial de transacciones (Consumos y Pagos).
                    </p>
                </div>
            `,
            notes: {
                goal: "Analizar detalladamente el método encargado del cálculo de saldo de tarjetas de crédito, argumentando los beneficios de consistencia contable del diseño.",
                speech: "Para evitar que el saldo de una tarjeta de crédito quede desincronizado, tomamos una decisión de diseño contable clásica: el saldo actual no se edita a mano. Se calcula al vuelo a partir de los movimientos reales de la tarjeta. En el método RecomputeBalanceAsync, cuando se registra un consumo o un pago, traemos el histórico de movimientos de esa tarjeta. Filtramos y sumamos todos los consumos por un lado, y todos los pagos por el otro. El saldo resultante es el balance inicial cargado al crear la tarjeta más los consumos, menos los pagos. Este saldo calculado se asigna a la propiedad CurrentDebt y se guarda en la base de datos, garantizando consistencia matemática absoluta.",
                cues: [
                    "Explicar que card.InitialBalance representa la deuda inicial que tenía la tarjeta al momento de ser registrada en PPM.",
                    "Indicar que este enfoque evita la inyección de saldos 'fantasma' no respaldados por transacciones."
                ],
                bodyLanguage: [
                    "Utilizar un tono de voz analítico y pausado para denotar precisión técnica.",
                    "Señalar el bloque de código LINQ al explicar el filtrado de movimientos."
                ],
                keywords: ["Consumos", "Pagos", "LINQ", "CurrentDebt", "Consistencia Contable"],
                dontForget: [
                    "Mencionar que el cálculo se ejecuta de forma asíncrona mediante el consumo del repositorio.",
                    "Estar listos para responder sobre problemas de rendimiento si el volumen de movimientos crece demasiado."
                ],
                questions: [
                    {
                        q: "¿Cuál es el diseño lógico aplicado para administrar los saldos de las tarjetas de crédito? ¿El saldo es un campo estático modificable?",
                        a: "Para evitar inconsistencias de saldos (descuadres de dinero), el saldo de la tarjeta de crédito no se modifica directamente de forma arbitraria. Este es un campo derivado. Cada vez que se registra un consumo o un pago, se invoca al método privado RecomputeBalanceAsync en el servicio CreditCardService, el cual consulta todos los movimientos históricos, calcula la sumatoria de consumos y de pagos, y actualiza la propiedad CurrentDebt con la fórmula: InitialBalance + Consumos - Pagos."
                    },
                    {
                        q: "Describan detalladamente el proceso contable que ocurre cuando el usuario realiza el cierre mensual de una tarjeta de crédito en el sistema.",
                        a: "Al cerrar la tarjeta: 1. El servicio consulta el saldo acumulado en deuda (CurrentDebt). 2. Si no hay deuda, registra un pago histórico en cero sin aplicar intereses. 3. Si existe deuda, calcula los intereses del mes (CurrentDebt * MonthlyInterestRate / 100) y el pago mínimo requerido (5% por defecto). 4. Valida que el pago ingresado sea igual o mayor que el mínimo exigido. 5. Si cubre el mínimo, registra el interés como Consumo ('Interés de cierre') y el pago del usuario como Pago ('Pago de cierre'), actualizando el saldo final de la tarjeta de forma consistente."
                    },
                    {
                        q: "¿Qué problemas de escalabilidad a largo plazo identifican en el método RecomputeBalanceAsync de tarjetas de crédito y cómo los optimizarían en producción?",
                        a: "Actualmente, RecomputeBalanceAsync trae del repositorio todos los movimientos históricos para recalcular el saldo. Si un usuario registra miles de movimientos a lo largo de los años, esto podría saturar la memoria y degradar el rendimiento del procesamiento. Para optimizarlo en producción, aplicaríamos una estrategia de saldos consolidados: almacenaríamos el saldo de cierre del último mes facturado y realizaríamos el cálculo incremental únicamente sobre los movimientos del mes en curso, disminuyendo drásticamente la carga de datos del repositorio."
                    }
                ]
            }
        },
        {
            id: 10,
            title: "Análisis de Código: Solución de Limitaciones",
            subtitle: "Limitaciones de SQLite en EF Core y Gestión de Hilos Seguro",
            presenter: "Marcos Bogado",
            nextPresenter: "Wilson Ayala",
            recommendedTimeSeconds: 180,
            content: `
                <div style="display: flex; gap: 2rem; height: 100%; align-items: center;">
                    <div style="flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.8rem;">
                        <div style="font-size: 1.1rem; color: var(--accent-orange); font-family: var(--font-sans); font-weight: 500;">
                            Problema SQLite y Agregación de Decimales
                        </div>
                        <pre class="language-csharp" style="margin: 0 !important; font-size: 0.85rem !important; line-height: 1.45;"><code class="language-csharp">public async Task&lt;decimal&gt; GetMonthlyTotalAsync(int userId, int month, int year)
{
    // Cargar montos filtrados a memoria asíncronamente
    var amounts = await context.Expenses
        .Where(e => e.UserId == userId && e.Month == month && e.Year == year)
        .Select(e => e.Amount)
        .ToListAsync(); // Trae a RAM

    return amounts.Sum(); // Ejecuta la suma en C#
}</code></pre>
                    </div>
                    
                    <div style="flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.8rem;">
                        <div style="font-size: 1.1rem; color: var(--accent-purple); font-family: var(--font-sans); font-weight: 500;">
                            Gestión Centralizada de Excepciones en la UI
                        </div>
                        <pre class="language-csharp" style="margin: 0 !important; font-size: 0.85rem !important; line-height: 1.45;"><code class="language-csharp">protected async Task RunGuardedAsync(
    Func&lt;Task&gt; action, 
    string errorMessage = "Ocurrió un error")
{
    IsLoading = true; // Activa spinner / Bloquea botones
    ErrorMessage = null;
    try {
        await action();
    }
    catch (Exception ex) {
        ErrorMessage = $"{errorMessage}: {ex.Message}";
    }
    finally {
        IsLoading = false; // Desbloquea UI
    }
}</code></pre>
                    </div>
                </div>
            `,
            notes: {
                goal: "Explicar la resolución técnica a las limitaciones físicas de SQLite con tipos decimales en EF Core, y detallar el método base de captura de excepciones en los ViewModels.",
                speech: "Durante el desarrollo nos topamos con una particularidad técnica de SQLite. Al ser un motor embebido ligero, almacena los tipos decimales como cadenas de texto. Esto hace que Entity Framework Core falle si intentamos ejecutar un comando Sum() directamente en la base de datos, ya que SQLite no sabe sumar textos. Para resolverlo, modificamos el repositorio para que traiga la lista de montos numéricos a la memoria RAM de forma asíncrona mediante ToListAsync() y luego ejecutamos el Sum() directamente sobre la colección en memoria C#. Además, en la interfaz de usuario, para evitar llenar el código de bloques try-catch repetitivos, creamos la función RunGuardedAsync en la clase base de los ViewModels. Esta función gestiona el estado de carga IsLoading, captura excepciones y expone el mensaje de error en la UI de forma segura.",
                cues: [
                    "Señalar la importancia de ToListAsync() para la asincronía antes de procesar el Sum() en memoria.",
                    "Explicar que RunGuardedAsync implementa el principio DRY (Don't Repeat Yourself) para el control de errores."
                ],
                bodyLanguage: [
                    "Utilizar gesticulación abierta al hablar del problema y gesticulación precisa al detallar la solución técnica en código.",
                    "Expresar tranquilidad al asegurar la estabilidad del sistema frente a errores."
                ],
                keywords: ["SQLite", "Decimal TEXT", "ToListAsync", "RunGuardedAsync", "DRY Exception"],
                dontForget: [
                    "Mencionar que SQLite almacena decimales como TEXT debido a su arquitectura tipada dinámicamente.",
                    "Resaltar que IsLoading previene clics dobles accidentales del usuario."
                ],
                questions: [
                    {
                        q: "Expliquen el problema del tipo de dato decimal con SQLite en Entity Framework Core y cómo lo solucionaron en el repositorio de gastos.",
                        a: "SQLite no posee un tipo de dato nativo para decimales de precisión exacta y EF Core los almacena como TEXT. Si ejecutamos un Sum() directo en base de datos de EF Core, falla porque SQLite no sabe procesar agregaciones matemáticas sobre texto. Lo solucionamos cargando únicamente la columna de montos filtrada del mes a la memoria de la aplicación mediante Select(e => e.Amount).ToListAsync() y ejecutando la suma aritmética ya en memoria RAM a través del Sum() de LINQ a Objetos."
                    },
                    {
                        q: "¿Qué es el método RunGuardedAsync y por qué es una buena práctica implementarlo en una clase base de ViewModel?",
                        a: "RunGuardedAsync es un método genérico definido en la clase base ModuleViewModelBase. Centraliza tres comportamientos repetitivos en la UI: 1. Cambia el estado IsLoading a true antes de ejecutar una acción asíncrona (deshabilitando botones de la UI para evitar clics duplicados). 2. Limpia los mensajes de error previos. 3. Ejecuta la lógica dentro de un bloque try-catch; si ocurre un error, asigna el mensaje de excepción a ErrorMessage expuesto en la pantalla, y finalmente en el bloque finally retorna IsLoading a false. Esto previene código repetido en todos los sub-ViewModels."
                    }
                ]
            }
        },
        {
            id: 11,
            title: "Modelo de Clases del Dominio",
            subtitle: "Diagrama de Clases UML del Núcleo Financiero",
            presenter: "Wilson Ayala",
            nextPresenter: "Marcos Bogado",
            recommendedTimeSeconds: 180,
            content: `
                <div style="display: flex; flex-direction: column; gap: 0.5rem; height: 100%; justify-content: center; align-items: center;">
                    <div class="mermaid" style="width: 100%; height: 80vh; max-height: 520px; overflow: auto;">
                    classDiagram
                        class User {
                            +int Id
                            +string Username
                            +string PasswordHash
                            +UserRole Role
                            +ICollection~Salary~ Salaries
                            +ICollection~Debt~ Debts
                            +ICollection~CreditCard~ CreditCards
                            +ICollection~Expense~ Expenses
                            +ICollection~Income~ Incomes
                        }
                        
                        class Salary {
                            +int Id
                            +int UserId
                            +decimal Amount
                            +DateTime EffectiveFrom
                            +bool ContributesToIps
                            +decimal NetAmount$
                        }
                        
                        class Debt {
                            +int Id
                            +int UserId
                            +string EntityName
                            +string ProductOrService
                            +string Description
                            +decimal InstallmentAmount
                            +int? TermMonths
                            +bool IsOpenEnded
                            +int CurrentInstallment
                            +DateTime StartDate
                            +DebtStatus Status
                            +decimal MonthlyPayment$
                            +decimal? TotalAmount$
                            +int? RemainingInstallments$
                            +decimal? RemainingAmount$
                            +DateTime? EstimatedPayoffDate$
                        }
                    
                        class CreditCard {
                            +int Id
                            +int UserId
                            +string Name
                            +decimal AvailableBalance
                            +decimal InitialBalance
                            +decimal CurrentDebt
                            +decimal MonthlyInterestRate
                            +int ClosingDay
                            +decimal MinPaymentPercentage
                            +ICollection~CreditCardPayment~ Payments
                            +ICollection~CardMovement~ Movements
                            +CalculateMonthlyInterest() decimal
                            +CalculateTotalDebtWithInterest() decimal
                            +CalculateMinimumPayment() decimal
                        }
                    
                        User "1" --> "*" Salary : Posee
                        User "1" --> "*" Debt : Adquiere
                        User "1" --> "*" CreditCard : Administra
                    </div>
                </div>
            `,
            notes: {
                goal: "Detallar el diagrama de clases del dominio de PPM, explicando el diseño rico de entidades y la presencia de propiedades calculadas en caliente.",
                speech: "Este diagrama UML representa el corazón del sistema: las entidades del Dominio y sus relaciones. La clase central es User. Un usuario tiene colecciones de salarios, deudas, tarjetas de crédito, gastos e ingresos. Las relaciones son de uno a muchos. Si analizamos la clase Debt, posee propiedades calculadas marcadas con el signo de pesos. Por ejemplo, RemainingInstallments o RemainingAmount no existen como columnas en la base de datos; se resuelven en memoria basándose en la cuota y el plazo. Lo mismo ocurre en CreditCard, que define comportamientos como CalculateMonthlyInterest() y CalculateMinimumPayment(). Este enfoque evita el antipatrón de Modelo de Dominio Anémico, dotando a nuestras clases de negocio de comportamiento y lógica propia.",
                cues: [
                    "Recordar al jurado que el diagrama puede ampliarse haciendo clic sobre él gracias a la funcionalidad de zoom.",
                    "Explicar que las propiedades calculadas no se persisten en la base de datos para cumplir con la normalización de datos."
                ],
                bodyLanguage: [
                    "Mantenerse erguido. Señalar en la pantalla las relaciones que nacen desde la clase central 'User'.",
                    "Usar un tono pausado y estructurado al detallar las clases asociadas."
                ],
                keywords: ["UML", "Dominio Rico", "User", "CreditCard", "Debt", "Propiedades Calculadas"],
                dontForget: [
                    "Mencionar que el diseño rico de dominio encapsula la lógica matemática evitando que la capa de servicios se sobrecargue.",
                    "Preparar la diapositiva del DER que es la representación física de estas clases."
                ],
                questions: [
                    {
                        q: "¿Cómo logran que las pantallas de la interfaz se actualicen automáticamente cuando cambian los datos en el ViewModel sin escribir código manual de actualización de controles?",
                        a: "Implementamos el patrón MVVM soportado por la librería CommunityToolkit.Mvvm. Los ViewModels heredan de ViewModelBase (que a su vez extiende de ObservableObject). Al decorar los campos privados con el atributo [ObservableProperty], los generadores de código de C# crean en tiempo de compilación las propiedades públicas equivalentes que disparan el evento INotifyPropertyChanged automáticamente al cambiar. Las vistas asocian sus controles mediante Data Binding en XAML, escuchando estos eventos y redibujando los valores en la pantalla sin intervención de código manual."
                    }
                ]
            }
        },
        {
            id: 12,
            title: "Diseño de Base de Datos y Persistencia",
            subtitle: "Diagrama Entidad-Relación (DER) Físico en SQLite",
            presenter: "Marcos Bogado",
            nextPresenter: "Francesco Paez",
            recommendedTimeSeconds: 150,
            content: `
                <div style="display: flex; flex-direction: column; gap: 0.5rem; height: 100%; justify-content: center; align-items: center;">
                    <div class="mermaid" style="width: 100%; height: 80vh; max-height: 520px; overflow: auto;">
                    erDiagram
                        Users {
                            int Id PK
                            string Username UK
                            string PasswordHash
                            int Role
                        }
                        Salaries {
                            int Id PK
                            int UserId FK
                            decimal Amount
                            datetime EffectiveFrom
                            bool ContributesToIps
                        }
                        Debts {
                            int Id PK
                            int UserId FK
                            string EntityName
                            decimal InstallmentAmount
                            int TermMonths
                            bool IsOpenEnded
                            int CurrentInstallment
                            datetime StartDate
                            int Status
                        }
                        CreditCards {
                            int Id PK
                            int UserId FK
                            string Name
                            decimal AvailableBalance
                            decimal InitialBalance
                            decimal CurrentDebt
                            decimal MonthlyInterestRate
                            int ClosingDay
                            decimal MinPaymentPercentage
                        }
                        CardMovements {
                            int Id PK
                            int CreditCardId FK
                            int Type
                            decimal Amount
                            datetime Date
                            string Description
                        }
                    
                        Users ||--o{ Salaries : "1:N (Cascade)"
                        Users ||--o{ Debts : "1:N (Cascade)"
                        Users ||--o{ CreditCards : "1:N (Cascade)"
                        CreditCards ||--o{ CardMovements : "1:N (Cascade)"
                    </div>
                </div>
            `,
            notes: {
                goal: "Detallar el diseño físico de datos en SQLite, justificando la normalización, las claves foráneas y la política de borrado en cascada.",
                speech: "El modelo de base de datos está diseñado bajo la tercera forma normal para asegurar consistencia y rendimiento en SQLite. Tenemos un esquema físico compuesto por 8 tablas. La integridad referencial se mantiene estrictamente mediante llaves foráneas indexadas a la tabla Users. Un aspecto clave que configuramos mediante Fluent API en la clase AppDbContext es la eliminación en cascada. Si un usuario decide borrar su cuenta, la base de datos se limpia de manera automática, eliminando todos sus movimientos, deudas y salarios asociados en cascada. También aplicamos una restricción de índice único sobre la columna Username para evitar que dos usuarios compartan el mismo alias de inicio de sesión.",
                cues: [
                    "Comentar que SQLite no aplica borrado en cascada por defecto a menos que se configure en el DbContext de EF Core.",
                    "Indicar que la tabla Users cuenta con un índice único para agilizar las búsquedas en el Login."
                ],
                bodyLanguage: [
                    "Transmitir seguridad técnica apoyando las manos en la mesa al inicio de la explicación.",
                    "Utilizar gestos horizontales para conectar la tabla padre con las tablas dependientes en el DER."
                ],
                keywords: ["DER", "Llaves Foráneas", "Normalización", "Borrado en Cascada", "AppDbContext"],
                dontForget: [
                    "Mencionar que los montos decimales están configurados con precisión decimal en EF Core para la normalización en la moneda local sin centavos.",
                    "Aclarar que los IDs son autoincrementales provistos por el motor SQLite."
                ],
                questions: [
                    {
                        q: "¿Dónde se almacena físicamente la base de datos y cómo aseguran que no se pierda la ruta del archivo físico sin importar cómo se ejecute la aplicación?",
                        a: "Para evitar rutas relativas que varían según el contexto de ejecución, definimos una ruta absoluta estática basada en las carpetas de datos de aplicación nativas de cada sistema operativo. En la clase DbConstants concatenamos el directorio especial AppData (que en Windows corresponde a %LOCALAPPDATA%) con la carpeta del proyecto PPM y el archivo ppm.db. Esto garantiza que la base de datos permanezca en la misma ubicación del usuario final."
                    },
                    {
                        q: "¿Cómo se aplican las migraciones de base de datos al iniciar la aplicación? ¿Es necesario correr comandos en la consola en producción?",
                        a: "No es necesario correr ningún comando externo en producción. En el ciclo de arranque en App.axaml.cs, solicitamos el AppDbContext del proveedor de servicios e invocamos explícitamente el método Database.Migrate(). Esto hace que, en el primer inicio o tras una actualización, Entity Framework Core analice si el archivo de base de datos existe y, de no ser así, lo cree y aplique todas las migraciones pendientes automáticamente de forma invisible para el usuario."
                    },
                    {
                        q: "¿Qué políticas de integridad referencial configuraron para las relaciones entre el Usuario y sus deudas o tarjetas de crédito?",
                        a: "Configuramos políticas de Borrado en Cascada (Cascade Delete) en el mapeo de relaciones mediante Fluent API en OnModelCreating dentro de AppDbContext. Al establecer que la relación entre un usuario y sus entidades dependientes posee un comportamiento de borrado en cascada, garantizamos que si se elimina un registro de usuario, la base de datos de SQLite purgará automáticamente todas sus deudas y movimientos asociados, evitando registros huérfanos."
                    }
                ]
            }
        },
        {
            id: 13,
            title: "UML Estructural de Componentes",
            subtitle: "Organización Lógica de la Solución y Acoplamiento",
            presenter: "Francesco Paez",
            nextPresenter: "Wilson Ayala",
            recommendedTimeSeconds: 150,
            content: `
                <div style="display: flex; gap: 2rem; height: 100%; align-items: center;">
                    <div style="flex: 1.1;">
                        <div class="mermaid">
                        graph LR
                            subgraph Capa UI [PPM.UI - Presentación]
                                UI_Comp[Avalonia Views & ViewModels]
                                CT_Mvvm[CommunityToolkit.Mvvm]
                                MS_DI[DependencyInjection]
                            end
                            
                            subgraph Capa App [PPM.Application - Casos de Uso]
                                App_Comp[Servicios & DTOs]
                            end
                        
                            subgraph Capa Infra [PPM.Infrastructure - Soporte]
                                EF_Core[Entity Framework SQLite]
                                BCrypt[BCrypt Security]
                                CSV_Export[CsvExportService]
                            end
                        
                            subgraph Capa Dom [PPM.Domain - Núcleo]
                                Dom_Comp[Entidades & Contratos]
                            end
                        
                            UI_Comp -.-> CT_Mvvm
                            UI_Comp -.-> MS_DI
                            UI_Comp --> App_Comp
                            UI_Comp --> EF_Core
                            
                            App_Comp --> Dom_Comp
                            EF_Core --> Dom_Comp
                            BCrypt --> Dom_Comp
                            CSV_Export --> App_Comp
                            
                            style Dom_Comp fill:#10B981,stroke:#047857,stroke-width:2px,color:#fff
                            style App_Comp fill:#3B82F6,stroke:#1D4ED8,stroke-width:2px,color:#fff
                            style Capa UI fill:#1e293b,stroke:#334155,stroke-width:1px
                        </div>
                    </div>
                    
                    <div style="flex: 0.9; display: flex; flex-direction: column; gap: 1rem;">
                        <h4 style="color: var(--accent-blue); margin: 0; font-size: 1.3rem;">Análisis de Acoplamiento Físico</h4>
                        <p style="font-size: 1.1rem; color: var(--text-muted); line-height: 1.5; margin: 0;">
                            La capa UI es el punto de inicio de la aplicación y la única que referencia todas las capas externas para poder instanciar e inyectar las dependencias en el contenedor de servicios al arrancar.
                        </p>
                        <div class="fragment" style="background: rgba(59, 130, 246, 0.05); border: 1px solid rgba(59, 130, 246, 0.2); padding: 1.2rem; border-radius: 6px;">
                            <strong style="color: var(--accent-blue); display: block; margin-bottom: 5px;">Inversión de Control (IoC):</strong>
                            A nivel de código de negocio, las capas se comunican utilizando abstracciones (interfaces), lo que evita acoplamientos circulares y facilita el reemplazo de módulos de infraestructura.
                        </div>
                    </div>
                </div>
            `,
            notes: {
                goal: "Explicar las dependencias físicas entre los proyectos compilados y las librerías NuGet externas en el contenedor de dependencias.",
                speech: "Este diagrama UML de componentes y paquetes ilustra cómo se estructuran las dependencias a nivel físico de compilación. Como se aprecia, el componente central PPM.Domain no posee flechas salientes hacia otras capas; es completamente independiente. La capa de PPM.Application solo depende del dominio. El proyecto PPM.Infrastructure actúa como adaptador, implementando los repositorios e interactuando con librerías externas de terceros como BCrypt para seguridad y Entity Framework para SQLite. Finalmente, el ejecutable de presentación PPM.UI une todas las piezas haciendo uso del contenedor IoC de Microsoft para inyectar los servicios correspondientes en tiempo de ejecución. Este diseño evita el acoplamiento circular y nos permite aislar fallos fácilmente.",
                cues: [
                    "Detallar que la inyección ocurre en el método RegisterServices en App.axaml.cs.",
                    "Indicar que las dependencias hacia las librerías de terceros (como BCrypt o EF) quedan estrictamente confinadas en la capa de infraestructura."
                ],
                bodyLanguage: [
                    "Expresar solidez técnica y dominio manteniendo contacto visual al explicar la Inversión de Control.",
                    "Usar las manos abiertas para encuadrar las distintas capas de componentes en la pantalla."
                ],
                keywords: ["NuGet", "Componentes", "IoC", "Microsoft.Extensions.DependencyInjection", "Acoplamiento"],
                dontForget: [
                    "Mencionar que el uso de interfaces permite que el proyecto sea testeable en aislamiento.",
                    "Dar paso a Wilson Ayala para explicar el flujo de datos con DTOs."
                ],
                questions: [
                    {
                        q: "¿Cómo funciona el mecanismo de Inyección de Dependencias en la aplicación y qué ciclos de vida configuraron para las dependencias?",
                        a: "Utilizamos el paquete de inyección nativo de Microsoft. Registramos en App.axaml.cs: 1. El DbContext mediante AddDbContext (ciclo de vida Scoped por defecto). 2. Servicios de negocio y repositorios como Scoped (AddScoped), garantizando consistencia en el ciclo de operación. 3. Los ViewModels como Transient (AddTransient), creando una instancia limpia al navegar para evitar estados residuales. 4. Los servicios visuales sin estado como FileDialogService como Singleton (AddSingleton)."
                    }
                ]
            }
        },
        {
            id: 14,
            title: "Gestión y Flujo Interno de Datos",
            subtitle: "Uso del Patrón DTO (Data Transfer Object) para Aislamiento",
            presenter: "Wilson Ayala",
            nextPresenter: "Ana Gayoso",
            recommendedTimeSeconds: 120,
            content: `
                <div style="display: flex; gap: 2rem; height: 100%; align-items: center;">
                    <div style="flex: 1.1; display: flex; flex-direction: column; gap: 1.2rem;">
                        <h3 style="color: var(--accent-emerald); margin: 0; font-size: 1.5rem; letter-spacing: -0.5px;">¿Por qué no usar Entidades de Dominio en la UI?</h3>
                        <ul style="margin: 0; padding-left: 1.2rem; font-size: 1.15rem; display: flex; flex-direction: column; gap: 0.8rem;">
                            <li class="fragment"><strong>Prevención de Mass Assignment:</strong> Evita que un cliente altere propiedades sensibles de la base de datos (como contraseñas o roles) durante el enlace del formulario.</li>
                            <li class="fragment"><strong>Evitar Referencias Circulares:</strong> Las entidades mapeadas por el ORM a menudo tienen referencias circulares (ej. User &harr; CreditCards) que bloquean la serialización.</li>
                            <li class="fragment"><strong>Independencia del Backend:</strong> Si el esquema de base de datos cambia, la UI no se rompe ya que está enlazada al DTO y no a la tabla de persistencia física.</li>
                        </ul>
                    </div>
                    
                    <div class="fragment" style="flex: 0.9; background: rgba(30, 41, 59, 0.5); border: 1px solid var(--border-color); border-radius: 8px; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
                        <h4 style="color: var(--accent-blue); margin-top: 0; font-size: 1.3rem; text-align: center;">El Tubería de Transformación</h4>
                        
                        <div style="display: flex; flex-direction: column; gap: 0.5rem; text-align: center; font-size: 1rem; font-family: var(--font-mono);">
                            <div style="background: var(--bg-panel); padding: 0.6rem; border-radius: 6px; border: 1px solid var(--border-color);">Formulario de UI</div>
                            <div style="color: var(--accent-emerald); font-weight: 700;">&darr; (Crear DTO)</div>
                            <div style="background: rgba(16, 185, 129, 0.15); padding: 0.6rem; border-radius: 6px; border: 1px solid var(--accent-emerald); color: var(--accent-emerald);">CreateCreditCardDto</div>
                            <div style="color: var(--accent-blue); font-weight: 700;">&darr; (Mapear a Entidad)</div>
                            <div style="background: rgba(59, 130, 246, 0.15); padding: 0.6rem; border-radius: 6px; border: 1px solid var(--accent-blue); color: var(--accent-blue);">CreditCard (Domain / DB)</div>
                        </div>
                    </div>
                </div>
            `,
            notes: {
                goal: "Explicar el propósito del patrón DTO en el aislamiento entre la persistencia de datos y la interfaz de usuario, justificando la inmutabilidad de los datos.",
                speech: "Uno de los errores más comunes en proyectos de desarrollo es usar la misma clase de la base de datos para dibujar las pantallas de la interfaz. Esto crea un acoplamiento extremo. En PPM utilizamos DTOs declarados como registros inmutables de C#. Cuando cargamos una tarjeta de crédito, la UI no crea una entidad CreditCard directamente. En su lugar, empaqueta los datos en un CreateCreditCardDto. Este viaja al servicio. Si la base de datos cambia una columna interna, la interfaz no se rompe porque está enlazada al DTO y no a la entidad de la base de datos. Esto nos da un aislamiento térmico entre la capa de presentación y la de persistencia.",
                cues: [
                    "Destacar la inmutabilidad de los DTOs definidos como 'record' en C# 12.0.",
                    "Explicar que la inmutabilidad ayuda a evitar efectos colaterales donde se altera la información en tránsito."
                ],
                bodyLanguage: [
                    "Acompañar la explicación del flujo de datos con ademanes de las manos para simular la compresión de información.",
                    "Mirar al jurado para asentar la importancia del aislamiento de responsabilidades."
                ],
                keywords: ["DTO", "Inmutabilidad", "Aislamiento", "Mass Assignment", "Record C#"],
                dontForget: [
                    "Mencionar que el compilador optimiza la comparación por valores de los records en lugar de por referencia.",
                    "Introducir el paso a Ana Gayoso para las validaciones y estabilidad de UI."
                ],
                questions: [
                    {
                        q: "¿Qué es el principio DRY y cómo se aplica en la comunicación de datos entre los ViewModels y la interfaz de usuario?",
                        a: "El principio DRY (Don't Repeat Yourself) busca eliminar la duplicación de código en el sistema. En PPM lo aplicamos de dos maneras: 1. Centralizando la lógica de manejo de excepciones y estados de carga en la clase abstracta ModuleViewModelBase. 2. Creando DTOs estandarizados en la capa de aplicación que son reusados tanto en la presentación de listas como en reportes de exportación, evitando tener que reescribir propiedades o mapeos específicos para cada salida."
                    }
                ]
            }
        },
        {
            id: 15,
            title: "Validaciones de Negocio y Estabilidad",
            subtitle: "Protección ante Inconsistencias y Control de Errores",
            presenter: "Ana Gayoso",
            nextPresenter: "Ana Gayoso",
            recommendedTimeSeconds: 120,
            content: `
                <div style="display: flex; gap: 2rem; height: 100%; align-items: center;">
                    <div style="flex: 1.1; display: flex; flex-direction: column; gap: 1.2rem;">
                        <h3 style="color: var(--accent-orange); margin: 0; font-size: 1.5rem; letter-spacing: -0.5px;">Estrategia de Validaciones en Dos Capas</h3>
                        <ul style="margin: 0; padding-left: 1.2rem; font-size: 1.15rem; display: flex; flex-direction: column; gap: 0.8rem;">
                            <li class="fragment"><strong>Validación Visual Preventiva:</strong> La UI restringe los tipos de datos en los campos (ej. números en montos, rango de fechas).</li>
                            <li class="fragment"><strong>Validación de Negocio en Servicios:</strong> La validación dura reside en la capa de Aplicación. Evaluamos reglas lógicas antes de persistir.</li>
                            <li class="fragment"><strong>Excepciones Personalizadas:</strong> Uso de <code>BusinessRuleException</code> para capturar infracciones y evitar propagar excepciones genéricas de base de datos.</li>
                        </ul>
                    </div>
                    
                    <div class="fragment" style="flex: 0.9; background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.25); border-radius: 8px; padding: 1.5rem; display: flex; flex-direction: column; gap: 0.8rem;">
                        <h4 style="color: #EF4444; margin-top: 0; font-size: 1.3rem; text-align: center;">Reglas de Negocio Duras</h4>
                        <div style="font-size: 1.05rem; display: flex; flex-direction: column; gap: 0.5rem; color: var(--text-muted);">
                            <div>&bull; Los montos de salarios o gastos deben ser <strong>&gt; 0</strong>.</div>
                            <div>&bull; Día de cierre de tarjetas obligatorio entre <strong>1 y 31</strong>.</div>
                            <div>&bull; Deudas recurrentes no calculan fecha de fin por diseño.</div>
                            <div>&bull; El usuario de login debe ser único en la base de datos.</div>
                        </div>
                    </div>
                </div>
            `,
            notes: {
                goal: "Explicar la arquitectura de validaciones y manejo de excepciones de negocio en PPM, demostrando cómo previene fallas catastróficas.",
                speech: "Un software profesional debe ser a prueba de errores de usuario. En PPM aplicamos una estrategia de validación de doble capa. Aunque la UI restringe ciertos campos, la validación dura reside en la capa de servicios de aplicación. Por ejemplo, al intentar crear una tarjeta de crédito, el servicio valida que el límite disponible no sea negativo y que el día de cierre sea un día válido del mes. Si el usuario ingresa datos incoherentes o si ocurre un fallo en el disco duro, el sistema no colapsa. El backend lanza una excepción controlada del tipo BusinessRuleException, la cual es interceptada por el ViewModel y mostrada en una franja de color en la pantalla de manera clara, manteniendo la aplicación en ejecución.",
                cues: [
                    "Explicar que validar en el backend protege la lógica incluso si en el futuro se cambia la UI a web o móvil.",
                    "Indicar que las excepciones personalizadas evitan exponer detalles de infraestructura (mensajes SQL de error) al usuario final."
                ],
                bodyLanguage: [
                    "Dirigir las palmas de las manos hacia adelante al hablar de la protección ante inconsistencias.",
                    "Mirar fijamente al tribunal al recalcar que la aplicación nunca se congela ante un error."
                ],
                keywords: ["Validaciones", "Estabilidad", "BusinessRuleException", "Aislamiento de Errores", "SQLite"],
                dontForget: [
                    "Mencionar que el CsvExportService devuelve un DTO resultado en lugar de lanzar excepciones si el archivo está bloqueado por Excel.",
                    "Aclarar que el archivo CSV se codifica en UTF-8 con BOM para que Excel en español lo abra correctamente sin problemas de caracteres."
                ],
                questions: [
                    {
                        q: "¿Por qué decidieron que el servicio de exportación a CSV devolviera un DTO resultado en lugar de lanzar excepciones si el archivo no se puede escribir?",
                        a: "Escribir en disco es una operación propensa a fallos externos fuera del control del software (disco lleno, falta de permisos, archivo bloqueado). Si lanzáramos una excepción directa, el flujo se interrumpiría. Al retornar un DTO de tipo ExportResultDto que contiene un indicador booleano de éxito (Success) y un mensaje informativo (Message), permitimos que la lógica de la UI decida amigablemente cómo notificar el estado al usuario sin propagar excepciones por el hilo principal."
                    },
                    {
                        q: "¿Cómo aseguraron que el archivo CSV exportado sea leído correctamente por Microsoft Excel en español sin problemas de codificación de caracteres ni de columnas desordenadas?",
                        a: "Tomamos dos medidas de compatibilidad clave: 1. Utilizamos el carácter punto y coma (;) como delimitador de columnas, ya que en español la coma se reserva como separador decimal y Excel asume por defecto que el punto y coma separa campos de texto. 2. Guardamos el archivo físico utilizando la codificación UTF-8 con la marca de orden de bytes (UTF-8 con BOM). Esto le indica explícitamente a Excel que debe leer el archivo usando codificación Unicode, mostrando correctamente el símbolo de Guaraníes ₲."
                    },
                    {
                        q: "Si dos usuarios intentan registrarse con el mismo nombre de usuario en la aplicación, ¿cómo maneja el sistema esta colisión?",
                        a: "Se maneja en dos niveles: 1. A nivel de base de datos, configuramos un índice único sobre la columna Username de la tabla Users en el OnModelCreating de EF Core. 2. A nivel de lógica de aplicación, el servicio AuthService realiza una consulta preventiva llamando a userRepository.ExistsAsync(Username) antes de registrar el usuario, cancelando el registro si ya existe y retornando un mensaje descriptivo sin provocar un error físico de base de datos."
                    }
                ]
            }
        },
        {
            id: 16,
            title: "Decisiones de Diseño y Patrones",
            subtitle: "Patrones de Diseño de Software Aplicados al Sistema",
            presenter: "Marcos Bogado",
            nextPresenter: "Mauro Silvero",
            recommendedTimeSeconds: 180,
            content: `
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.2rem; height: 100%; align-content: center;">
                    <div class="fragment" style="background: rgba(59, 130, 246, 0.08); padding: 1.2rem; border-radius: 6px; border: 1px solid rgba(3B, 82, 246, 0.2); border-left: 4px solid var(--accent-blue);">
                        <h3 style="color: var(--accent-blue); margin: 0 0 0.5rem 0; font-size: 1.25rem;">Repository Pattern</h3>
                        <p style="margin: 0; font-size: 0.9rem; color: var(--text-muted);">Desacopla la lógica de acceso a datos de los servicios de aplicación. El servicio solo consume la interfaz (e.g. <code>ICreditCardRepository</code>).</p>
                    </div>
                    <div class="fragment" style="background: rgba(16, 185, 129, 0.08); padding: 1.2rem; border-radius: 6px; border: 1px solid rgba(16, 185, 129, 0.2); border-left: 4px solid var(--accent-emerald);">
                        <h3 style="color: var(--accent-emerald); margin: 0 0 0.5rem 0; font-size: 1.25rem;">Dependency Injection (DI)</h3>
                        <p style="margin: 0; font-size: 0.9rem; color: var(--text-muted);">Inyección por constructor en toda la jerarquía de llamadas. Permite testear clases simulando dependencias con mocks.</p>
                    </div>
                    <div class="fragment" style="background: rgba(139, 92, 246, 0.08); padding: 1.2rem; border-radius: 6px; border: 1px solid rgba(139, 92, 246, 0.2); border-left: 4px solid var(--accent-purple);">
                        <h3 style="color: var(--accent-purple); margin: 0 0 0.5rem 0; font-size: 1.25rem;">MVVM Pattern</h3>
                        <p style="margin: 0; font-size: 0.9rem; color: var(--text-muted);">Separación estricta de responsabilidades entre la visualización en XAML y la lógica de presentación de datos en C#.</p>
                    </div>
                    <div class="fragment" style="background: rgba(245, 158, 11, 0.08); padding: 1.2rem; border-radius: 6px; border: 1px solid rgba(245, 158, 11, 0.2); border-left: 4px solid var(--accent-orange);">
                        <h3 style="color: var(--accent-orange); margin: 0 0 0.5rem 0; font-size: 1.25rem;">Rich Domain Model</h3>
                        <p style="margin: 0; font-size: 0.9rem; color: var(--text-muted);">Las entidades del dominio contienen lógica matemática financiera, en lugar de ser meras estructuras de datos anémicas.</p>
                    </div>
                </div>
            `,
            notes: {
                goal: "Justificar las decisiones estratégicas de diseño y detallar los patrones de diseño de software aplicados en el código de PPM.",
                speech: "Durante el diseño del sistema tomamos decisiones clave respaldadas por patrones reconocidos en la industria. El Patrón Repositorio nos permite aislar el motor de base de datos de los servicios de negocio; si decidimos migrar SQLite a otra tecnología de persistencia, los servicios no sufren cambios. La Inyección de Dependencias nos permite estructurar el ciclo de vida de los componentes, registrando los servicios como Scoped y los ViewModels como Transient. Además, optamos por un Modelo de Dominio Rico: las clases de negocio no son simples bolsas de propiedades vacías (lo que se conoce como modelo anémico), sino que son ellas mismas las encargadas de resolver sus cálculos matemáticos financieros, asegurando coherencia conceptual.",
                cues: [
                    "Asegurar que se comprende la diferencia entre el patrón Singleton, Scoped y Transient.",
                    "Estar preparado para fundamentar por qué inyectar IServiceProvider en ViewModels se considera un antipatrón (Service Locator)."
                ],
                bodyLanguage: [
                    "Postura firme con pies alineados al ancho de los hombros. Brazos sueltos y expresivos al hablar de cada patrón.",
                    "Asentir con la cabeza al hablar de buenas prácticas y robustez arquitectónica."
                ],
                keywords: ["Patrones", "Repository", "Dependency Injection", "MVVM", "Modelo Rico"],
                dontForget: [
                    "Mencionar que el Modelo Rico respeta el encapsulamiento conteniendo su propia lógica matemática.",
                    "Dar paso a Mauro Silvero para el cierre de la exposición."
                ],
                questions: [
                    {
                        q: "Expliquen por qué es considerado un antipatrón inyectar el contenedor IServiceProvider directamente dentro de los ViewModels y cómo se podría solucionar.",
                        a: "Inyectar IServiceProvider se conoce como el patrón Service Locator, el cual es un antipatrón en la inyección de dependencias. Hace que las dependencias reales de la clase queden ocultas (al no listarse en el constructor), dificultando las pruebas unitarias porque se debe simular todo el contenedor. Se soluciona utilizando el patrón Abstract Factory: crearíamos una fábrica abstracta (ej. IViewModelFactory) que defina firmas limpias para crear los ViewModels, aislando la referencia a IServiceProvider dentro de la implementación en la capa externa de la UI."
                    }
                ]
            }
        },
        {
            id: 17,
            title: "Lecciones Aprendidas y Evolución",
            subtitle: "Evaluación Crítica y Hoja de Ruta del Software (Mejoras Futuras)",
            presenter: "Mauro Silvero",
            nextPresenter: "Mauro Silvero",
            recommendedTimeSeconds: 150,
            content: `
                <div style="display: flex; gap: 2rem; height: 100%; align-items: center;">
                    <div style="flex: 1; display: flex; flex-direction: column; gap: 1rem;">
                        <h4 style="color: var(--accent-emerald); margin: 0; font-size: 1.3rem;">Buenas Prácticas Consolidadas</h4>
                        <ul style="margin: 0; padding-left: 1.2rem; font-size: 1.05rem; display: flex; flex-direction: column; gap: 0.5rem; color: var(--text-muted);">
                            <li>Encapsulamiento estricto y tipado estático seguro.</li>
                            <li>Separación de responsabilidades clara (Clean Architecture).</li>
                            <li>Programación asíncrona nativa de punta a punta (<code>async/await</code>) para no bloquear la interfaz gráfica.</li>
                        </ul>
                        
                        <h4 style="color: #EF4444; margin: 2rem 0 0 0; font-size: 1.3rem;">Aspectos a Mejorar (Puntos Débiles)</h4>
                        <ul style="margin: 0; padding-left: 1.2rem; font-size: 1.05rem; display: flex; flex-direction: column; gap: 0.5rem; color: var(--text-muted);">
                            <li>Ausencia de una suite de pruebas unitarias automatizadas.</li>
                            <li>Dependencia indirecta del Service Locator (<code>IServiceProvider</code>) en la UI para la navegación.</li>
                        </ul>
                    </div>
                    
                    <div class="fragment" style="flex: 1; background: rgba(59, 130, 246, 0.05); border: 1px solid rgba(59, 130, 246, 0.25); border-radius: 8px; padding: 1.5rem; border-left: 6px solid var(--accent-blue);">
                        <h4 style="color: var(--accent-blue); margin: 0 0 1rem 0; font-size: 1.4rem; letter-spacing: -0.5px;">Hoja de Ruta (Evolución)</h4>
                        <ol style="margin: 0; padding-left: 1.2rem; font-size: 1.1rem; display: flex; flex-direction: column; gap: 0.8rem;">
                            <li><strong>Base de Datos Cifrada:</strong> Integrar SQLCipher para cifrar físicamente el archivo <code>ppm.db</code>.</li>
                            <li><strong>Visualización Estadística:</strong> Añadir gráficos financieros dinámicos con LiveCharts.</li>
                            <li><strong>Generador PDF:</strong> Reporte físico de balances mensuales.</li>
                            <li><strong>Unit Testing:</strong> Suite con xUnit y Moq sobre el motor de tarjetas e intereses.</li>
                        </ol>
                    </div>
                </div>
            `,
            notes: {
                goal: "Demostrar autocrítica profesional analizando las fortalezas del desarrollo actual y proponiendo una hoja de ruta clara para futuras versiones del software.",
                speech: "Como ingenieros de software, sabemos que ningún sistema es perfecto en su primera iteración. Hemos implementado excelentes prácticas de desarrollo, como la programación asíncrona total para no bloquear la interfaz y un encapsulamiento robusto. Sin embargo, identificamos áreas de mejora: la incorporación de pruebas unitarias automatizadas es prioritaria para blindar la lógica de cálculo financiero. En el futuro, planeamos robustecer la seguridad cifrando el archivo físico de la base de datos con SQLCipher, integrar gráficos estadísticos interactivos para mejorar la experiencia de usuario en el Dashboard, y añadir un generador de reportes en PDF.",
                cues: [
                    "Admitir debilidades en la defensa técnica demuestra honestidad intelectual y madurez profesional ante la mesa examinadora.",
                    "Enfatizar que la arquitectura de Clean Architecture facilita enormemente agregar los módulos descritos en la hoja de ruta."
                ],
                bodyLanguage: [
                    "Adoptar una actitud receptiva con hombros abiertos.",
                    "Mirar directamente a los evaluadores con tranquilidad y respeto."
                ],
                keywords: ["Evolución", "Autocrítica", "SQLCipher", "Unit Testing", "xUnit", "LiveCharts"],
                dontForget: [
                    "Aclarar que las debilidades son a nivel de cobertura y no de diseño arquitectónico base.",
                    "Introducir el cierre formal de la defensa en la siguiente diapositiva."
                ],
                questions: [
                    {
                        q: "¿Cómo escalarían el sistema para admitir múltiples monedas (ej. Dólares y Guaraníes) respetando la arquitectura actual?",
                        a: "Para dar soporte multi-moneda deberíamos: 1. Crear el enum CurrencyType { PYG, USD } en Domain. 2. Añadir la propiedad Currency a las entidades (Salary, Debt, CreditCard, etc.). 3. Modificar la lógica de agregación del Dashboard. Para esto, inyectaríamos un nuevo servicio ICurrencyExchangeService en DashboardService que aplique la conversión en base a una tasa de cambio antes de realizar las sumatorias, manteniendo el desacoplamiento."
                    },
                    {
                        q: "Si la base de datos local se corrompe o se borra por error del usuario, ¿cómo reacciona la aplicación?",
                        a: "Al iniciarse en un directorio absoluto, si la app detecta la ausencia del archivo ppm.db, el método Database.Migrate() se ejecutará en el arranque recreando una base de datos vacía. El usuario será redirigido a la pantalla de Login y tendrá que registrarse de nuevo, arrancando el sistema desde cero. Como mejora a futuro, se propone implementar un módulo de copia de seguridad (Backup) para exportar/importar el archivo .db."
                    }
                ]
            }
        },
        {
            id: 18,
            title: "Conclusiones",
            subtitle: "El Resultado Final y Cierre de la Exposición",
            presenter: "Mauro Silvero",
            nextPresenter: "Fin de Exposición",
            recommendedTimeSeconds: 90,
            content: `
                <div style="display: flex; gap: 2rem; height: 100%; align-items: center; justify-content: center;">
                    <div style="flex: 1.1; display: flex; flex-direction: column; gap: 1.5rem;">
                        <div class="fragment" style="background: rgba(16, 185, 129, 0.08); padding: 1.5rem; border-radius: 8px; border: 1px solid rgba(16, 185, 129, 0.2);">
                            <h3 style="color: var(--accent-emerald); margin: 0 0 0.5rem 0; font-size: 1.4rem;">Éxitos del Proyecto</h3>
                            <p style="margin: 0; font-size: 1.1rem; color: var(--text-muted); line-height: 1.5;">
                                Se construyó un gestor de finanzas funcional, rápido y multiplataforma, adoptando exitosamente Clean Architecture, persistencia local segura y encapsulamiento robusto.
                            </p>
                        </div>
                        <div class="fragment" style="background: rgba(59, 130, 246, 0.08); padding: 1.5rem; border-radius: 8px; border: 1px solid rgba(3B, 82, 246, 0.2);">
                            <h3 style="color: var(--accent-blue); margin: 0 0 0.5rem 0; font-size: 1.4rem;">Aprendizaje del Equipo</h3>
                            <p style="margin: 0; font-size: 1.1rem; color: var(--text-muted); line-height: 1.5;">
                                Dominio de frameworks XAML modernos (Avalonia UI), inyección de dependencias avanzada, Entity Framework Core y seguridad de credenciales en SQLite local.
                            </p>
                        </div>
                    </div>
                    
                    <div class="fragment" style="flex: 0.9; text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 1rem;">
                        <div style="font-size: 5rem; color: var(--accent-emerald); line-height: 1;">&check;</div>
                        <h3 style="color: var(--text-main); margin: 0; font-size: 1.8rem; letter-spacing: -0.5px;">Muchas Gracias</h3>
                        <p style="font-size: 1.15rem; color: var(--text-muted);">Quedamos a disposición del Tribunal para la ronda de preguntas y aclaraciones.</p>
                        <div style="margin-top: 1rem; color: var(--accent-blue); font-weight: 600; font-size: 0.95rem; text-transform: uppercase; letter-spacing: 1px;">
                            Mauro, Francesco, Wilson, Ana, Marcos
                        </div>
                    </div>
                </div>
            `,
            notes: {
                goal: "Sintetizar el valor académico y práctico del proyecto finalizado, abriendo formalmente la sesión de preguntas por parte del tribunal examinador.",
                speech: "En conclusión, el desarrollo de PPM ha sido una experiencia sumamente enriquecedora. Logramos materializar una aplicación multiplataforma completamente funcional que aborda un problema cotidiano de forma privada y robusta. Más allá del producto final, el mayor valor para nosotros ha sido dominar el flujo de trabajo de Clean Architecture y la aplicación práctica de patrones de diseño corporativos. Agradecemos su atención y quedamos a su entera disposición para responder a las preguntas que consideren pertinentes sobre la arquitectura y el código del proyecto. Muchas gracias.",
                cues: [
                    "Mantenerse de pie en silencio con actitud firme e inteligente una vez concluido el discurso.",
                    "Tener preparadas copias digitales del código o diagramas de arquitectura para proyectar rápidamente ante preguntas."
                ],
                bodyLanguage: [
                    "Bajar las manos suavemente al concluir, adoptar una postura neutra y firme, y sonreír.",
                    "Mirar a los evaluadores con respeto esperando a que tomen la palabra."
                ],
                keywords: ["Conclusión", "Clean Architecture", "Éxito", "Aprendizaje", "Ronda de Preguntas"],
                dontForget: [
                    "Agradecer sinceramente al profesor por sus consejos a lo largo del curso.",
                    "Asegurarse de que el diagrama de arquitectura limpia o de clases quede proyectado en pantalla de fondo."
                ],
                questions: [
                    {
                        q: "¿Cuál fue el mayor desafío que tuvo el equipo durante el desarrollo y cómo lo resolvieron?",
                        a: "El mayor desafío técnico fue implementar la persistencia con SQLite en EF Core manejando el tipo decimal. Al no existir soporte nativo, tuvimos que indagar y reestructurar las agregaciones (Sum) a memoria. A nivel metodológico, mantener la disciplina de Clean Architecture requirió constantes revisiones del código para evitar acoplamientos accidentales."
                    }
                ]
            }
        }
    ]
};