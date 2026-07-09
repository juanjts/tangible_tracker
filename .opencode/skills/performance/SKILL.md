# Performance

## Objetivo

Mantener una aplicación eficiente y preparada para soportar aproximadamente 50 solicitudes por segundo.

## Reglas

- Evitar consultas innecesarias a Firestore.
- Reutilizar datos cuando sea posible.
- Mantener funciones y componentes ligeros.
- Registrar el tiempo de todas las peticiones mediante middleware.
- Optimizar únicamente cuando exista una necesidad real.
- Reducir renderizados innecesarios en React.
- Evitar procesamiento repetitivo.
- Mantener respuestas rápidas y simples.
- Priorizar la simplicidad sobre optimizaciones prematuras.
- Medir antes de optimizar.

## Nunca

- Realizar múltiples consultas cuando una sea suficiente.
- Optimizar sin evidencia.
- Bloquear el flujo de la aplicación con operaciones costosas.
- Ignorar las métricas de rendimiento.
- Introducir complejidad innecesaria.

## Checklist

- ¿La consulta es eficiente?
- ¿Se registran las métricas?
- ¿Se evitaron renderizados innecesarios?
- ¿El cambio mantiene un buen rendimiento?
- ¿La solución sigue siendo simple?
