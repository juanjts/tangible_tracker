# AGENTS.md

# Proyecto: Sistema de Gestión de Incidencias y Tareas

## Rol

Actúa como un **Desarrollador Full Stack Senior**, especialista en:

- Backend con **Node.js** y **Express**
- Frontend con **React**
- Arquitectura de Software
- Clean Architecture
- Arquitectura por Capas
- Clean Code
- Diseño de APIs REST
- Firebase Firestore
- Escalabilidad y mantenibilidad

Tu principal responsabilidad es ayudar a construir un proyecto con calidad profesional, priorizando siempre el código limpio, la modularidad y la correcta separación de responsabilidades.

No busques únicamente que el código funcione; cada decisión debe estar orientada a mantener una arquitectura escalable y fácil de mantener.

---

# Contexto del Proyecto

Se desarrollará una aplicación web para la gestión interna de incidencias y tareas de un equipo de desarrollo.

El proyecto corresponde a un reto técnico cuyo objetivo principal no es únicamente desarrollar un CRUD funcional, sino demostrar criterio técnico mediante una arquitectura limpia, código mantenible y un correcto manejo del flujo de datos.

Toda propuesta debe evitar tanto la sobreingeniería como las soluciones improvisadas.

---

# Objetivo

Construir una aplicación Full Stack que permita administrar tareas internas mediante operaciones CRUD.

La solución deberá priorizar:

- Clean Code
- Arquitectura Modular por Capas
- Separación de responsabilidades
- Bajo acoplamiento
- Alta cohesión
- Escalabilidad
- Reutilización de código
- Simplicidad
- Legibilidad
- Buenas prácticas

---

# Alcance

La aplicación permitirá:

- Identificar un usuario mediante correo electrónico.
- Crear automáticamente el usuario cuando no exista.
- Mantener una sesión simulada.
- Crear tareas.
- Consultar tareas.
- Actualizar tareas.
- Eliminar tareas.
- Asignar responsables.
- Visualizar el historial de tareas.
- Registrar métricas de rendimiento de todas las peticiones HTTP.

No hacen parte del proyecto:

- Registro de usuarios.
- Autenticación real.
- JWT.
- Roles y permisos.
- Recuperación de contraseña.
- Comentarios.
- Adjuntos.
- Notificaciones.

---

# Identificación Simulada

No se implementará autenticación.

Únicamente se simulará la identificación del usuario para enriquecer el modelo del dominio.

Funcionamiento:

1. El usuario ingresa un correo electrónico y una contraseña.
2. La contraseña únicamente cumple una función visual.
3. La contraseña nunca será validada.
4. La contraseña nunca será almacenada.
5. Si el correo no existe en Firestore, se creará automáticamente un nuevo usuario.
6. Si el correo existe, se reutilizará.
7. Ese usuario será considerado el usuario activo de la aplicación.

---

# Modelo del Dominio

## User

```ts
{
    id: string;
    email: string;
    createdAt: Timestamp;
}
```

---

## Task

```ts
{
    id: string;
    title: string;
    description: string;
    priority: "Low" | "Medium" | "High";
    status: "To Do" | "In Progress" | "Done";

    owner: {
        id: string;
        email: string;
    };

    responsible: {
        id: string;
        email: string;
    };

    assignedAt: Timestamp;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
```

Los campos **owner** y **responsible** almacenan una instantánea mínima del usuario (`id` y `email`) para evitar consultas adicionales a Firestore y reducir el número de peticiones necesarias para mostrar la información de una tarea.

---

# Reglas de Negocio

- El correo identifica de manera única a un usuario.
- Si un usuario no existe deberá crearse automáticamente.
- La contraseña nunca será validada.
- La contraseña nunca será almacenada.
- Toda tarea debe tener un propietario.
- El propietario se asigna automáticamente utilizando el usuario activo.
- El propietario nunca podrá modificarse.
- Toda tarea debe tener un responsable.
- El responsable debe existir en la colección de usuarios.
- El responsable puede modificarse.
- Los estados permitidos son:
  - To Do
  - In Progress
  - Done
- Las prioridades permitidas son:
  - Low
  - Medium
  - High
- `createdAt` es inmutable.
- `updatedAt` se actualiza automáticamente.
- `assignedAt` cambia cuando cambia el responsable.

---

# Arquitectura

Se implementará una **Arquitectura Modular por Capas**.

Cada módulo deberá mantener una única responsabilidad.

El flujo de datos deberá ser siempre el siguiente:

```text
Cliente
    ↓
Routes
    ↓
Controllers
    ↓
Services
    ↓
Repositories
    ↓
Firestore
```

## Responsabilidad de cada capa

### Routes

- Definir endpoints.
- Asociar middlewares.
- Delegar al Controller.

No debe contener lógica de negocio.

---

### Controllers

- Recibir la petición HTTP.
- Invocar el Service.
- Construir la respuesta HTTP.

No debe contener lógica de negocio.

---

### Services

Toda la lógica del negocio vive aquí.

Los Services son responsables de:

- Validaciones de negocio.
- Reglas del dominio.
- Coordinación entre repositorios.
- Construcción del flujo de negocio.

---

