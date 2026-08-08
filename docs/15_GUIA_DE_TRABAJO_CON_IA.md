# Guía de trabajo con la IA

## Primera instrucción

Antes de comenzar a programar:

1. Lee `README.md`.
2. Lee todos los documentos de `docs/`.
3. Resume tu comprensión del proyecto.
4. Identifica posibles contradicciones.
5. Propón la estructura inicial del proyecto.
6. No implementes todavía las pantallas hasta que se confirme la estructura.

## Desarrollo por fases

Trabaja siguiendo `13_ROADMAP.md`.

No implementes varias fases grandes simultáneamente salvo que se solicite expresamente.

## Para cada tarea

Antes de modificar:

- identifica archivos afectados;
- comprueba componentes existentes;
- comprueba modelos;
- comprueba servicios;
- comprueba reglas de negocio.

Después:

- ejecuta las comprobaciones disponibles;
- corrige errores;
- indica qué se ha realizado.

## Ejemplo de petición

```text
Implementa la Fase 5 del roadmap.

Antes de programar revisa las reglas de negocio relacionadas con la
selección de vacaciones.

Utiliza los datos mock existentes.

No añadas backend ni nuevas dependencias salvo que sea imprescindible.
```

## Si falta información

No inventar una regla de negocio importante.

Para decisiones visuales, elegir una solución coherente con Bootstrap.

Para decisiones funcionales relevantes, solicitar aclaración.

## Prototipo

El objetivo es poder ejecutar y demostrar la aplicación.

No es necesario implementar aspectos propios de producción.

## Criterio de finalización

Una funcionalidad está terminada cuando:

- funciona visualmente;
- respeta las reglas;
- está tipada;
- no introduce errores;
- utiliza los componentes existentes cuando corresponda;
- puede probarse con los datos mock.
