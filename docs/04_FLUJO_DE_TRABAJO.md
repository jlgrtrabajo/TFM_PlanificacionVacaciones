# Flujo de trabajo

## 1. Flujo general

```text
LOGIN
  |
  +--> Usuario empleado
  |       |
  |       v
  |   Planificación anual
  |       |
  |       v
  |   Selección de 22 días
  |       |
  |       v
  |   Enviar
  |       |
  |       v
  |   PENDIENTE
  |
  +--> Administrador
          |
          v
      Administración
          |
          v
      Revisar planificación
          |
       +--+--+
       |     |
       v     v
    APROBAR RECHAZAR
       |     |
       |     v
       |   Motivo
       |     |
       |     v
       |  RECHAZADO
       |     |
       |     v
       |  Nueva planificación
       |     |
       |     v
       |  PENDIENTE
       |
       v
    APROBADO
```

## 2. Flujo empleado - primera planificación

1. El usuario accede mediante login simulado.
2. El sistema identifica que es un usuario normal.
3. Accede a la planificación anual.
4. Consulta el calendario.
5. Selecciona sus días de vacaciones.
6. La interfaz muestra el número de días seleccionados.
7. Cuando alcanza los 22 días laborables puede enviar la planificación.
8. Al enviar, la planificación pasa a `Pendiente`.
9. La edición queda deshabilitada.
10. Se muestra una confirmación.
11. Se simula el email al usuario y al aprobador.

## 3. Flujo administrador - aprobación

1. El administrador inicia sesión.
2. Selecciona Administración de la planificación.
3. Consulta las planificaciones pendientes.
4. Puede utilizar filtros.
5. Consulta el calendario global.
6. Puede detectar coincidencias.
7. Abre una planificación.
8. Pulsa aprobar.
9. El sistema cambia el estado a `Aprobado`.
10. Se muestra el administrador y fecha de aprobación.
11. La planificación queda bloqueada.
12. Se simula la notificación.

## 4. Flujo administrador - rechazo

1. El administrador abre una planificación pendiente.
2. Revisa la planificación.
3. Decide rechazarla.
4. Introduce el motivo.
5. Confirma el rechazo.
6. El estado pasa a `Rechazado`.
7. Se conserva el motivo.
8. Se simula la notificación.

## 5. Flujo empleado - planificación rechazada

1. El empleado accede.
2. Consulta que su planificación anterior está rechazada.
3. Consulta el motivo.
4. Puede iniciar una nueva planificación.
5. La planificación anterior permanece como histórico.
6. Selecciona nuevamente los 22 días.
7. Envía la nueva planificación.
8. La nueva planificación queda `Pendiente`.

## 6. Flujo dashboard

1. El administrador accede al dashboard.
2. Selecciona año.
3. Puede seleccionar departamento.
4. Puede filtrar empleados.
5. Puede seleccionar un rango de fechas.
6. Consulta el calendario de varias personas.
7. La aplicación destaca coincidencias.
8. El administrador puede abrir el detalle correspondiente.

## 7. Decisiones que corresponden al administrador

La aplicación no debe decidir automáticamente que una planificación es incorrecta simplemente porque exista una coincidencia.

La coincidencia debe servir como información para que el administrador decida.

## 8. Notificación simulada

Cada cambio relevante de estado puede generar una notificación simulada mostrando:

- Remitente.
- Destinatario.
- Asunto.
- Mensaje.
- Estado de envío.
