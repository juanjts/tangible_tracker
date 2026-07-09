# PROJECTROADMAP.md

## Sistema de Gestión de Incidencias y Tareas

---

## Propósito de este documento

Este roadmap es la guía maestra de desarrollo del proyecto, desde un repositorio vacío hasta la entrega final. Es la única fuente de verdad sobre **qué implementar, en qué orden, cuándo detenerse y cuándo considerar terminada cada parte del trabajo**.

### Regla de ejecución obligatoria

- El desarrollo **nunca** se realiza de corrido.
- Se implementa **una subfase a la vez**.
- Al finalizar cada subfase, la IA debe **detenerse y esperar la aprobación explícita del desarrollador** antes de continuar con la siguiente subfase o fase.
- El proyecto debe permanecer **funcional** al finalizar cada subfase.
- No se debe adelantar trabajo correspondiente a subfases futuras, aunque parezca natural hacerlo.
- Ante cualquier ambigüedad no cubierta por AGENTS.md o el documento de análisis, la IA debe preguntar antes de asumir.

### Estructura de cada subfase

Cada subfase incluye: Identificador, Objetivo, Dependencias, Backend, Frontend, Consideraciones técnicas, Archivos esperados, No implementar todavía, Validaciones, Commit sugerido y Definition of Done.

---

## FASE 0 — Inicialización del Proyecto

**Objetivo de la fase:** dejar el repositorio listo, con backend y frontend arrancando de forma independiente y conectados a Firebase, sin ninguna funcionalidad de negocio todavía.

### INIT-01 — Estructura del repositorio

**Objetivo:** crear la estructura raíz del repositorio separando backend y frontend, junto con los archivos base de control de versiones.

**Dependencias:** ninguna.

**Backend:** crear la carpeta `backend/` vacía, lista para ser inicializada.

**Frontend:** crear la carpeta `frontend/` vacía, lista para ser inicializada.

**Consideraciones técnicas:** definir `.gitignore` raíz cubriendo `node_modules`, archivos de entorno y artefactos de build. No mezclar dependencias de backend y frontend en un mismo `package.json`.

**Archivos esperados:** `.gitignore`, `README.md` (placeholder mínimo), `backend/`, `frontend/`.

**No implementar todavía:** ningún código de aplicación, ni configuración de Express, React o Firebase.

**Validaciones:** el repositorio clona correctamente y ambas carpetas existen vacías o con placeholder.

**Commit sugerido:** `chore: initialize repository structure`

**Definition of Done:** repositorio inicializado, con estructura de carpetas clara y `.gitignore` funcional.

---

### INIT-02 — Inicialización y configuración base del backend

**Objetivo:** dejar un servidor Express mínimo ejecutándose, sin lógica de negocio.

**Dependencias:** INIT-01.

**Backend:** inicializar proyecto Node.js en `backend/`, instalar Express, crear `server.js` y `app.js` mínimos que levanten el servidor y respondan un endpoint de salud (`/health` o similar). Configurar carga de variables de entorno mediante archivo `.env` y su respectivo `.env.example`.

**Frontend:** no aplica en esta subfase.

**Consideraciones técnicas:** separar `app.js` (configuración de Express) de `server.js` (arranque del servidor) para mantener responsabilidades claras desde el inicio. No incluir aún lógica de negocio ni conexión a Firestore.

**Archivos esperados:** `backend/package.json`, `backend/app.js`, `backend/server.js`, `backend/.env.example`.

**No implementar todavía:** rutas de negocio, middlewares de errores o métricas, conexión a Firebase.

**Validaciones:** el servidor arranca localmente sin errores y responde correctamente en el endpoint de salud.

**Commit sugerido:** `chore(backend): initialize express server`

**Definition of Done:** backend arranca de forma estable y responde a una petición básica.

---

### INIT-03 — Inicialización y configuración base del frontend

**Objetivo:** dejar una aplicación React mínima ejecutándose, con Tailwind configurado, sin pantallas de negocio todavía.

**Dependencias:** INIT-01.

**Backend:** no aplica en esta subfase.

**Frontend:** inicializar proyecto React en `frontend/`, instalar y configurar Tailwind CSS, dejar una pantalla inicial mínima (por ejemplo un mensaje de bienvenida) para confirmar que el proyecto compila y los estilos de Tailwind se aplican correctamente.

**Consideraciones técnicas:** mantener la configuración de Tailwind desacoplada de componentes de negocio. No crear todavía estructura de rutas ni componentes reutilizables.

**Archivos esperados:** `frontend/package.json`, `frontend/tailwind.config.js`, `frontend/src/App.jsx`, `frontend/src/main.jsx` (o equivalente según el bootstrap elegido).

**No implementar todavía:** React Router, Axios, pantallas de identificación o de tareas.

**Validaciones:** la aplicación levanta en modo desarrollo y se visualiza correctamente con estilos de Tailwind aplicados.

**Commit sugerido:** `chore(frontend): initialize react app with tailwind`

**Definition of Done:** frontend arranca en local y renderiza una pantalla base con Tailwind funcionando.

---

### INIT-04 — Conexión a Firebase Firestore

**Objetivo:** dejar el backend conectado a Firestore mediante configuración basada en variables de entorno.

**Dependencias:** INIT-02.

**Backend:** agregar el SDK de Firebase Admin, crear el módulo de configuración/inicialización de Firestore dentro de `config/`, y validar la conexión mediante una prueba mínima (por ejemplo, listar colecciones o hacer un ping controlado). Las credenciales deben cargarse exclusivamente desde variables de entorno.

**Frontend:** no aplica; el frontend nunca se conecta directamente a Firestore.

**Consideraciones técnicas:** nunca exponer credenciales en el repositorio; deben quedar documentadas únicamente en `.env.example` sin valores reales. La inicialización de Firestore debe quedar centralizada en un único módulo reutilizable por los repositorios de datos.

**Archivos esperados:** `backend/src/config/firebase.js`, actualización de `backend/.env.example`.

**No implementar todavía:** colecciones de negocio (`users`, `tasks`), repositorios ni servicios.

**Validaciones:** el backend inicia sin errores de conexión y se confirma acceso válido a Firestore con las credenciales configuradas.

**Commit sugerido:** `feat(backend): connect to firebase firestore`

