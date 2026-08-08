# Requisitos funcionales

## RF-01 - Acceso

Debe existir una pantalla de login con usuario y contraseña.

La autenticación será simulada.

Para el prototipo se podrán utilizar los usuarios ficticios definidos en `09_DATOS_MOCK.md`.

El perfil del usuario determinará el modo de aplicación disponible. El perfil administrador podrá acceder como usuario y como administrador porque también tiene que realizar una planificación.

## RF-02 - Acceso de empleado

Si el usuario no es administrador de planificación, accederá al Portal del Empleado y a su pantalla de planificación anual de vacaciones.

## RF-03 - Acceso de administrador

Si el usuario es administrador de planificación, podrá elegir entre:

- Portal de planificación de vacaciones.
- Administración de la planificación.

## RF-04 - Planificación anual

El empleado debe poder seleccionar sus días de vacaciones del año.

El prototipo parte de 22 días laborables de vacaciones por empleado y año.

La interfaz debe mostrar claramente:

- Año.
- Días disponibles.
- Días seleccionados.
- Días restantes.
- Periodos seleccionados.
- Estado de la planificación.

## RF-05 - Calendario

La planificación se realizará mediante una interfaz de calendario.

El calendario debe distinguir visualmente:

- Días laborables.
- Sábados y domingos.
- Días seleccionados.
- Días no seleccionables cuando corresponda.
- Días que generen coincidencias/conflictos cuando se visualice la planificación global.

## RF-06 - Periodos

La selección de vacaciones debe poder representar periodos continuos mediante fecha de inicio y fecha de fin.

El sistema deberá calcular los días laborables incluidos en cada periodo.

La suma de los periodos debe permitir comprobar los 22 días anuales.

## RF-07 - Envío

El empleado debe poder enviar su planificación.

Al enviarla, pasa al estado `Pendiente`.

El prototipo debe mostrar una confirmación de que se ha realizado el envío.

También debe simular la notificación por email.

## RF-08 - Planificación pendiente

Cuando existe una planificación pendiente del año:

- Debe mostrarse su información.
- La edición de la planificación debe quedar deshabilitada.
- Debe mostrarse claramente que está pendiente de revisión.

## RF-09 - Administración

El administrador debe poder consultar las planificaciones de los empleados de los departamentos que gestione.

Debe poder:

- Filtrar empleados.
- Filtrar fechas.
- Consultar estados.
- Consultar el calendario.
- Analizar coincidencias.
- Abrir el detalle de una planificación.

## RF-10 - Revisión

El administrador podrá seleccionar una planificación pendiente y:

- Aprobarla.
- Rechazarla.

## RF-11 - Aprobación

Al aprobar una planificación:

- El estado pasa a `Aprobado`.
- Se registra visualmente el administrador que la ha aprobado.
- Se registra visualmente la fecha de aprobación.
- La edición queda deshabilitada.
- Se simula el envío de una notificación.

## RF-12 - Rechazo

Al rechazar una planificación:

- El administrador debe introducir un motivo.
- El estado pasa a `Rechazado`.
- El motivo queda asociado a la planificación.
- Se simula el envío de una notificación.
- El empleado puede generar una nueva planificación.

## RF-13 - Nueva planificación después del rechazo

Una planificación rechazada se conserva como antecedente.

El empleado puede crear una nueva planificación para el mismo año.

El nuevo registro vuelve a quedar pendiente al enviarse.

El prototipo debe poder mostrar el histórico de planificaciones del empleado para ese año cuando sea útil.

## RF-14 - Dashboard

El administrador debe disponer de una vista que permita analizar la planificación de varias personas.

Debe poder visualizar:

- Personas.
- Fechas.
- Periodos de vacaciones.
- Coincidencias.
- Número de personas coincidentes en una fecha o periodo.
- Calendarios de varias personas.

La visualización podrá realizarse por meses o por trimestres.

## RF-15 - Datos simulados

Todos los datos deben proceder de mocks.

No se deben realizar llamadas HTTP a un backend real.

## RF-16 - Notificaciones

Los emails se simularán.

El prototipo puede mostrar un mensaje de éxito y/o un panel de notificaciones simuladas.

No se debe intentar enviar correo real.
