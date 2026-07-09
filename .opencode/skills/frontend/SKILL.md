# Frontend

## Objetivo

Desarrollar una interfaz limpia, reutilizable, responsive y fácil de mantener utilizando React y Tailwind CSS.

## Reglas

- Crear componentes pequeños y con una única responsabilidad.
- Separar la lógica de negocio de la presentación.
- Mantener las llamadas HTTP en servicios, nunca en componentes reutilizables.
- Utilizar componentes reutilizables antes de crear nuevos.
- Mantener el estado lo más cercano posible a donde se utiliza.
- Evitar el prop drilling innecesario.
- Utilizar formularios controlados.
- Mostrar estados de carga, error y éxito cuando corresponda.
- Mantener una estructura consistente de carpetas y componentes.
- Diseñar siempre pensando primero en una buena experiencia de usuario.

## Nunca

- Mezclar lógica de negocio con la interfaz.
- Crear componentes excesivamente grandes.
- Duplicar código entre componentes.
- Realizar llamadas a la API directamente desde componentes de presentación.
- Hardcodear textos, estilos o datos reutilizables.

## Checklist

- ¿El componente tiene una única responsabilidad?
- ¿La lógica está separada de la UI?
- ¿El componente es reutilizable?
- ¿La interfaz es responsive?
- ¿La experiencia de usuario es clara y consistente?