**Definition of Done:** conexión a Firestore establecida, estable y basada en variables de entorno.

---

## FASE 1 — Arquitectura Base del Backend

**Objetivo de la fase:** dejar preparada la arquitectura modular por capas, el manejo centralizado de errores, el middleware de métricas y el formato de respuesta consistente, antes de escribir cualquier funcionalidad de negocio.

### ARCH-01 — Estructura modular por capas

**Objetivo:** crear el esqueleto de carpetas del backend siguiendo la arquitectura definida (routes, controllers, services, repositories) organizada por módulos de negocio.

**Dependencias:** INIT-04.

**Backend:** crear la estructura `src/modules/`, `src/shared/`, `src/config/` descrita en AGENTS.md, incluyendo carpetas vacías o con archivos índice para los módulos `identity` y `tasks` (sin lógica todavía). Registrar en `app.js` el punto de montaje de rutas, aunque aún no existan rutas reales.

**Frontend:** no aplica.

**Consideraciones técnicas:** respetar estrictamente la separación de responsabilidades entre capas desde el inicio: Routes no debe contener lógica, Controllers no debe contener lógica de negocio, Services concentra las reglas de negocio, Repositories solo interactúa con Firestore.

**Archivos esperados:** `backend/src/modules/identity/`, `backend/src/modules/tasks/`, `backend/src/shared/`, `backend/src/config/`.

**No implementar todavía:** ningún endpoint, controlador o servicio funcional.

**Validaciones:** el servidor sigue arrancando correctamente tras la reorganización de carpetas.

**Commit sugerido:** `chore(backend): set up modular layered architecture`

**Definition of Done:** estructura de carpetas creada y documentada, sin romper el arranque del servidor.

---

### ARCH-02 — Manejo centralizado de errores

**Objetivo:** implementar el middleware global de manejo de errores y una clase/utilidad de error de negocio reutilizable.

**Dependencias:** ARCH-01.

**Backend:** crear en `shared/errors/` una clase de error de aplicación (por ejemplo `AppError`) y un middleware de manejo de errores en `shared/middlewares/` que capture cualquier error lanzado en la cadena de peticiones y devuelva una respuesta HTTP consistente. Registrar el middleware al final de `app.js`.

**Frontend:** no aplica.

**Consideraciones técnicas:** el middleware debe distinguir entre errores esperados (de negocio/validación) y errores inesperados, sin filtrar detalles sensibles en producción. Ninguna capa debe manejar errores de forma local si puede delegarse al middleware global.

**Archivos esperados:** `backend/src/shared/errors/AppError.js`, `backend/src/shared/middlewares/errorHandler.js`.

**No implementar todavía:** validaciones de negocio específicas de `identity` o `tasks`.

**Validaciones:** forzar un error de prueba (endpoint temporal o test) y confirmar que el middleware responde con el formato de error esperado en lugar de un stack trace crudo.

**Commit sugerido:** `feat(backend): add centralized error handling`

**Definition of Done:** cualquier error lanzado dentro del flujo de peticiones es capturado y respondido de forma consistente.

---

### ARCH-03 — Middleware de métricas de rendimiento

**Objetivo:** registrar en consola el tiempo de ejecución de cada petición HTTP usando el formato exacto definido en el análisis.

**Dependencias:** ARCH-01.

**Backend:** implementar en `shared/middlewares/` un middleware global que mida el tiempo de respuesta de cada petición y lo imprima en consola con el formato `[MÉTRICA] MÉTODO RUTA - Xms`. Registrarlo como uno de los primeros middlewares en `app.js`.

**Frontend:** no aplica.

**Consideraciones técnicas:** el middleware debe aplicarse a todas las rutas sin excepción y no debe interferir con el manejo de errores ni con el formato de respuesta.

**Archivos esperados:** `backend/src/shared/middlewares/metrics.js`.

**No implementar todavía:** almacenamiento persistente de métricas; el requisito es únicamente registro en consola.

**Validaciones:** al invocar el endpoint de salud u otro endpoint de prueba, la consola muestra la línea de métrica con el formato exacto indicado.

**Commit sugerido:** `feat(backend): add performance metrics middleware`

**Definition of Done:** toda petición HTTP queda registrada en consola con el formato `[MÉTRICA] MÉTODO RUTA - Xms`.

---

### ARCH-04 — Formato de respuesta HTTP consistente

**Objetivo:** definir un formato único de respuesta (éxito y error) reutilizable por todos los controladores.

**Dependencias:** ARCH-02.

**Backend:** crear en `shared/` una utilidad (por ejemplo `httpResponse.js`) que estandarice la forma de las respuestas exitosas y de error, y conectarla con el middleware de errores de ARCH-02 para que todo error termine devolviendo el mismo formato.

**Frontend:** no aplica.

**Consideraciones técnicas:** este formato debe ser el que use el frontend más adelante para interpretar respuestas, por lo que debe mantenerse estable durante todo el proyecto.

**Archivos esperados:** `backend/src/shared/http/response.js`.

**No implementar todavía:** endpoints reales de negocio.

**Validaciones:** el endpoint de salud y el endpoint de prueba de errores devuelven respuestas con la misma forma estructural.

**Commit sugerido:** `feat(backend): standardize http response format`

**Definition of Done:** existe un formato de respuesta único, documentado implícitamente por su uso, listo para ser consumido por cualquier endpoint futuro.

---

## FASE 2 — Identificación Simulada (Backend)

**Objetivo de la fase:** implementar la lógica de identificación simulada de usuarios por correo electrónico, sin autenticación real.

### TASK-API-01 — Repositorio de usuarios (Firestore)

**Objetivo:** implementar el acceso a la colección `users` en Firestore.

**Dependencias:** ARCH-01, INIT-04.

**Backend:** crear en `modules/identity/repository/` las funciones de acceso a Firestore para buscar un usuario por email y crear un nuevo usuario. El repositorio no debe contener lógica de negocio, únicamente operaciones de persistencia.

**Frontend:** no aplica.

**Consideraciones técnicas:** respetar el modelo de datos de `users` definido en AGENTS.md (`id`, `email`, `createdAt`). El acceso a Firestore debe quedar exclusivamente en esta capa.

**Archivos esperados:** `backend/src/modules/identity/repository/userRepository.js`.

