# Dashboard de administración

## Objetivo

Permitir al administrador analizar visualmente las planificaciones de varias personas para detectar coincidencias y ayudar en la toma de decisiones.

## Filtros

Como mínimo:

- Año.
- Departamento.
- Empleado.
- Estado.
- Fecha inicial.
- Fecha final.

Los filtros deben poder combinarse.

## Vista mensual

Mostrar una línea por empleado y los periodos de vacaciones sobre un calendario.

Ejemplo conceptual:

```text
                 JUNIO
Empleado       1 2 3 4 5 6 7 8 9 ...
Juan           █████████
Pedro                    ███████
Silvia              █████
Ernesto                    ███████
```

## Coincidencias

Cuando dos o más empleados tengan vacaciones en el mismo día laborable, debe destacarse visualmente.

La interfaz debe indicar el número de personas coincidentes.

Ejemplo:

```text
12/07/2026
3 empleados de vacaciones
```

## Vista trimestral

Debe poder agrupar visualmente:

- Enero-Marzo.
- Abril-Junio.
- Julio-Septiembre.
- Octubre-Diciembre.

## Interacción

El administrador debe poder seleccionar un empleado o periodo para abrir el detalle.

## Colores

Los colores deben utilizarse de forma coherente.

Se recomienda:

- Un color identificativo por empleado o por categoría.
- Un color claramente diferenciable para conflictos.
- Colores de estado coherentes con Bootstrap.

No utilizar colores excesivamente saturados.

## Importante

El dashboard es una herramienta de apoyo.

No debe aprobar o rechazar automáticamente una planificación por detectar coincidencias.
