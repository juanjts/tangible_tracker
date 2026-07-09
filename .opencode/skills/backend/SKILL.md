# Backend

## Objetivo

Desarrollar un backend limpio, modular y escalable utilizando Node.js, Express y Firestore.

## Reglas

- Implementar una API REST siguiendo la arquitectura por capas.
- Mantener el flujo: Routes → Controllers → Services → Repositories.
- Los Controllers solo gestionan la petición y la respuesta HTTP.
- Los Services contienen toda la lógica de negocio.
- Los Repositories son el único punto de acceso a Firestore.
- Validar todas las entradas antes de ejecutar la lógica de negocio.
- Centralizar el manejo de errores mediante middlewares.
- Utilizar variables de entorno para toda configuración sensible.
- Mantener respuestas HTTP consistentes.
- Reutilizar servicios y utilidades antes de crear nuevas implementaciones.
- Mantener los módulos independientes y con bajo acoplamiento.

## Nunca

- Acceder a Firestore desde Controllers.
- Implementar lógica de negocio en Routes o Controllers.
- Duplicar consultas a Firestore.
- Hardcodear configuraciones o credenciales.
- Retornar errores sin un formato consistente.

## Checklist

- ¿Se respetó la arquitectura por capas?
- ¿La lógica está en el Service?
- ¿El Repository es el único acceso a Firestore?
- ¿Las validaciones son suficientes?
- ¿La respuesta HTTP es consistente?
