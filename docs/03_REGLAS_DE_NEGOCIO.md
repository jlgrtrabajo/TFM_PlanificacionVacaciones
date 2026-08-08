# Reglas de negocio

## RN-01 - Año

La planificación pertenece a un año concreto.

## RN-02 - Vacaciones anuales

El prototipo parte de la premisa de que todos los empleados trabajan durante todo el año y disponen de 22 días laborables de vacaciones.

## RN-03 - Días laborables

Los días de vacaciones se contabilizan como días laborables.

Sábados y domingos no deben descontarse de los 22 días.

El calendario debe disponer de información que permita identificar si un día es laborable.

## RN-04 - Estados

Los estados de negocio son:

1. Pendiente.
2. Aprobado.
3. Rechazado.

No introducir otros estados de negocio salvo que sea necesario técnicamente y no se muestre como estado funcional.

## RN-05 - Planificación pendiente

Una planificación pendiente no debe poder editarse mientras espera la decisión del administrador.

## RN-06 - Aprobación

Una planificación aprobada queda bloqueada para edición.

## RN-07 - Rechazo

El administrador debe indicar un motivo al rechazar.

El motivo debe mostrarse posteriormente al empleado.

## RN-08 - Nueva planificación

Después de un rechazo, el empleado puede generar una nueva planificación.

La planificación anterior debe conservarse como antecedente en los datos mock.

## RN-09 - Nueva revisión

Una nueva planificación creada después de un rechazo deberá volver a pasar por revisión.

## RN-10 - Coincidencias

La aplicación debe detectar visualmente cuando varios empleados tienen vacaciones coincidentes.

Una coincidencia no implica automáticamente un rechazo.

El administrador decide si una coincidencia es aceptable o no.

## RN-11 - Motivo de rechazo

El motivo puede explicar, entre otras circunstancias, que varios empleados coinciden, que el departamento no puede quedar con determinados empleados ausentes simultáneamente u otra razón organizativa.

No implementar reglas automáticas que obliguen a rechazar por una coincidencia salvo que se definan expresamente en el futuro.

## RN-12 - Aprobador

La información de departamentos y aprobadores se representa mediante una relación de aprobador por departamento.

No utilizar la tabla `RelacionUserAprobadorUsers`.

## RN-13 - Usuario administrador

Los usuarios con perfil `AdminPlanifVacac` pueden acceder a las funciones de administración.

## RN-14 - Emails

Los cambios de estado deben simular una notificación al empleado y al administrador correspondiente.

No se enviarán emails reales.

## RN-15 - Datos históricos

Una planificación rechazada no debe desaparecer cuando se genera una nueva planificación.

## RN-16 - Validación de 22 días

El empleado no puede enviar una planificación que no cumpla el número de días requerido.

La interfaz debe impedir superar los 22 días.

Si se decide permitir guardar una selección incompleta como paso intermedio, no debe poder enviarse hasta completar los 22 días.

## RN-17 - Periodos

Los periodos deben tener fecha de inicio y fecha de fin válidas.

La fecha de fin no puede ser anterior a la fecha de inicio.

## RN-18 - Alcance de la validación

Las reglas complejas de disponibilidad del departamento no se automatizan en el prototipo salvo la detección y visualización de coincidencias.

La decisión final corresponde al administrador.
