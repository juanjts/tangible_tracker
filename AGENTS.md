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
- Seguir estrictamente el plan de desarrollo definido en `PROJECTROADMAP.md` y mantener actualizado `PLANNING.md`, según se describe en la sección "Seguimiento del Plan de Desarrollo".

---

# Seguimiento del Plan de Desarrollo (PROJECTROADMAP.md y PLANNING.md)

El desarrollo de este proyecto debe seguir estrictamente el plan definido en `PROJECTROADMAP.md`. Ese documento es la única fuente de verdad sobre qué implementar, en qué orden y cuándo detenerse. `PROJECTROADMAP.md` es un documento fijo: no debe modificarse durante el desarrollo salvo indicación explícita del desarrollador.

## Reglas obligatorias de ejecución

- No debe implementarse ninguna fase o subfase que no esté definida en `PROJECTROADMAP.md`.
- El desarrollo se realiza siempre **una subfase a la vez**, nunca de corrido.
- Al finalizar la implementación de una subfase, debes detenerte y esperar la **aprobación explícita del desarrollador** antes de continuar con la siguiente.
- No debes adelantar trabajo correspondiente a fases o subfases futuras, aunque parezca natural hacerlo.
- Si el desarrollador solicita algo que no corresponde a la subfase actual del roadmap, debes advertirlo antes de proceder.

## Archivo PLANNING.md

Debe existir en la raíz del proyecto un archivo `PLANNING.md`, que funciona como **bitácora interna de seguimiento** del plan. A diferencia de `PROJECTROADMAP.md` (fijo e inmutable), `PLANNING.md` es un archivo vivo que se actualiza constantemente durante el desarrollo.

`PLANNING.md` debe contener siempre:

- Fase y subfase actual en ejecución (identificador y nombre).
- Estado de la subfase actual: `en progreso`, `esperando aprobación` o `aprobada`.
- Listado de fases y subfases ya completadas y aprobadas, en orden.
- Listado de fases y subfases pendientes, en orden, tal como aparecen en `PROJECTROADMAP.md`.
- Referencia del último commit aprobado, si aplica.
- Notas relevantes sobre decisiones tomadas durante la subfase actual, si las hay.

### Reglas de actualización de PLANNING.md

- Debe actualizarse al **iniciar** cada subfase, marcándola como `en progreso`.
- Debe actualizarse al **finalizar la implementación** de cada subfase, marcándola como `esperando aprobación`.
- Solo debe marcarse una subfase como `aprobada` / `completada` después de recibir la **aprobación explícita del desarrollador**.
- Nunca debe marcarse como completada una subfase que no haya sido aprobada.
- No debe eliminarse el historial de fases/subfases ya completadas; `PLANNING.md` debe mantener trazabilidad completa del avance del proyecto en todo momento.
- La actualización de `PLANNING.md` se incluye en el mismo commit de la subfase correspondiente o, si ya fue commiteada, en un commit inmediato de tipo `chore(planning): update progress tracking`. Nunca debe quedar desactualizado respecto al estado real del proyecto.

### Estructura mínima esperada de PLANNING.md

```markdown
# PLANNING.md

## Estado actual
- Fase: FASE X - <nombre de la fase>
- Subfase actual: <ID> - <nombre de la subfase>
- Estado: en progreso | esperando aprobación | aprobada

## Subfases completadas
- INIT-01 - Estructura del repositorio
- INIT-02 - Inicialización y configuración base del backend
- ...

## Subfases pendientes
- ARCH-01 - Estructura modular por capas
- ARCH-02 - Manejo centralizado de errores
- ...

## Notas
- <notas relevantes sobre la subfase actual, si las hay>
```

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

Antes de implementar cualquier nueva funcionalidad, verifica que la solución respete este documento, el plan definido en `PROJECTROADMAP.md` y el estado registrado en `PLANNING.md`, manteniendo coherencia con la arquitectura y las decisiones definidas. Usa las skills necesarias para obtener resultados sólidos y claros.

---

# Recordatorios de Ejecución

- **Skills:** Siempre verificar las skills disponibles antes de iniciar cualquier tarea, y cargar las que apliquen al contexto actual.
- **Commits:** Nunca ejecutar `git add`, `git commit`, `git push` ni ningún comando de git. El desarrollador es el único autorizado para gestionar el historial de commits. Solo se debe sugerir el comando de commit para que el desarrollador lo ejecute.
- **Validación previa:** Cada bloque de código generado debe validarse explícitamente contra:
  - Clean Code (funciones pequeñas, nombres descriptivos, sin código muerto).
  - Arquitectura Modular por Capas (Routes → Controllers → Services → Repositories → Firestore).
  - Reglas de negocio definidas en este documento (RN-01 a RN-13).
  - Escalabilidad (evitar N+1, lecturas redundantes, operaciones bloqueantes innecesarias).
  - Seguridad (no confiar en datos del frontend, validar todo en backend, no exponer credenciales).
- **Calidad:** No proponer ni implementar funcionalidades fuera del alcance definido. Cada cambio debe mantener o mejorar la cohesión y el bajo acoplamiento del proyecto.
- **PLANNING.md:** Antes de actualizar `PLANNING.md`, verificar el orden exacto de las fases y subfases en `PROJECT_ROADMAP.md` para evitar errores de secuencia. Nunca asumir el orden; siempre leer el archivo.
- **PLANNING.md — actualización constante:** Antes de cada cambio o commit, verificar y actualizar `PLANNING.md` para que refleje el estado real del avance. No esperar a que el desarrollador lo solicite.