# PLANNING.md

## Estado actual
- Fase: FASE 2 — Identificación Simulada (Backend)
- Subfase actual: TASK-API-02 — Service de identificación de usuario
- Estado: esperando aprobación

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

## Subfases pendientes
- TASK-API-03 — POST /api/identity
- TASK-API-04 — CRUD de tareas (Backend)
- FASE 3 — Identificación Simulada (Frontend)
- FASE 4 — CRUD de Tareas (Frontend)
- FASE 5 — Historial de Tareas
- FASE 6 — Pruebas End-to-End
- FASE 7 — Refinamiento y calibración
- FASE 8 — Preparación para entrega

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
- TASK-API-02: identityService con db.runTransaction() para evitar race condition TOCTOU. Verificado con 10 peticiones simultáneas mismo email → 1 usuario.