**No implementar todavía:** validaciones de negocio ni el endpoint público.

**Validaciones:** pruebas manuales o unitarias que confirmen que el repositorio puede crear y consultar un usuario en Firestore.

**Commit sugerido:** `feat(backend): add user repository`

**Definition of Done:** el repositorio permite buscar y crear usuarios en Firestore de forma confiable.

---

### TASK-API-02 — Service de identificación de usuario

**Objetivo:** implementar la lógica de negocio que busca o crea automáticamente un usuario a partir de su correo.

**Dependencias:** TASK-API-01.

**Backend:** crear en `modules/identity/service/` la función que reciba un email, valide su formato, busque el usuario en el repositorio y, si no existe, lo cree automáticamente. Debe devolver el usuario resultante como el usuario activo.

**Frontend:** no aplica.

**Consideraciones técnicas:** aplicar RN-01 y RN-02 (el correo identifica de manera única al usuario; si no existe, se crea automáticamente). La contraseña, si se recibe, nunca debe validarse ni almacenarse, conforme a la identificación simulada definida en AGENTS.md.

**Archivos esperados:** `backend/src/modules/identity/service/identityService.js`.

**No implementar todavía:** el endpoint HTTP ni el DTO de entrada/salida definitivo.

**Validaciones:** pruebas que confirmen que un email nuevo crea usuario y un email existente reutiliza el usuario ya creado.

**Commit sugerido:** `feat(backend): add identity service logic`

**Definition of Done:** la lógica de identificación simulada funciona correctamente en ambos escenarios (usuario nuevo y usuario existente).

---

### TASK-API-03 — Endpoint de identificación simulada

**Objetivo:** exponer el endpoint HTTP que permite identificar/crear al usuario activo.

**Dependencias:** TASK-API-02, ARCH-04.

**Backend:** crear el controlador y la ruta (por ejemplo `POST /api/identity`) que reciba el correo (y opcionalmente una contraseña puramente visual), invoque el service de identidad y devuelva el usuario activo usando el formato de respuesta estándar. Incluir validación de entrada (formato de email) antes de invocar el service.

**Frontend:** no aplica todavía; esta subfase es exclusivamente backend.

**Consideraciones técnicas:** el controlador no debe contener lógica de negocio, solo orquestar la petición y la respuesta. La contraseña nunca debe almacenarse ni reenviarse en la respuesta.

**Archivos esperados:** `backend/src/modules/identity/controller/identityController.js`, `backend/src/modules/identity/routes/identityRoutes.js`.

**No implementar todavía:** persistencia de sesión en el cliente; eso corresponde al frontend en TASK-UI-04.

**Validaciones:** probar el endpoint con herramientas como Postman/cURL confirmando creación y reutilización de usuario, y validación de email inválido.

**Commit sugerido:** `feat(backend): expose simulated identity endpoint`

**Definition of Done:** el endpoint de identificación simulada funciona de extremo a extremo y responde con el usuario activo.

---

## FASE 3 — Identificación Simulada (Frontend)

**Objetivo de la fase:** dejar la aplicación React con navegación base, cliente HTTP centralizado y la pantalla de identificación simulada funcionando contra el backend.

### TASK-UI-01 — Configuración de React Router y estructura de páginas

**Objetivo:** establecer el enrutamiento base de la aplicación y las carpetas de páginas/componentes.

**Dependencias:** INIT-03.

**Backend:** no aplica.

**Frontend:** instalar y configurar React Router, definir las rutas principales previstas (identificación, dashboard, listado de tareas, detalle de tarea) aunque las pantallas todavía estén vacías o sean placeholders. Crear la estructura de carpetas `pages/`, `components/`, `services/`, `context/`.

**Consideraciones técnicas:** mantener separación entre páginas (rutas) y componentes reutilizables desde el inicio, conforme a las convenciones de AGENTS.md.

**Archivos esperados:** `frontend/src/router/`, `frontend/src/pages/`, `frontend/src/components/`.

**No implementar todavía:** lógica de negocio ni pantallas funcionales completas.

**Validaciones:** la navegación entre rutas placeholder funciona correctamente en el navegador.

**Commit sugerido:** `chore(frontend): set up routing and page structure`

**Definition of Done:** navegación base funcional entre las rutas previstas del proyecto.

---

### TASK-UI-02 — Cliente HTTP centralizado (Axios)

**Objetivo:** crear una instancia de Axios reutilizable para toda la comunicación con la API.

**Dependencias:** TASK-UI-01.

**Backend:** no aplica.

**Frontend:** crear en `services/` una instancia de Axios con configuración base (URL de la API mediante variable de entorno) e interceptores para manejo uniforme de errores de red y de respuesta.

**Consideraciones técnicas:** ningún componente debe usar Axios directamente sin pasar por esta instancia centralizada, para mantener la comunicación con la API desacoplada de la UI.

**Archivos esperados:** `frontend/src/services/httpClient.js`, `frontend/.env.example`.

**No implementar todavía:** servicios específicos de `identity` o `tasks`; esta subfase es solo la instancia base.

**Validaciones:** se realiza una petición de prueba (por ejemplo al endpoint de salud del backend) y se confirma que la instancia responde correctamente.

**Commit sugerido:** `feat(frontend): add centralized axios client`

**Definition of Done:** existe un cliente HTTP único, configurado y reutilizable por toda la aplicación.

---

### TASK-UI-03 — Pantalla de identificación simulada

**Objetivo:** construir el formulario de identificación (correo y contraseña visual) y conectarlo al endpoint del backend.

**Dependencias:** TASK-UI-02, TASK-API-03.

**Backend:** no aplica.

**Frontend:** crear la página de identificación con un formulario controlado (email y contraseña), validaciones básicas en frontend (formato de email, campos requeridos) y la llamada al servicio HTTP que invoca `POST /api/identity`. Mostrar estados de carga y de error del formulario.

**Consideraciones técnicas:** la contraseña es únicamente visual: no debe enviarse con expectativa de validación real, ni almacenarse en ningún lado. El diseño debe seguir los lineamientos de interfaz definidos en AGENTS.md (minimalista, moderno, estados de carga/error).

**Archivos esperados:** `frontend/src/pages/IdentityPage.jsx`, `frontend/src/services/identityService.js`.

