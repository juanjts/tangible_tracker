# Architecture

## Objetivo

Mantener una arquitectura limpia, modular y escalable basada en Arquitectura por Capas.

## Reglas

- Toda funcionalidad debe pertenecer a un módulo.
- Organizar el proyecto por dominio, no por tipo de archivo.
- Respetar siempre el flujo: Routes → Controllers → Services → Repositories → Firestore.
- Los Controllers solo reciben peticiones y construyen respuestas HTTP.
- Toda la lógica de negocio debe implementarse en los Services.
- Los Repositories solo interactúan con Firestore.
- Ninguna capa debe acceder directamente a otra saltando el flujo definido.
- Reutilizar componentes y servicios antes de crear nuevos.
- Mantener bajo acoplamiento y alta cohesión.
- Crear módulos independientes y fácilmente extensibles.
- Utilizar nombres claros y consistentes para carpetas y archivos.
- Mantener una única responsabilidad por archivo siempre que sea posible.

## Nunca

- Implementar lógica de negocio en Controllers.
- Acceder a Firestore desde Controllers o componentes React.
- Duplicar lógica entre módulos.
- Crear dependencias circulares.
- Modificar la arquitectura sin justificar la decisión y solicitar aprobación.

## Checklist

- ¿La funcionalidad pertenece al módulo correcto?
- ¿Cada capa tiene una única responsabilidad?
- ¿Se respetó el flujo de datos?
- ¿La solución mantiene la arquitectura definida?
