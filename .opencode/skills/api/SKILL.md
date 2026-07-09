# API

## Objetivo

Diseñar una API REST consistente, predecible y fácil de consumir.

## Reglas

- Utilizar principios REST.
- Nombrar endpoints utilizando recursos.
- Utilizar correctamente los métodos HTTP.
- Mantener respuestas consistentes.
- Utilizar códigos HTTP adecuados.
- Validar siempre la entrada antes de procesarla.
- Mantener mensajes de error claros.
- Evitar exponer información innecesaria.
- Mantener los endpoints simples y predecibles.
- Documentar brevemente cualquier decisión no evidente.

## Nunca

- Mezclar responsabilidades en un endpoint.
- Utilizar verbos en las rutas.
- Retornar errores sin contexto.
- Cambiar el formato de las respuestas entre endpoints.
- Exponer información sensible.

## Checklist

- ¿El endpoint sigue REST?
- ¿El código HTTP es correcto?
- ¿La respuesta mantiene el formato definido?
- ¿Las validaciones son suficientes?
- ¿El endpoint es fácil de entender?
