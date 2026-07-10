# AI_JOURNAL.md

## Sistema de Gestión de Incidencias y Tareas

Este documento recoge un análisis honesto del uso de herramientas de Inteligencia Artificial durante el desarrollo de este proyecto: qué asistentes se usaron, con qué objetivo, un caso concreto en el que la propuesta generada por IA no se ajustó completamente a lo que el proyecto necesitaba, y cómo fue resuelto.

---

## 1. Herramientas y Enfoque

Durante el desarrollo del proyecto se utilizó más de un asistente de IA, cada uno en una etapa distinta del flujo de trabajo:

- **ChatGPT** — utilizado en la etapa inicial para construir el contexto y el documento de análisis del proyecto de software (objetivos, alcance, requisitos funcionales y no funcionales, modelo de dominio, reglas de negocio, arquitectura, etc.). Este documento es el que se anexa al correo donde se comparte el resultado final del proyecto.
- **Claude Sonnet 5** — utilizado para transformar ese documento de análisis en un plan de desarrollo completo (`PROJECT_ROADMAP.md`), estructurado en fases y subfases incrementales. Se eligió Sonnet 5 por ser, dentro de las opciones gratuitas disponibles, el modelo con mejor capacidad de planeación de proyectos de software según mi criterio. En un escenario con plan pago, la elección más probable habría sido un modelo de frontera como Opus o Fable, por su mayor capacidad de razonamiento y planeación.
- **OpenCode con el modelo "Big Pickle"** (gratuito) — utilizado para la ejecución del plan, es decir, para la escritura real del código siguiendo `PROJECT_ROADMAP.md` y `PLANNING.md`. Se eligió este modelo porque, al contar ya con un plan estructurado generado por un modelo de mayor razonamiento, un modelo más económico es suficiente para ejecutar pasos bien definidos sin incurrir en costos. En un escenario con plan pago, se habría considerado usar Opus 4.6, aunque por razones de costo probablemente se habría optado por DeepSeek.

### Enfoque general de los prompts

**Para la generación del análisis y el plan (ChatGPT y Claude):**
Los prompts se estructuraron bajo el patrón **Rol + Objetivo**. Por ejemplo, para el documento de análisis: *"Toma el rol de un desarrollador Full Stack Senior con amplia experiencia en levantamiento de requisitos y planeación de proyectos de software"* como rol, y *"crear un documento de análisis y desarrollo de un proyecto de software que contenga casos de uso, historias de usuario, modelo de datos, arquitectura modular por capas, etc."* como objetivo. Para la generación del plan de desarrollo se usó el mismo patrón, entregando además el documento de análisis completo como contexto, de forma que el plan resultante (`PROJECT_ROADMAP.md`) quedara alineado con los requisitos ya definidos y no se basara en suposiciones del modelo.

**Para la ejecución del código (OpenCode / Big Pickle):**
Los prompts durante la escritura de código siguen estrictamente el plan ya generado, avanzando **una fase o subfase a la vez**, siempre bajo supervisión directa:

- Cada fase y subfase debe completarse bajo mi supervisión antes de continuar con la siguiente.
- Si surgen dudas sobre la subfase actual, se consultan antes de avanzar.
- Si surgen sugerencias o mejoras, se exponen al modelo para ajustar el plan antes de ejecutar cualquier cambio de código.
- Se trabaja en modo "plan" de OpenCode para cada paso: antes de ejecutar cambios, se genera un plan específico para completar ese paso puntual, apoyándose en el contexto amplio que ya provee `PROJECT_ROADMAP.md` y `PLANNING.md`.
- El flujo de la IA ejecutora se controla de forma activa: se le indica explícitamente qué paso realizar, se acuerda un plan para ese paso, y solo después se autoriza la ejecución de cambios.

Este enfoque busca que la IA nunca improvise ni se adelante a fases futuras, y que cada incremento de código sea revisado antes de aprobarse, tal como lo exige el propio `AGENTS.md` del proyecto.

---

## 2. Análisis de Errores/Alucinaciones

### Caso 1 — Verificación de salud al arrancar

Al implementar INIT-02, la IA generó `server.js` sin verificación automática del endpoint `/health`, obligando a comprobaciones manuales externas en cada arranque del servidor.

**Código problemático:**
```javascript
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

**Solución:** agregar auto-verificación con `http.get()` dentro del callback de `app.listen()`.

---

### Caso 2 — Race condition en identityService

Al implementar TASK-API-02, el método `identify()` ejecutaba `findByEmail` y `create` como operaciones separadas, generando una condición TOCTOU: si N peticiones llegan simultáneamente con el mismo email nuevo, todas ven que no existe y crean documentos duplicados en Firestore. Para 10 peticiones simultáneas de prueba se verificó que se creaban usuarios duplicados.

**Código problemático:**
```javascript
const existingUser = await userRepository.findByEmail(email);
if (existingUser) return existingUser;
const newUser = await userRepository.create({ email });
return newUser;
```

**Solución:** reemplazar por transacción atómica con `db.runTransaction()` que lee y escribe dentro de una sola operación. Firestore garantiza que solo una transacción completa la escritura; las demás reintentan automáticamente y en el reintento encuentran el usuario ya creado.

---

## 3. Resolución Técnica

### Caso 1 — Verificación de salud al arrancar

Se agregó auto-verificación del endpoint `/health` dentro del callback de `app.listen()`:

```javascript
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  http.get(`http://localhost:${PORT}/health`, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log(`Health check: ${data}`));
  }).on('error', () => console.log('Health check: failed'));
});
```

**Acción futura:** documentar en `AGENTS.md` que todo servicio debe reportar su estado de salud automáticamente al arrancar.

---

### Caso 2 — Race condition en identityService

Se reemplazó el flujo secuencial `findByEmail → create` por una transacción atómica con `db.runTransaction()`, que lee y escribe dentro de una sola operación. Firestore garantiza atomicidad: solo una transacción completa la escritura, las demás reintentan automáticamente y retornan el usuario ya existente.

**Código implementado:**
```javascript
async function identify({ email }) {
  // validación...
  return await db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(
      db.collection('users').where('email', '==', email).limit(1)
    );

    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    }

    const docRef = db.collection('users').doc();
    transaction.set(docRef, {
      email,
      createdAt: FieldValue.serverTimestamp(),
    });

    return { id: docRef.id, email, createdAt: null };
  });
}
```

**Pruebas realizadas:**
- 10 peticiones simultáneas con el **mismo email** → 1 único usuario creado ✅
- 10 peticiones simultáneas con **10 emails diferentes** → 10 usuarios creados ✅