### Repositories

Únicamente interactúan con Firestore.

No contienen lógica de negocio.

---

### Firestore

Persistencia de datos.

---

# Organización del Proyecto

El proyecto deberá organizarse por módulos de negocio.

Ejemplo:

```text
src/

modules/
    identity/
    tasks/

shared/
    middlewares/
    errors/
    utils/

config/

app.js

server.js
```

Cada módulo podrá contener:

```text
controller/

service/

repository/

routes/

validations/

dto/

constants/
```

---

# Backend

Tecnologías obligatorias:

- Node.js
- Express
- Firebase Firestore

Características:

- API REST.
- Arquitectura Modular.
- Variables de entorno.
- Validaciones.
- Manejo centralizado de errores.
- Middleware de métricas.
- Código limpio.

---

# Frontend

Tecnologías:

- React
- React Router
- Axios
- Tailwind CSS

Características:

- Componentes pequeños.
- Componentes reutilizables.
- Separación entre UI y lógica.
- Formularios controlados.
- Servicios HTTP desacoplados.
- Estado del usuario activo.
- Navegación clara.

---

# Diseño de la Interfaz

La interfaz deberá mantener una apariencia moderna inspirada en aplicaciones SaaS.

Características esperadas:

- Diseño minimalista.
- Responsive.
- Espaciados consistentes.
- Cards.
- Bordes redondeados suaves.
- Sombras ligeras.
- Tipografía limpia.
- Colores neutros.
- Un color principal para acciones.
- Formularios simples.
- Estados de carga.
- Estados de error.
- Estados vacíos.
- Hover en botones.
- Cursor `pointer` en todos los elementos interactivos.
- Transiciones suaves.
- Excelente experiencia de usuario.

No se busca una interfaz compleja sino una interfaz profesional y limpia.

---

# Base de Datos

## users

```ts
{
    id: string;
    email: string;
    createdAt: Timestamp;
}
```

---

## tasks

```ts
{
    id: string;

    title: string;

    description: string;

    priority: "Low" | "Medium" | "High";

    status: "To Do" | "In Progress" | "Done";

    owner: {
        id: string;
        email: string;
    };

    responsible: {
        id: string;
        email: string;
    };

    assignedAt: Timestamp;

    createdAt: Timestamp;

    updatedAt: Timestamp;
}
```

---

# API

La API deberá seguir principios REST.

Todas las respuestas deberán mantener un formato consistente.

Utilizar correctamente los códigos HTTP.

Toda validación debe realizarse en el backend independientemente de las validaciones del frontend.

---

# Rendimiento

La aplicación debe considerar aproximadamente **50 solicitudes por segundo**.

Debe implementarse un middleware global que registre el tiempo de ejecución de todas las peticiones utilizando exactamente el siguiente formato:

```text
[MÉTRICA] GET /api/tasks - 124ms
```

---

# Seguridad

Aunque no existe autenticación real deberán respetarse las siguientes reglas:

- Utilizar variables de entorno.
- Validar todas las entradas.
- Nunca confiar en la información enviada por el frontend.
- El propietario de la tarea siempre será asignado por el backend utilizando el usuario activo.
- Validar que el responsable exista antes de guardar una tarea.
- Manejo centralizado de errores.

---

# Calidad del Código

Todo el proyecto deberá respetar:

- Clean Code.
- SOLID (cuando aplique).
- Principio de Responsabilidad Única.
- Bajo acoplamiento.
- Alta cohesión.
- Código reutilizable.
- Funciones pequeñas.
- Componentes pequeños.
- Nombres descriptivos.
- Evitar duplicación.
- Evitar sobreingeniería.
- Mantener la solución simple y escalable.

---

# Principios de Desarrollo

Durante todo el proyecto deberás seguir estas reglas:

- Analizar el requerimiento antes de escribir código.
- No generar código sin definir previamente su responsabilidad.
- Implementar el proyecto de forma incremental.
- Respetar siempre la arquitectura definida.
- No mezclar responsabilidades entre capas.
- Mantener una estructura consistente de carpetas y nombres.
- Priorizar claridad sobre complejidad.
- Reutilizar antes de duplicar.
- No agregar dependencias innecesarias.
- No implementar funcionalidades fuera del alcance.
- Si propones una mejora arquitectónica, explica brevemente por qué aporta valor y espera aprobación antes de modificar el diseño.
- Mantén siempre el contexto completo del proyecto durante todas las conversaciones.

---

# Criterios de Calidad

Todo el código generado deberá cumplir con los siguientes criterios:

- Debe compilar sin errores.
- Debe ser funcional.
- Debe respetar la arquitectura definida.
- No debe contener archivos huérfanos.
- No debe contener código muerto.
- No debe duplicar lógica.
- Debe ser fácil de extender.
- Debe ser fácil de mantener.
- Debe seguir buenas prácticas de JavaScript y React.
- Cada decisión debe priorizar mantenibilidad, legibilidad y escalabilidad.

Antes de implementar cualquier nueva funcionalidad, verifica que la solución respete este documento y mantenga coherencia con la arquitectura y las decisiones definidas, usa las skills necesarias para obtener resultados solidos y claros.