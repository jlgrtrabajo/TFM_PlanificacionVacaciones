# Planificación de Vacaciones - Portal del Empleado

Prototipo frontend para la planificación anual de vacaciones de una empresa.

## Stack Tecnologico

- React
- TypeScript
- Vite
- Bootstrap 5
- React Router

## Información sobre su instalación y ejecución
    Para instalarlo se descarga de Github el codigo fuente: https://github.com/jlgrtrabajo/TFM_PlanificacionVacaciones.git
    Se necesita instalar node.js y npm. si se quiere instalar y ejecutar en localhost.

    La app se puede probar en: https://tfm-planificacion-vacaciones.vercel.app/

## Estructura del proyecto
    TFM_PlanificacionVacaciones
    d:dist
    d:docs
    d:node_modules
    d:src
    -.gitignore
    -.index.html
    -package-lock.json
    -package.json
    -tsconfig.json
    -tsconfig.node.json
    -vercel.json
    -vite.config.ts


## Funcioalidades principales

    Existen 2 perfiles de acceso a la app: Empleado y Administrador:
     Empleado - solicita su planificación de vacaciones
    Administrador - Aprueba/Rechaza planificaciones de los empleados de su departamento.
        Tiene pantalla de dashboard de gestión
        Tiene pantalla de administración de la planificaciones de los empleados de su departamento y aprueba/rechaza cada planifiación de vacaciones.

        En el power point y video se puede ver a detalle todas las funcionalidades.


## Usuario y contraseña

    Se ven en la pantalla de login

## Alcance

Frontend únicamente.

No existe backend ni base de datos.

Los datos son simulados.

## Documentación

La especificación completa se encuentra en `docs/`.

Orden recomendado de lectura:

1. `01_OBJETIVO_Y_ALCANCE.md`
2. `02_REQUISITOS_FUNCIONALES.md`
3. `03_REGLAS_DE_NEGOCIO.md`
4. `04_FLUJO_DE_TRABAJO.md`
5. `05_MODELO_DE_DATOS.md`
6. `06_USUARIOS_Y_ROLES.md`
7. `07_PANTALLAS.md`
8. `08_DASHBOARD_ADMINISTRACION.md`
9. `09_DATOS_MOCK.md`
10. `10_ARQUITECTURA_FRONTEND.md`
11. `11_ESTANDARES_DESARROLLO.md`
12. `12_INSTRUCCIONES_IA.md`
13. `13_ROADMAP.md`
14. `14_DECISIONES.md`
15. `15_GUIA_DE_TRABAJO_CON_IA.md`

## Fuente funcional

La documentación se ha elaborado a partir del modelo de datos y flujo funcional proporcionados para el proyecto.

## Nota

Cuando una futura implementación real disponga de backend y base de datos, la capa de servicios mock podrá sustituirse por servicios de API.