**No implementar todavía:** persistencia del usuario activo entre recargas ni protección de rutas; eso se resuelve en TASK-UI-04.

**Validaciones:** identificar un correo nuevo crea el usuario en backend y lo refleja en la UI; identificar un correo existente lo reutiliza.

**Commit sugerido:** `feat(frontend): add simulated identity screen`

**Definition of Done:** el formulario de identificación funciona de extremo a extremo contra el backend real.

---

### TASK-UI-04 — Estado global de usuario activo

**Objetivo:** mantener el usuario identificado disponible globalmente en la aplicación durante la sesión simulada.

**Dependencias:** TASK-UI-03.

**Backend:** no aplica.

**Frontend:** implementar un Context (u otro mecanismo de estado global simple) que almacene el usuario activo tras la identificación y lo exponga al resto de la aplicación. Redirigir automáticamente a las pantallas protegidas solo cuando exista un usuario activo.

**Consideraciones técnicas:** al ser una sesión simulada, no se implementa persistencia de tokens ni backend de sesión; el estado vive en el cliente durante la sesión del navegador conforme a la simplicidad definida en el alcance.

**Archivos esperados:** `frontend/src/context/UserContext.jsx`.

**No implementar todavía:** protección de rutas mediante autenticación real, roles o permisos (fuera de alcance).

**Validaciones:** tras identificarse, el usuario activo está disponible en cualquier componente que consulte el contexto; al no haber usuario activo, no se puede acceder a las pantallas protegidas.

**Commit sugerido:** `feat(frontend): add active user global state`

**Definition of Done:** el usuario activo se mantiene disponible de forma consistente durante la sesión simulada.

---

### TASK-UI-05 — Layout base y navegación

**Objetivo:** construir el layout general de la aplicación (barra de navegación, contenedor principal) que envolverá las pantallas de negocio.

**Dependencias:** TASK-UI-04.

**Backend:** no aplica.

**Frontend:** crear un componente de layout con navegación clara entre las secciones previstas (dashboard, tareas) y visualización del usuario activo. Aplicar los lineamientos visuales definidos en AGENTS.md (diseño minimalista, cards, colores neutros, un color principal de acción).

**Consideraciones técnicas:** el layout debe ser un componente reutilizable, no una pantalla, para no duplicar navegación en cada página.

**Archivos esperados:** `frontend/src/components/layout/AppLayout.jsx`.

**No implementar todavía:** contenido funcional de dashboard o tareas; solo el contenedor y la navegación.

**Validaciones:** la navegación entre secciones funciona visualmente y mantiene el usuario activo visible.

**Commit sugerido:** `feat(frontend): add base layout and navigation`

**Definition of Done:** layout base funcional, listo para alojar las pantallas de negocio de las siguientes fases.

---

## FASE 4 — CRUD de Tareas (Backend)

**Objetivo de la fase:** implementar de forma incremental cada operación del CRUD de tareas, respetando las reglas de negocio definidas (propietario automático e inmutable, responsable validable y modificable, fechas automáticas).

### TASK-API-04 — Repositorio de tareas (Firestore)

**Objetivo:** implementar el acceso a la colección `tasks` en Firestore.

**Dependencias:** ARCH-01, INIT-04.

**Backend:** crear en `modules/tasks/repository/` las funciones de acceso a Firestore para crear, listar, obtener por id, actualizar y eliminar tareas. Repositorio sin lógica de negocio.

**Frontend:** no aplica.

**Consideraciones técnicas:** respetar el modelo de datos de `tasks` definido en AGENTS.md, incluyendo los objetos `owner` y `responsible` como instantáneas mínimas (`id`, `email`).

**Archivos esperados:** `backend/src/modules/tasks/repository/taskRepository.js`.

**No implementar todavía:** validaciones de negocio ni endpoints.

**Validaciones:** pruebas manuales/unitarias de las operaciones básicas de persistencia sobre la colección `tasks`.

**Commit sugerido:** `feat(backend): add task repository`

**Definition of Done:** el repositorio permite persistir y consultar tareas en Firestore de forma confiable.

---

### TASK-API-05 — Crear tarea

**Objetivo:** implementar la lógica y el endpoint para registrar una nueva tarea.

**Dependencias:** TASK-API-04, TASK-API-01, TASK-UI-04 (usuario activo disponible conceptualmente en backend vía identificación).

**Backend:** implementar el service de creación de tareas aplicando RN-04 a RN-06 (toda tarea debe tener propietario, el propietario se asigna automáticamente con el usuario activo, el propietario nunca se modifica) y RN-07 (el responsable debe existir y ser válido, validado contra el repositorio de usuarios). Crear el controlador y la ruta `POST /api/tasks`. Validar `status` y `priority` contra los valores permitidos.

**Frontend:** no aplica en esta subfase.

**Consideraciones técnicas:** el propietario nunca debe confiarse desde el frontend; siempre se asigna en backend a partir del usuario activo, conforme a la sección de Seguridad de AGENTS.md. `createdAt` y `updatedAt` se generan automáticamente en el backend.

**Archivos esperados:** `backend/src/modules/tasks/service/taskService.js`, `backend/src/modules/tasks/controller/taskController.js`, `backend/src/modules/tasks/routes/taskRoutes.js`, `backend/src/modules/tasks/validations/taskValidations.js`.

**No implementar todavía:** listar, actualizar o eliminar tareas.

**Validaciones:** crear una tarea válida persiste correctamente en Firestore con propietario, fechas y valores enumerados correctos; una tarea con responsable inexistente es rechazada.

**Commit sugerido:** `feat(backend): implement task creation`

**Definition of Done:** el endpoint de creación de tareas funciona de extremo a extremo respetando todas las reglas de negocio aplicables.

---

### TASK-API-06 — Listar tareas

**Objetivo:** implementar la consulta del listado completo de tareas.

**Dependencias:** TASK-API-05.

**Backend:** implementar el service y el endpoint `GET /api/tasks` que devuelva el listado de tareas usando el formato de respuesta estándar.

**Frontend:** no aplica en esta subfase.

**Consideraciones técnicas:** considerar el requisito de rendimiento (~50 solicitudes por segundo) evitando lecturas innecesarias o transformaciones costosas sobre el listado.

