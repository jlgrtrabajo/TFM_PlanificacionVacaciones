# Datos mock

## Objetivo

Crear datos ficticios suficientes para demostrar todos los flujos.

## Año

Utilizar inicialmente 2026 como año de demostración.

El año debe estar centralizado en una constante para poder cambiarlo fácilmente.

## Usuarios

Utilizar los 13 usuarios indicados en `06_USUARIOS_Y_ROLES.md`.

## Planificaciones

Crear varias planificaciones para cubrir los escenarios:

### Caso 1 - Pendiente normal

Una planificación con 22 días y estado `PENDING`.

### Caso 2 - Aprobada

Una planificación con 22 días y estado `APPROVED`.

Debe incluir:

- Aprobador.
- Fecha de aprobación.

### Caso 3 - Rechazada

Una planificación con 22 días y estado `REJECTED`.

Debe incluir un motivo.

### Caso 4 - Rechazada con nueva planificación

Para un empleado debe existir:

- Planificación histórica rechazada.
- Nueva planificación pendiente.

Esto demuestra el flujo de nueva planificación.

### Caso 5 - Coincidencia

Al menos dos empleados deben tener periodos coincidentes.

Preferiblemente crear varios grados:

- Dos personas coinciden.
- Tres o más personas coinciden.

Esto permitirá probar el dashboard.

## Datos de calendario

Generar o definir datos suficientes para todo el año 2026.

Cada día debe poder identificarse como:

- Laborable.
- No laborable.

Los fines de semana deben ser no laborables.

Se pueden añadir festivos ficticios o una lista de festivos de demostración si resulta necesario para probar el calendario.

## Importante

Los datos mock deben ser fáciles de modificar.

Separar:

- Usuarios.
- Perfiles.
- Departamentos.
- Aprobadores.
- Calendario.
- Planificaciones.
- Emails simulados.

## Persistencia durante la demo

No existe persistencia real.

Para que una demo sea cómoda, se puede mantener el estado en memoria mientras la aplicación está abierta.

Opcionalmente se puede utilizar `localStorage` únicamente si facilita la demostración, pero no debe presentarse como persistencia de producción.

## Datos reproducibles

Al recargar la aplicación, debe existir una forma sencilla de volver a los datos iniciales de demostración.
