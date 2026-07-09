# PLANNING.md

## Estado actual
- Fase: FASE 1 — Arquitectura Base del Backend
- Subfase actual: ARCH-03 — Middleware de métricas de rendimiento
- Estado: esperando aprobación

## Subfases completadas
- INIT-01 — Estructura del repositorio ✅
- INIT-02 — Inicialización y configuración base del backend ✅
- INIT-03 — Inicialización y configuración base del frontend ✅
- INIT-04 — Conexión a Firebase Firestore ✅
- ARCH-01 — Estructura modular por capas ✅
- ARCH-02 — Manejo centralizado de errores ✅
- ARCH-03 — Middleware de métricas de rendimiento ✅

## Subfases pendientes
- ARCH-04 — Formato de respuesta HTTP consistente

## Notas
- INIT-01 aprobada sin reescribir historial de commits (opción A).
- En INIT-02 se agregó autoverificación de salud en server.js.
- INIT-03 aprobada con frontend funcional (Vite + React + Tailwind).
- En INIT-04 se instaló firebase-admin y se conectó Firestore.
- ARCH-01: estructura modular creada con carpetas vacías y routes placeholder.
- ARCH-02: AppError class y errorHandler middleware.
- ARCH-03: metrics middleware registrado como primer middleware en app.js.