**Archivos esperados:** actualización de `taskService.js`, `taskController.js`, `taskRoutes.js`.

**No implementar todavía:** filtros o búsqueda avanzada; eso corresponde a UX-02 en el frontend, apoyándose solo en lo estrictamente necesario del backend si se requiere.

**Validaciones:** el endpoint devuelve correctamente todas las tareas existentes en Firestore.

**Commit sugerido:** `feat(backend): implement task listing`

**Definition of Done:** el listado de tareas se consulta correctamente y de forma eficiente.

---

### TASK-API-07 — Consultar detalle de tarea

**Objetivo:** implementar la consulta de una tarea específica por id.

**Dependencias:** TASK-API-06.

**Backend:** implementar el service y el endpoint `GET /api/tasks/:id`, incluyendo el manejo del caso en que la tarea no exista (error controlado mediante el middleware centralizado).

**Frontend:** no aplica en esta subfase.

**Consideraciones técnicas:** reutilizar el `AppError` de ARCH-02 para representar el caso de tarea no encontrada, en lugar de manejarlo de forma local en el controlador.

**Archivos esperados:** actualización de `taskService.js`, `taskController.js`, `taskRoutes.js`.

**No implementar todavía:** actualización ni eliminación.

**Validaciones:** consultar una tarea existente devuelve sus datos completos; consultar un id inexistente devuelve un error controlado y consistente.

**Commit sugerido:** `feat(backend): implement task detail retrieval`

**Definition of Done:** el detalle de una tarea puede consultarse de forma confiable, incluyendo el manejo de casos no encontrados.

---

### TASK-API-08 — Actualizar tarea

**Objetivo:** implementar la actualización de los campos editables de una tarea.

**Dependencias:** TASK-API-07.

**Backend:** implementar el service y el endpoint `PUT/PATCH /api/tasks/:id` respetando RN-06 (propietario inmutable), RN-08 (responsable modificable, validado contra usuarios existentes), RN-09/RN-10 (status y priority dentro de los valores permitidos), RN-12 (actualización automática de `updatedAt`) y RN-13 (actualización de `assignedAt` cuando cambia el responsable).

**Frontend:** no aplica en esta subfase.

**Consideraciones técnicas:** el backend debe ignorar o rechazar cualquier intento de modificar el propietario proveniente del cliente, nunca confiar en esa información del frontend.

**Archivos esperados:** actualización de `taskService.js`, `taskController.js`, `taskRoutes.js`, `taskValidations.js`.

**No implementar todavía:** eliminación de tareas.

**Validaciones:** actualizar campos editables persiste correctamente; intentar modificar el propietario no tiene efecto; cambiar el responsable actualiza `assignedAt`; cambiar cualquier campo actualiza `updatedAt`.

**Commit sugerido:** `feat(backend): implement task update`

**Definition of Done:** la actualización de tareas respeta íntegramente las reglas de negocio definidas.

---

### TASK-API-09 — Eliminar tarea

**Objetivo:** implementar la eliminación de una tarea existente.

**Dependencias:** TASK-API-08.

**Backend:** implementar el service y el endpoint `DELETE /api/tasks/:id`, manejando el caso de tarea inexistente mediante el error controlado ya existente.

**Frontend:** no aplica en esta subfase.

**Consideraciones técnicas:** confirmar que la eliminación es definitiva y que no quedan referencias huérfanas relevantes dentro del alcance actual del proyecto.

**Archivos esperados:** actualización de `taskService.js`, `taskController.js`, `taskRoutes.js`.

**No implementar todavía:** asignación de responsable como flujo independiente; ya queda cubierta dentro de TASK-API-08, por lo que TASK-API-10 se enfoca solo en exponerlo claramente si se decide un endpoint dedicado.

**Validaciones:** eliminar una tarea existente la remueve de Firestore; eliminar un id inexistente devuelve un error controlado.

**Commit sugerido:** `feat(backend): implement task deletion`

**Definition of Done:** las tareas pueden eliminarse de forma segura y confiable.

---

### TASK-API-10 — Consolidación del CRUD y pruebas de reglas de negocio

**Objetivo:** revisar de forma integral el CRUD completo de tareas contra todas las reglas de negocio (RN-04 a RN-13) antes de iniciar la integración con el frontend.

**Dependencias:** TASK-API-09.

**Backend:** ejecutar una revisión funcional de los cinco endpoints de tareas en conjunto, confirmando consistencia en validaciones, formato de respuesta y manejo de errores entre todos ellos.

**Frontend:** no aplica.

**Consideraciones técnicas:** esta subfase no agrega funcionalidades nuevas; es un punto de control de calidad antes de avanzar a la integración con la UI.

**Archivos esperados:** ajustes menores en los archivos existentes de `modules/tasks/`, si la revisión detecta inconsistencias.

**No implementar todavía:** ninguna funcionalidad de frontend todavía.

**Validaciones:** ejecutar manualmente el flujo completo (crear → listar → consultar → actualizar → eliminar) y confirmar que cada regla de negocio se respeta en todos los casos.

**Commit sugerido:** `test(backend): validate full task crud business rules`

**Definition of Done:** el CRUD de tareas en backend queda validado de forma integral y listo para ser consumido por el frontend.

---

## FASE 5 — CRUD de Tareas (Frontend)

**Objetivo de la fase:** construir la interfaz que consume el CRUD de tareas ya validado en backend, un flujo a la vez.

### TASK-UI-06 — Servicio HTTP de tareas

**Objetivo:** crear el servicio frontend que centraliza las llamadas a los endpoints de tareas.

**Dependencias:** TASK-UI-02, TASK-API-10.

**Backend:** no aplica.

**Frontend:** crear `services/tasksService.js` con funciones para crear, listar, obtener, actualizar y eliminar tareas, reutilizando el cliente HTTP centralizado de TASK-UI-02.

**Consideraciones técnicas:** ningún componente debe llamar a Axios directamente; todo pasa por este servicio, siguiendo la separación entre UI y lógica definida en AGENTS.md.

**Archivos esperados:** `frontend/src/services/tasksService.js`.

**No implementar todavía:** componentes visuales de tareas.

**Validaciones:** cada función del servicio se prueba de forma aislada contra el backend real.

**Commit sugerido:** `feat(frontend): add tasks http service`

