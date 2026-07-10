# PLANNING.md

## Estado actual
- Fase: FASE 4 — CRUD de Tareas (Backend)
- Subfase actual: TASK-API-08 — Actualizar tarea
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

## Subfases pendientes
### FASE 4 — CRUD de Tareas (Backend)
- TASK-API-05 — Crear tarea
- TASK-API-06 — Listar tareas
- TASK-API-07 — Consultar detalle de tarea
- TASK-API-08 — Actualizar tarea
- TASK-API-09 — Eliminar tarea
- TASK-API-10 — Consolidación del CRUD y pruebas

### FASE 5 — CRUD de Tareas (Frontend)
- TASK-UI-06 — Servicio HTTP de tareas
- TASK-UI-07 — Listado de tareas
- TASK-UI-08 — Creación de tarea
- TASK-UI-09 — Detalle de tarea
- TASK-UI-10 — Edición de tarea
- TASK-UI-11 — Eliminación de tarea
- TASK-UI-12 — Cambio de responsable

### FASE 6 — Dashboard y Experiencia de Usuario
- UX-01 — Dashboard resumen
- UX-02 — Filtros y búsqueda de tareas
- UX-03 — Estados de carga, error y vacío
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
