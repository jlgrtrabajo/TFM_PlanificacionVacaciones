# Planificación de Vacaciones - Portal del Empleado

## 1. Objetivo

Construir un prototipo frontend de una aplicación web para la planificación anual de vacaciones de los empleados de todos los departamentos de una empresa.

El objetivo no es gestionar unas vacaciones definitivas mediante un sistema corporativo completo, sino simular el proceso mediante el cual:

1. Un empleado selecciona sus días de vacaciones.
2. Envía su planificación.
3. Un administrador de planificación revisa la planificación.
4. El administrador puede aprobarla o rechazarla.
5. Si la rechaza, el empleado puede generar una nueva planificación.
6. Si la aprueba, la planificación queda aprobada y no puede seguir editándose.

## 2. Alcance del prototipo

El prototipo incluirá exclusivamente frontend.

Tecnologías:

- React
- TypeScript
- Vite
- Bootstrap 5
- React Router

No habrá:

- Backend.
- API real.
- Base de datos.
- Autenticación real.
- Persistencia real.
- Envío real de correo electrónico.
- Integraciones externas.

Los datos serán ficticios y estarán definidos en el propio proyecto.

## 3. Objetivo del prototipo

El prototipo debe permitir comprobar visualmente y funcionalmente:

- El acceso de empleados y administradores.
- La selección de días de vacaciones.
- La visualización de la planificación.
- Los estados de una planificación.
- La revisión por parte del administrador.
- La aprobación.
- El rechazo con motivo.
- La generación de una nueva planificación después de un rechazo.
- La visualización de coincidencias entre empleados.
- La utilización de calendarios y dashboards para analizar la planificación.

## 4. Principio importante

La aplicación debe ser un prototipo sencillo y demostrable.

No se debe sobrearquitecturar el proyecto ni crear infraestructura que no sea necesaria para una aplicación frontend de demostración.

Cuando una funcionalidad que en producción necesitaría backend deba aparecer en el prototipo, debe simularse mediante datos y lógica frontend.