**Definition of Done:** servicio de tareas completo y funcional, listo para ser consumido por componentes.

---

### TASK-UI-07 — Listado de tareas

**Objetivo:** construir la pantalla que muestra el listado de tareas existentes.

**Dependencias:** TASK-UI-06, TASK-UI-05.

**Backend:** no aplica.

**Frontend:** crear la página de listado de tareas dentro del layout base, consumiendo `GET /api/tasks`, mostrando la información relevante de cada tarea (título, estado, prioridad, responsable) en un formato tipo cards o tabla, según los lineamientos visuales definidos.

**Consideraciones técnicas:** mantener el componente de listado desacoplado de la lógica de obtención de datos, delegando esta última al servicio de TASK-UI-06.

**Archivos esperados:** `frontend/src/pages/TasksListPage.jsx`, `frontend/src/components/tasks/TaskCard.jsx` (o equivalente).

**No implementar todavía:** creación, edición o eliminación desde esta pantalla; solo visualización.

**Validaciones:** el listado refleja correctamente las tareas existentes en Firestore.

**Commit sugerido:** `feat(frontend): add tasks list screen`

**Definition of Done:** el listado de tareas se visualiza correctamente y de forma consistente con los datos del backend.

---

### TASK-UI-08 — Creación de tarea

**Objetivo:** construir el formulario para crear una nueva tarea.

**Dependencias:** TASK-UI-07.

**Backend:** no aplica.

**Frontend:** crear un formulario controlado con los campos editables por el usuario (título, descripción, prioridad, estado, responsable), con validaciones básicas en frontend (campos requeridos, valores permitidos) antes de invocar `POST /api/tasks`. Tras la creación, actualizar el listado.

**Consideraciones técnicas:** el propietario nunca se solicita en el formulario; es responsabilidad exclusiva del backend, conforme a RN-05. El responsable debe seleccionarse de forma que se envíe un identificador válido.

**Archivos esperados:** `frontend/src/components/tasks/TaskForm.jsx`, actualización de `TasksListPage.jsx`.

**No implementar todavía:** edición ni eliminación.

**Validaciones:** crear una tarea desde la UI la refleja correctamente en el listado y en Firestore, con el propietario asignado automáticamente por el backend.

**Commit sugerido:** `feat(frontend): add task creation form`

**Definition of Done:** las tareas pueden crearse completamente desde la interfaz.

---

### TASK-UI-09 — Detalle de tarea

**Objetivo:** construir la pantalla de detalle de una tarea específica.

**Dependencias:** TASK-UI-08.

**Backend:** no aplica.

**Frontend:** crear la página de detalle que consuma `GET /api/tasks/:id` y muestre toda la información de la tarea, incluyendo propietario, responsable y fechas.

**Consideraciones técnicas:** manejar el estado de "tarea no encontrada" de forma clara para el usuario, reutilizando el formato de error devuelto por el backend.

**Archivos esperados:** `frontend/src/pages/TaskDetailPage.jsx`.

**No implementar todavía:** edición ni eliminación desde esta pantalla; solo visualización del detalle.

**Validaciones:** navegar desde el listado al detalle muestra la información correcta de la tarea seleccionada.

**Commit sugerido:** `feat(frontend): add task detail screen`

**Definition of Done:** el detalle de una tarea se visualiza correctamente desde la interfaz.

---

### TASK-UI-10 — Edición de tarea

**Objetivo:** permitir editar los campos editables de una tarea existente.

**Dependencias:** TASK-UI-09.

**Backend:** no aplica.

**Frontend:** reutilizar el componente de formulario de TASK-UI-08 en modo edición, precargando los datos de la tarea y enviando la actualización mediante `PUT/PATCH /api/tasks/:id`. El campo de propietario debe mostrarse como no editable.

**Consideraciones técnicas:** reutilizar componentes en lugar de duplicar el formulario de creación, conforme a los principios de reutilización de código de AGENTS.md.

**Archivos esperados:** actualización de `TaskForm.jsx`, `TaskDetailPage.jsx`.

**No implementar todavía:** eliminación de tareas.

**Validaciones:** editar una tarea existente refleja correctamente los cambios en el detalle y en el listado; el propietario permanece inalterado.

**Commit sugerido:** `feat(frontend): add task edit flow`

**Definition of Done:** las tareas pueden editarse completamente desde la interfaz respetando las reglas de negocio.

---

### TASK-UI-11 — Eliminación de tarea

**Objetivo:** permitir eliminar una tarea existente desde la interfaz.

**Dependencias:** TASK-UI-10.

**Backend:** no aplica.

**Frontend:** agregar la acción de eliminación (desde el listado y/o el detalle) con una confirmación previa del usuario antes de invocar `DELETE /api/tasks/:id`. Actualizar el listado tras la eliminación.

**Consideraciones técnicas:** evitar eliminaciones accidentales mediante un paso de confirmación explícito.

**Archivos esperados:** actualización de `TasksListPage.jsx`, `TaskDetailPage.jsx`.

**No implementar todavía:** funcionalidades de dashboard o filtros.

**Validaciones:** eliminar una tarea la remueve correctamente de la interfaz y de Firestore.

**Commit sugerido:** `feat(frontend): add task deletion flow`

**Definition of Done:** el CRUD completo de tareas queda funcional de extremo a extremo desde la interfaz.

---

### TASK-UI-12 — Cambio de responsable

**Objetivo:** asegurar que la reasignación de responsable esté claramente soportada como parte del flujo de edición.

**Dependencias:** TASK-UI-11.

**Backend:** no aplica.

**Frontend:** revisar y, de ser necesario, mejorar el selector de responsable dentro del formulario de edición para que sea claro y explícito, mostrando la fecha de asignación (`assignedAt`) actualizada tras el cambio.

**Consideraciones técnicas:** este flujo ya está soportado técnicamente por TASK-API-08 y TASK-UI-10; esta subfase se enfoca en la claridad de la experiencia de reasignación, no en nueva lógica de negocio.

**Archivos esperados:** ajustes menores en `TaskForm.jsx`, `TaskDetailPage.jsx`.

**No implementar todavía:** filtros, dashboard o funcionalidades fuera de alcance.

**Validaciones:** cambiar el responsable de una tarea desde la UI actualiza correctamente `responsible` y `assignedAt`, y esto se refleja de inmediato en el detalle.

