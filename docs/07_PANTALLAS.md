# Pantallas

## 1. Login

### Objetivo

Simular el acceso a la aplicación.

### Elementos

- Usuario.
- Contraseña.
- Botón Entrar.
- Mensaje de error para credenciales incorrectas.

Para facilitar las pruebas puede incluirse una ayuda con usuarios demo.

---

## 2. Selector de modo de administrador

Solo para `AdminPlanifVacac`.

Opciones:

- Portal de planificación.
- Administración de planificación.

---

## 3. Portal del empleado

Debe mostrar:

- Nombre del empleado.
- Año.
- Estado actual.
- Resumen de días.
- Calendario.
- Periodos seleccionados.
- Acciones disponibles.

---

## 4. Selección de vacaciones

La interfaz debe permitir seleccionar periodos.

Debe mostrar:

- Calendario anual o mensual.
- Días laborables.
- Días seleccionados.
- Total seleccionado.
- Total restante.
- Botón guardar.
- Botón enviar.

El diseño debe hacer evidente que el usuario debe seleccionar 22 días laborables.

---

## 5. Planificación pendiente

Cuando el estado sea `Pendiente`:

- Mostrar los periodos.
- Mostrar los 22 días.
- Mostrar fecha de envío si está disponible.
- Deshabilitar edición.
- Mostrar que está pendiente de revisión.

---

## 6. Planificación rechazada

Mostrar:

- Estado rechazado.
- Motivo del rechazo.
- Planificación anterior.
- Acción para crear nueva planificación.

---

## 7. Planificación aprobada

Mostrar:

- Estado aprobado.
- Administrador.
- Fecha de aprobación.
- Periodos.
- Días totales.

Deshabilitar edición.

---

## 8. Administración

Debe incluir:

- Filtros.
- Lista de empleados/planificaciones.
- Estado.
- Rango de fechas.
- Acceso al detalle.
- Acciones de aprobar/rechazar.

---

## 9. Detalle de planificación

Mostrar:

- Empleado.
- Departamento.
- Año.
- Periodos.
- Días totales.
- Estado.
- Observaciones.
- Motivo de rechazo si existe.
- Aprobador si existe.
- Fecha de aprobación si existe.

Para una planificación pendiente:

- Aprobar.
- Rechazar.

---

## 10. Dashboard

Debe mostrar una visión global.

Incluir:

- Filtros.
- Calendario de varias personas.
- Vista mensual.
- Vista trimestral.
- Identificación visual de coincidencias.
- Número de empleados coincidentes.
- Acceso al detalle.

---

## 11. Notificaciones simuladas

Puede existir un componente/panel para visualizar las notificaciones simuladas producidas por:

- Envío de planificación.
- Aprobación.
- Rechazo.

No se enviarán emails reales.
