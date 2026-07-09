# Security

## Objetivo

Aplicar buenas prácticas de seguridad sin añadir complejidad innecesaria al proyecto.

## Reglas

- Validar todas las entradas del usuario.
- Utilizar variables de entorno para configuraciones sensibles.
- Nunca confiar en datos enviados por el frontend.
- Asignar el owner únicamente desde el backend.
- Validar que el responsible exista antes de guardar una tarea.
- Manejar errores sin exponer información sensible.
- Sanitizar los datos cuando sea necesario.
- Limitar el acceso a Firestore mediante la API.
- Mantener configuraciones fuera del código fuente.
- Seguir el principio de mínimo privilegio.

## Nunca

- Hardcodear credenciales.
- Exponer secretos.
- Confiar en IDs enviados sin validación.
- Permitir que el frontend defina el owner.
- Mostrar información interna en mensajes de error.

## Checklist

- ¿Las entradas fueron validadas?
- ¿Los datos sensibles están protegidos?
- ¿El owner se asigna en el backend?
- ¿El responsible fue validado?
- ¿La respuesta evita exponer información sensible?