**Commit sugerido:** `feat(frontend): improve responsible reassignment ux`

**Definition of Done:** la reasignación de responsable es clara, funcional y coherente en toda la interfaz.

---

## FASE 6 — Dashboard y Experiencia de Usuario

**Objetivo de la fase:** enriquecer la experiencia de uso sobre el CRUD ya funcional, sin introducir nuevas entidades ni reglas de negocio.

### UX-01 — Dashboard resumen

**Objetivo:** construir una pantalla de dashboard con un resumen visual de las tareas existentes.

**Dependencias:** TASK-UI-11.

**Backend:** no aplica; el dashboard se construye reutilizando `GET /api/tasks` ya existente, salvo que se identifique una necesidad real de un endpoint agregado, la cual deberá proponerse y aprobarse antes de implementarse.

**Frontend:** crear la página de dashboard mostrando conteos de tareas por estado y por prioridad, calculados en el cliente a partir del listado ya disponible.

**Consideraciones técnicas:** evitar sobreingeniería; no crear endpoints nuevos si el cálculo puede resolverse razonablemente en el cliente con el volumen de datos esperado.

**Archivos esperados:** `frontend/src/pages/DashboardPage.jsx`.

**No implementar todavía:** filtros interactivos ni búsqueda; eso corresponde a UX-02.

**Validaciones:** el dashboard refleja correctamente los conteos reales de tareas por estado y prioridad.

**Commit sugerido:** `feat(frontend): add dashboard summary screen`

**Definition of Done:** dashboard funcional que resume el estado general de las tareas.

---

### UX-02 — Filtros y búsqueda de tareas

**Objetivo:** permitir filtrar y buscar tareas desde el listado.

**Dependencias:** UX-01.

**Backend:** no aplica, salvo que el volumen de datos justifique mover el filtrado al backend; en ese caso debe proponerse y aprobarse antes de implementarse.

**Frontend:** agregar controles de filtro por estado, prioridad y responsable, además de un campo de búsqueda por título, aplicados sobre el listado ya cargado en el cliente.

**Consideraciones técnicas:** mantener el filtrado como una operación derivada del estado ya cargado, sin duplicar lógica de obtención de datos.

**Archivos esperados:** actualización de `TasksListPage.jsx`, posible nuevo componente `TaskFilters.jsx`.

**No implementar todavía:** persistencia de filtros entre sesiones.

**Validaciones:** los filtros y la búsqueda devuelven resultados correctos y combinables entre sí.

**Commit sugerido:** `feat(frontend): add task filters and search`

**Definition of Done:** el listado de tareas puede filtrarse y buscarse de forma correcta y fluida.

---

### UX-03 — Estados de carga, error y vacío

**Objetivo:** asegurar que todas las pantallas de negocio manejen correctamente los estados de carga, error y listas vacías.

**Dependencias:** UX-02.

**Backend:** no aplica.

**Frontend:** revisar cada pantalla (identificación, listado, detalle, dashboard) e implementar de forma consistente los estados de carga, error y vacío definidos en los lineamientos de diseño de AGENTS.md.

**Consideraciones técnicas:** reutilizar componentes comunes (spinner, mensaje de error, estado vacío) en lugar de duplicar esta lógica en cada pantalla.

**Archivos esperados:** posibles nuevos componentes en `components/common/` (por ejemplo `LoadingState.jsx`, `EmptyState.jsx`, `ErrorState.jsx`), y ajustes en las páginas existentes.

**No implementar todavía:** cambios de diseño visual mayores; esta subfase es funcional, no estética.

**Validaciones:** simular condiciones de carga lenta, error de red y listas vacías, confirmando que cada pantalla responde adecuadamente.

**Commit sugerido:** `feat(frontend): standardize loading, error and empty states`

**Definition of Done:** todas las pantallas de negocio manejan de forma consistente los estados de carga, error y vacío.

---

### UX-04 — Diseño responsive

**Objetivo:** asegurar que toda la aplicación funcione correctamente en distintos tamaños de pantalla.

**Dependencias:** UX-03.

**Backend:** no aplica.

**Frontend:** revisar y ajustar con clases de Tailwind el layout, navegación, listado, formularios y dashboard para que se comporten correctamente en dispositivos móviles, tablets y escritorio.

**Consideraciones técnicas:** priorizar un enfoque mobile-first o al menos verificar exhaustivamente los puntos de quiebre principales, conforme al requisito de responsive definido en AGENTS.md.

**Archivos esperados:** ajustes de clases Tailwind en componentes y páginas existentes; no se esperan archivos nuevos significativos.

**No implementar todavía:** nuevas funcionalidades; esta subfase es exclusivamente de adaptación visual.

**Validaciones:** verificar manualmente la aplicación en al menos tres tamaños de viewport (móvil, tablet, escritorio) sin elementos rotos ni desbordados.

**Commit sugerido:** `style(frontend): improve responsive layout`

**Definition of Done:** la aplicación se visualiza y funciona correctamente en los tamaños de pantalla principales.

---

### UX-05 — Pulido visual final

**Objetivo:** aplicar los últimos detalles de experiencia de usuario definidos en AGENTS.md.

**Dependencias:** UX-04.

**Backend:** no aplica.

**Frontend:** revisar transiciones suaves, estados hover en botones, cursor `pointer` en todos los elementos interactivos, espaciados consistentes, bordes redondeados y sombras ligeras en toda la aplicación.

**Consideraciones técnicas:** este pulido no debe introducir nueva lógica funcional, únicamente mejoras visuales sobre lo ya construido.

**Archivos esperados:** ajustes de clases Tailwind distribuidos en los componentes existentes.

**No implementar todavía:** ninguna funcionalidad nueva.

**Validaciones:** revisión visual manual de cada pantalla confirmando coherencia con los lineamientos de diseño definidos.

**Commit sugerido:** `style(frontend): final visual polish`

**Definition of Done:** la interfaz cumple de forma consistente con los lineamientos visuales definidos en AGENTS.md.

---

## FASE 7 — Refactor y Calidad

**Objetivo de la fase:** revisar el proyecto completo en busca de acoplamiento, duplicación o desviaciones de la arquitectura definida, antes de la documentación final.

