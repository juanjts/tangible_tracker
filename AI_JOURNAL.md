# AI_JOURNAL.md

## Sistema de Gestión de Incidencias y Tareas

Este documento recoge un análisis honesto del uso de herramientas de Inteligencia Artificial durante el desarrollo de este proyecto: qué asistentes se usaron, con qué objetivo, un caso concreto en el que la propuesta generada por IA no se ajustó completamente a lo que el proyecto necesitaba, y cómo fue resuelto.

---

## 1. Herramientas y Enfoque

Durante el desarrollo del proyecto se utilizó más de un asistente de IA, cada uno en una etapa distinta del flujo de trabajo:

- **ChatGPT** — utilizado en la etapa inicial para construir el contexto y el documento de análisis del proyecto de software (objetivos, alcance, requisitos funcionales y no funcionales, modelo de dominio, reglas de negocio, arquitectura, etc.). Este documento es el que se anexa al correo donde se comparte el resultado final del proyecto.
- **Claude Sonnet 5** — utilizado para transformar ese documento de análisis en un plan de desarrollo completo (`PROJECTROADMAP.md`), estructurado en fases y subfases incrementales. Se eligió Sonnet 5 por ser, dentro de las opciones gratuitas disponibles, el modelo con mejor capacidad de planeación de proyectos de software según mi criterio. En un escenario con plan pago, la elección más probable habría sido un modelo de frontera como Opus o Fable, por su mayor capacidad de razonamiento y planeación.
- **OpenCode con el modelo "Big Pickle"** (gratuito) — utilizado para la ejecución del plan, es decir, para la escritura real del código siguiendo `PROJECTROADMAP.md` y `PLANNING.md`. Se eligió este modelo porque, al contar ya con un plan estructurado generado por un modelo de mayor razonamiento, un modelo más económico es suficiente para ejecutar pasos bien definidos sin incurrir en costos. En un escenario con plan pago, se habría considerado usar Opus 4.6, aunque por razones de costo probablemente se habría optado por DeepSeek.

### Enfoque general de los prompts

**Para la generación del análisis y el plan (ChatGPT y Claude):**
Los prompts se estructuraron bajo el patrón **Rol + Objetivo**. Por ejemplo, para el documento de análisis: *"Toma el rol de un desarrollador Full Stack Senior con amplia experiencia en levantamiento de requisitos y planeación de proyectos de software"* como rol, y *"crear un documento de análisis y desarrollo de un proyecto de software que contenga casos de uso, historias de usuario, modelo de datos, arquitectura modular por capas, etc."* como objetivo. Para la generación del plan de desarrollo se usó el mismo patrón, entregando además el documento de análisis completo como contexto, de forma que el plan resultante (`PROJECTROADMAP.md`) quedara alineado con los requisitos ya definidos y no se basara en suposiciones del modelo.

**Para la ejecución del código (OpenCode / Big Pickle):**
Los prompts durante la escritura de código siguen estrictamente el plan ya generado, avanzando **una fase o subfase a la vez**, siempre bajo supervisión directa:

- Cada fase y subfase debe completarse bajo mi supervisión antes de continuar con la siguiente.
- Si surgen dudas sobre la subfase actual, se consultan antes de avanzar.
- Si surgen sugerencias o mejoras, se exponen al modelo para ajustar el plan antes de ejecutar cualquier cambio de código.
- Se trabaja en modo "plan" de OpenCode para cada paso: antes de ejecutar cambios, se genera un plan específico para completar ese paso puntual, apoyándose en el contexto amplio que ya provee `PROJECTROADMAP.md` y `PLANNING.md`.
- El flujo de la IA ejecutora se controla de forma activa: se le indica explícitamente qué paso realizar, se acuerda un plan para ese paso, y solo después se autoriza la ejecución de cambios.

Este enfoque busca que la IA nunca improvise ni se adelante a fases futuras, y que cada incremento de código sea revisado antes de aprobarse, tal como lo exige el propio `AGENTS.md` del proyecto.

---

## 2. Análisis de Errores/Alucinaciones

Hasta el momento, en esta etapa temprana del desarrollo, se ha identificado un caso relevante. No se trata de un error de lógica de negocio ni de una falla de seguridad, sino de una **propuesta de la IA que no se adaptaba completamente al flujo de trabajo esperado para el proyecto**, específicamente en `server.js`.

Al implementar la subfase de inicialización del backend (arranque del servidor Express), la IA generó el siguiente código:

```javascript
require('dotenv/config');
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

El código es funcional y arranca el servidor correctamente, pero no incluye ninguna verificación automática del estado de salud del servidor al levantarse. Esto obligaba a comprobar manualmente que el backend estuviera realmente operativo, abriendo el endpoint `/health` en el navegador o ejecutando una petición manual con curl/Postman cada vez que se levantaba el servidor durante el desarrollo. Para un flujo de trabajo donde se van completando subfases de forma incremental y frecuente, esto representa una fricción innecesaria: la propuesta de la IA cubría el requisito funcional mínimo, pero no se adaptaba a la necesidad real de tener retroalimentación inmediata del estado del servidor en cada arranque.

---

## 3. Resolución Técnica

El problema no se manifestó como un error en consola ni como un fallo al ejecutar el proyecto; fue detectado al revisar manualmente el código generado y compararlo contra la necesidad práctica de confirmar rápidamente, en cada arranque del backend, que el servidor y el endpoint de salud estuvieran respondiendo correctamente, sin depender de una verificación manual externa.

El ajuste manual implementado fue agregar una verificación automática del endpoint `/health` inmediatamente después de que el servidor confirma que está escuchando, usando el módulo nativo `http` de Node.js:

```javascript
require('dotenv/config');
const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  http.get(`http://localhost:${PORT}/health`, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log(`Health check: ${data}`));
  }).on('error', () => console.log('Health check: failed'));
});
```

Con este cambio, cada vez que el servidor arranca, se dispara automáticamente una petición interna al endpoint `/health` y se imprime en consola el resultado (`Health check: ...`) o el fallo (`Health check: failed`), sin necesidad de abrir el navegador ni ejecutar herramientas externas. Al colocarse dentro del callback de `app.listen()`, la petición solo se dispara una vez que Express ya confirmó que está escuchando en el puerto configurado, evitando condiciones de carrera contra un servidor que aún no está listo.

Por el momento este ajuste se hizo de forma puntual y manual, ya que el proyecto se encuentra en una fase temprana del desarrollo. Sin embargo, se identificaron dos acciones pendientes para evitar que este mismo vacío se repita en instrucciones futuras a la IA:

- Agregar una entrada en `AGENTS.md` (o una skill dedicada) que indique explícitamente que todo servicio que se levante debe reportar su estado de salud de forma automática en consola al arrancar, para que este comportamiento se tenga en cuenta desde el inicio en futuras subfases y no dependa de una corrección posterior.
- Tener en cuenta, más adelante en el roadmap (en la subfase correspondiente al middleware de métricas de rendimiento), que ya existe un formato recomendado y ya definido en `AGENTS.md` para el registro de logs de cada petición HTTP (`[MÉTRICA] MÉTODO RUTA - Xms`), de manera que cualquier logging adicional que se agregue sea consistente con ese estándar y no introduzca formatos de registro divergentes dentro del proyecto.

Hasta ahora este hallazgo no ha modificado la forma general de construir los prompts para la IA ejecutora, pero sí deja como acción concreta de mejora continua actualizar `AGENTS.md` para que este tipo de comportamiento (verificación de salud al arrancar, consistencia en el formato de logs) se solicite de forma explícita desde el principio, en lugar de corregirse de forma reactiva.
