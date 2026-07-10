# PLANNING.md

## Estado actual
- Fase: FASE 6 — Dashboard y Experiencia de Usuario
- Subfase actual: UX-05 — Pulido visual final
- Estado: en progreso

## Subfases completadas
- INIT-01 — Estructura del repositorio ✅
- INIT-02 — Inicialización y configuración base del backend ✅
- INIT-03 — Inicialización y configuración base del frontend ✅
- INIT-04 — Conexión a Firebase Firestore ✅
- ARCH-01 — Estructura modular por capas ✅
- ARCH-02 — Manejo centralizado de errores ✅
- ARCH-03 — Middleware de métricas de rendimiento ✅
- ARCH-04 — Formato de respuesta HTTP consistente ✅
- TASK-API-01 — Repositorio de usuarios (Firestore) ✅
- TASK-API-02 — Service de identificación de usuario ✅
- TASK-API-03 — Endpoint de identificación simulada ✅
- TASK-UI-01 — Configuración de React Router y estructura de páginas ✅
- TASK-UI-02 — Cliente HTTP centralizado (Axios) ✅
- TASK-UI-03 — Pantalla de identificación simulada ✅
- TASK-UI-04 — Estado global de usuario activo ✅
- TASK-UI-05 — Layout base y navegación ✅
- TASK-API-04 — Repositorio de tareas (Firestore) ✅
- TASK-API-05 — Crear tarea ✅
- TASK-API-06 — Listar tareas ✅
- TASK-API-07 — Consultar detalle de tarea ✅
- TASK-API-08 — Actualizar tarea ✅
- TASK-API-09 — Eliminar tarea ✅
- TASK-API-10 — Consolidación del CRUD y pruebas ✅
- TASK-UI-06 — Servicio HTTP de tareas ✅
- TASK-UI-07 — Listado de tareas ✅
- TASK-UI-08 — Creación de tarea ✅
- TASK-UI-09 — Detalle de tarea ✅
- TASK-UI-10 — Edición de tarea ✅
- TASK-UI-11 — Eliminación de tarea ✅
- TASK-UI-12 — Cambio de responsable ✅
- UX-01 — Dashboard resumen ✅
- UX-02 — Filtros y búsqueda de tareas ✅
- UX-03 — Estados de carga, error y vacío ✅

## Subfases pendientes

### FASE 6 — Dashboard y Experiencia de Usuario
- UX-04 — Diseño responsive
- UX-05 — Pulido visual final

### FASE 7 — Refactor y Calidad
- REFACTOR-01 — Revisión de arquitectura backend
- REFACTOR-02 — Revisión de arquitectura frontend

### FASE 8 — Documentación y Entrega
- DOC-01 — README.md
- DOC-02 — AI_JOURNAL.md
- DOC-03 — Revisión final y checklist de entrega

## Notas
- INIT-01 aprobada sin reescribir historial de commits (opción A).
- En INIT-02 se agregó autoverificación de salud en server.js.
- INIT-03 aprobada con frontend funcional (Vite + React + Tailwind).
- En INIT-04 se instaló firebase-admin y se conectó Firestore.
- ARCH-01: estructura modular creada con carpetas vacías y routes placeholder.
- ARCH-02: AppError class y errorHandler middleware.
- ARCH-03: metrics middleware.
- ARCH-04: successResponse y errorResponse en shared/http/response.js, conectado con errorHandler.
- TASK-API-01: userRepository con findByEmail y create.
- TASK-API-02: identityService con db.runTransaction() para evitar race condition TOCTOU.
- TASK-API-03: endpoint POST /api/identity con controller, validación de email y formato de respuesta estándar.
- Correcciones previas a FASE 3: create sin lectura redundante, repositorio integrado en transacción, AppError con isOperational y logging, .gitkeep en directorios vacíos.
- TASK-UI-01: React Router con 5 rutas, páginas placeholder, build exitoso.
- TASK-UI-02: Axios centralizado con VITE_API_URL, interceptor de errores, health check de prueba.
- TASK-UI-03: Formulario controlado con email + password, validación, loading, error, servicio identityService separado.
- TASK-UI-04: UserContext con sessionStorage, login/logout, redirect con Navigate.
- TASK-UI-05: AppLayout con navbar (NavLink activo, email usuario, cerrar sesión), Outlet para rutas hijas, /identity fuera del layout.
- TASK-API-04: taskRepository con CRUD completo (findAll, findById, create, update, remove).
- TASK-API-05: taskService.create valida activeUser via x-user-email header + responsibleEmail contra userRepository. taskValidations con enums. server.js fix para error EADDRINUSE (Express 5 llama al callback con el error). Owner siempre asignado por backend desde el header validado, nunca del body.
- TASK-API-06 a TASK-API-10: CRUD backend completo validado con todas las reglas de negocio (RN-04 a RN-13).
- TASK-UI-06: servicio tasksService.js creado con 5 funciones (list, getById, create, update, remove), siguiendo el mismo patrón de identityService.js.
- TASK-UI-07: TasksListPage con listado en cards responsive, estados de carga/vacío/error, colores por prioridad y status.
- TASK-UI-08: TaskForm reutilizable para crear tareas, con validacion, estados de carga/error. TasksListPage tiene boton de nueva tarea. Selector de usuarios en lugar de input email.
- TASK-UI-09: TaskDetailPage con detalle completo de la tarea, fechas formateadas, estados de carga/error/404, botones placeholder para editar y eliminar.
- TASK-UI-10: TaskForm modificado para soportar modo edicion. TaskDetailPage integra formulario al hacer clic en Editar.
- TASK-UI-11: Eliminacion desde listado y detalle, con window.confirm, loading state y refresh tras eliminar.
- TASK-UI-12: Hint visual en formulario de edicion sobre actualizacion automatica de fecha de asignacion al cambiar responsable.
- UX-01: Dashboard con conteos de tareas por estado y prioridad, estados de carga/error/vacio.
- UX-04: Diseño responsive implementado en AppLayout (nav oculta email en móvil), TasksListPage, TaskDetailPage (grids adaptables), DashboardPage. Padding responsivo en todas las páginas.
- UX-05: LoadingState con spinner animado, ErrorState con botón de reintento opcional, EmptyState con icono SVG inline, hover en StatCard y form de IdentityPage, transition en badges de TaskDetailPage.
- Se corrigieron las referencias en AGENTS.md: PROJECTROADMAP.md → PROJECT_ROADMAP.md para que coincida con el nombre real del archivo.
- Se creó opencode.json en la raíz registrando las 12 skills del proyecto.
- Se eliminó UX-04 duplicado de la lista de pendientes.
