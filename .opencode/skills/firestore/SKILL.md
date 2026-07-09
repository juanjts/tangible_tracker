# Firestore

## Objetivo

Utilizar Firestore de forma eficiente aprovechando su modelo documental.

## Reglas

- Diseñar documentos autocontenidos cuando aporte valor.
- Minimizar lecturas innecesarias.
- Utilizar desnormalización de forma controlada.
- Mantener colecciones simples.
- Guardar timestamps para auditoría.
- Consultar únicamente la información necesaria.
- Mantener nombres de colecciones consistentes.
- Centralizar el acceso a Firestore en los Repositories.
- Validar la existencia de documentos relacionados.
- Optimizar las consultas más frecuentes.

## Nunca

- Acceder a Firestore fuera de los Repositories.
- Realizar consultas repetidas innecesarias.
- Duplicar información sin justificación.
- Depender de múltiples consultas para mostrar una tarea.
- Mezclar lógica de negocio con acceso a datos.

## Checklist

- ¿La consulta es eficiente?
- ¿Se redujeron las lecturas?
- ¿El documento es autocontenido?
- ¿La lógica permanece fuera del Repository?
- ¿Se respetó el modelo documental?
