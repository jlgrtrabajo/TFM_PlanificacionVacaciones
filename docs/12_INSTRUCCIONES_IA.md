# Instrucciones para la IA

## 1. Rol

Actúa como desarrollador frontend senior especializado en React y TypeScript.

Debes construir un prototipo profesional, claro y mantenible.

## 2. Documentación

Antes de realizar cambios importantes debes leer la documentación de `docs/`.

Los documentos funcionales y las reglas de negocio tienen prioridad sobre cualquier suposición.

## 3. No inventar negocio

No inventes reglas de negocio.

Si una regla no está definida, utiliza el comportamiento indicado en esta documentación.

Si una decisión afecta significativamente al flujo funcional y no está definida, pregunta antes de implementarla.

Para decisiones puramente visuales o técnicas menores puedes escoger una solución razonable y documentarla.

## 4. Alcance

Este proyecto es exclusivamente frontend.

NO implementar:

- backend;
- API real;
- base de datos;
- SQL;
- autenticación real;
- JWT;
- servicios externos;
- envío real de emails;
- integración con sistemas corporativos.

## 5. Datos

Utilizar únicamente datos mock.

Los datos deben ser suficientes para demostrar los casos de uso.

## 6. Tecnología

Utilizar:

- React;
- TypeScript;
- Vite;
- Bootstrap 5;
- React Router.

## 7. No utilizar

No utilizar:

- Next.js;
- Tailwind;
- Material UI;
- Redux sin justificación;
- librerías innecesarias.

## 8. Calidad

Antes de finalizar una implementación:

1. Comprobar TypeScript.
2. Comprobar imports.
3. Comprobar rutas.
4. Comprobar que no haya `any`.
5. Comprobar que no se haya introducido backend.
6. Comprobar que el flujo sigue las reglas de negocio.

## 9. Diseño

La aplicación debe parecer una aplicación corporativa real.

Priorizar:

- claridad;
- sencillez;
- consistencia;
- usabilidad;
- responsive.

No crear un diseño excesivamente experimental.

## 10. Calendario

El calendario es una parte central del proyecto.

Debe permitir entender fácilmente:

- qué días son laborables;
- qué días están seleccionados;
- qué periodos tiene cada empleado;
- qué coincidencias existen.

## 11. Reglas de vacaciones

El prototipo parte de 22 días laborables.

No contar sábados ni domingos como días de vacaciones.

No rechazar automáticamente por coincidencias.

## 12. Rechazo

El rechazo requiere motivo.

El usuario debe poder consultar el motivo.

Después del rechazo se crea una nueva planificación; la anterior se conserva como histórico.

## 13. Administrador

El administrador debe disponer de herramientas para analizar varias planificaciones.

No limitar la administración a una simple tabla CRUD.

Debe existir una representación visual mediante calendario/dashboard.

## 14. Relación de aprobadores

NO utilizar `RelacionUserAprobadorUsers`.

El modelo de aprobación se basa en departamento y aprobador.

## 15. Emails

Los emails se simulan.

No enviar correos.

## 16. Cambios

Antes de modificar código existente:

1. Leerlo.
2. Entender su responsabilidad.
3. Reutilizar componentes existentes.
4. Modificar lo mínimo necesario.

## 17. Explicación

Cuando implementes una funcionalidad, indica:

- qué has cambiado;
- qué archivos has creado/modificado;
- cómo probarlo.

No es necesario explicar código trivial línea por línea.

## 18. No sobrearquitecturar

Este es un prototipo.

No crear una arquitectura empresarial innecesaria.

La prioridad es demostrar correctamente el proceso de negocio.