### REFACTOR-01 — Revisión de arquitectura backend

**Objetivo:** auditar el backend completo en busca de violaciones a la separación de capas o duplicación de lógica.

**Dependencias:** TASK-API-10.

**Backend:** revisar que routes, controllers, services y repositories mantengan sus responsabilidades exclusivas en los módulos `identity` y `tasks`; extraer utilidades comunes a `shared/` si se detecta duplicación entre módulos.

**Frontend:** no aplica.

**Consideraciones técnicas:** cualquier cambio de esta subfase no debe alterar el comportamiento funcional ya validado; es refactor puro, no nueva funcionalidad. Si se identifica una mejora arquitectónica no trivial, debe proponerse y esperar aprobación antes de aplicarse, conforme a los Principios de Desarrollo de AGENTS.md.

**Archivos esperados:** ajustes distribuidos en `backend/src/modules/` y `backend/src/shared/`.

**No implementar todavía:** cambios de comportamiento visibles para el usuario.

**Validaciones:** ejecutar nuevamente las pruebas funcionales de identidad y tareas confirmando que el comportamiento no cambió tras el refactor.

**Commit sugerido:** `refactor(backend): improve layer separation and remove duplication`

**Definition of Done:** backend libre de duplicaciones evidentes y alineado estrictamente con la arquitectura modular por capas definida.

---

### REFACTOR-02 — Revisión de arquitectura frontend

**Objetivo:** auditar el frontend completo en busca de componentes no reutilizables, lógica mezclada con UI o duplicación.

**Dependencias:** UX-05.

**Backend:** no aplica.

**Frontend:** revisar que los componentes mantengan tamaño reducido y responsabilidad única, que la lógica de datos esté desacoplada de la presentación, y extraer componentes o hooks reutilizables donde se detecte duplicación entre pantallas.

**Consideraciones técnicas:** al igual que en REFACTOR-01, no debe alterarse el comportamiento funcional ya validado. Cualquier cambio estructural relevante debe proponerse y aprobarse antes de aplicarse.

**Archivos esperados:** ajustes distribuidos en `frontend/src/components/`, `frontend/src/pages/`, `frontend/src/services/`.

**No implementar todavía:** cambios de comportamiento visibles para el usuario.

**Validaciones:** recorrer manualmente todos los flujos (identificación, CRUD de tareas, dashboard, filtros) confirmando que el comportamiento no cambió tras el refactor.

**Commit sugerido:** `refactor(frontend): improve component reuse and separation of concerns`

**Definition of Done:** frontend libre de duplicaciones evidentes, con componentes pequeños, reutilizables y desacoplados de la lógica de datos.

---

## FASE 8 — Documentación y Entrega

**Objetivo de la fase:** dejar el proyecto completamente documentado y listo para su entrega final.

### DOC-01 — README.md

**Objetivo:** documentar el proyecto para cualquier persona que necesite instalarlo y ejecutarlo.

**Dependencias:** REFACTOR-02.

**Backend:** no aplica directamente; el contenido documenta lo ya construido en backend.

**Frontend:** no aplica directamente; el contenido documenta lo ya construido en frontend.

**Consideraciones técnicas:** el README debe describir el propósito del proyecto, instrucciones de instalación y ejecución de backend y frontend, variables de entorno requeridas (sin valores reales) y el alcance funcional real del proyecto, sin inventar funcionalidades no implementadas.

**Archivos esperados:** `README.md` (raíz, reemplazando el placeholder de INIT-01).

**No implementar todavía:** el AI_JOURNAL, que corresponde a DOC-02.

**Validaciones:** seguir el README desde cero en un entorno limpio y confirmar que el proyecto puede instalarse y ejecutarse siguiendo únicamente esas instrucciones.

**Commit sugerido:** `docs: write project readme`

**Definition of Done:** README completo, preciso y suficiente para instalar y ejecutar el proyecto sin ayuda adicional.

---

### DOC-02 — AI_JOURNAL.md

**Objetivo:** documentar el proceso de desarrollo asistido por IA a lo largo del proyecto.

**Dependencias:** DOC-01.

**Backend:** no aplica.

**Frontend:** no aplica.

**Consideraciones técnicas:** el journal debe registrar de forma honesta las decisiones técnicas relevantes tomadas durante el desarrollo, los puntos en los que se pidió aprobación al desarrollador, y cualquier desviación o ajuste respecto al roadmap original, si la hubo.

**Archivos esperados:** `AI_JOURNAL.md` (raíz).

**No implementar todavía:** nada adicional; esta subfase es puramente documental.

**Validaciones:** el journal refleja de forma coherente el historial real de decisiones del proyecto.

**Commit sugerido:** `docs: add ai development journal`

**Definition of Done:** AI_JOURNAL.md completo y coherente con el desarrollo real del proyecto.

---

### DOC-03 — Revisión final y checklist de entrega

**Objetivo:** confirmar que el proyecto completo cumple con todos los requisitos funcionales y no funcionales definidos en el documento de análisis y en AGENTS.md antes de la entrega.

**Dependencias:** DOC-02.

**Backend:** verificar que todos los requisitos funcionales (RF-01 a RF-13) y no funcionales (RNF-01 a RNF-10) estén cubiertos.

**Frontend:** verificar que la interfaz cubra todos los casos de uso definidos (CU-01 a CU-07) y los lineamientos de diseño establecidos.

**Consideraciones técnicas:** esta subfase no introduce cambios funcionales; es un checklist de verificación final contra el documento de análisis y AGENTS.md.

**Archivos esperados:** ninguno nuevo; posible actualización menor de README.md o AI_JOURNAL.md si la revisión detecta omisiones documentales.

**No implementar todavía:** no aplica; es la última subfase del roadmap.

**Validaciones:** recorrer manualmente cada requisito funcional, no funcional y caso de uso, confirmando su cumplimiento explícito.

**Commit sugerido:** `chore: final review before delivery`

**Definition of Done:** proyecto completo, funcional, documentado y verificado contra la totalidad de los requisitos definidos en los documentos de contexto.

---

## Cierre

Con la finalización de DOC-03 el proyecto queda listo para su entrega. Ninguna subfase de este roadmap debe ejecutarse sin la aprobación previa del desarrollador sobre la subfase inmediatamente anterior.
