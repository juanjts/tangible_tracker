# tangible_tracker

Sistema de gestión de incidencias y tareas para equipos de desarrollo.

## Quick start

```bash
# Clonar el repositorio
git clone <repository-url>
cd tangible_tracker

# Backend
cd backend
npm install
```

Configurar credenciales de Firebase en `backend/.env`:

```env
PORT=3000
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY="your-private-key"
```

```bash
# Iniciar backend
npm start

# Frontend (nueva terminal)
cd frontend
npm install
```

Configurar URL del backend en `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

```bash
# Iniciar frontend
npm run dev
```

El backend se ejecuta en `http://localhost:3000` y el frontend en `http://localhost:5173`.

## API endpoints

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/identity` | Identificar o crear usuario |
| `GET` | `/api/users` | Listar usuarios |
| `GET` | `/api/tasks` | Listar tareas |
| `POST` | `/api/tasks` | Crear tarea |
| `GET` | `/api/tasks/:id` | Detalle de tarea |
| `PATCH` | `/api/tasks/:id` | Actualizar tarea |
| `DELETE` | `/api/tasks/:id` | Eliminar tarea |

## Tecnologías

- **Backend:** Node.js, Express, Firebase Firestore
- **Frontend:** React, React Router, Axios, Tailwind CSS

## Arquitectura

Arquitectura Modular por Capas:

```
Routes → Controllers → Services → Repositories → Firestore
```

Cada capa tiene una responsabilidad única: Routes define endpoints, Controllers maneja HTTP, Services contiene la lógica de negocio, Repositories accede a Firestore.

## Funcionalidades

- Identificación simulada por correo electrónico
- CRUD completo de tareas con asignación de responsable
- Dashboard con resumen por estado y prioridad
- Filtros y búsqueda de tareas
- Diseño responsive
- Métricas de rendimiento en consola

## Notas

- No implementa autenticación real. La contraseña es únicamente visual y nunca se almacena ni valida.
- El propietario de una tarea se asigna automáticamente desde el backend.
- El responsable debe existir en la base de datos y se valida al crear o actualizar una tarea.
