# Arquitectura frontend

## Stack

- React
- TypeScript
- Vite
- Bootstrap 5
- React Router

## Estructura recomendada

```text
src/
├── assets/
├── components/
│   ├── common/
│   ├── calendar/
│   ├── planning/
│   └── admin/
├── layouts/
├── mock/
├── models/
├── pages/
├── services/
├── hooks/
├── utils/
├── context/
├── App.tsx
└── main.tsx
```

## Pages

Las páginas representan las rutas principales.

Ejemplos:

- LoginPage
- EmployeePlanningPage
- AdminModePage
- AdminPlanningPage
- PlanningDetailPage
- DashboardPage

## Components

Los componentes deben ser reutilizables.

Ejemplos:

- Header
- Sidebar
- Calendar
- PlanningSummary
- PlanningStatusBadge
- PlanningLineList
- EmployeeFilter
- ConflictIndicator
- ApprovalModal
- RejectionModal
- NotificationPanel

## Models

Contendrán interfaces y tipos de dominio.

## Mock

Contendrá datos ficticios.

## Services

Los servicios simularán el acceso a datos.

Ejemplo:

```typescript
getUserById()
getPlanningByUser()
getPendingPlannings()
approvePlanning()
rejectPlanning()
createPlanning()
```

Aunque internamente trabajen con arrays, los componentes no deberían manipular directamente los arrays mock.

## Estado

Utilizar inicialmente:

- useState
- useMemo
- useEffect
- Context cuando sea necesario

No introducir Redux salvo necesidad justificada.

## Navegación

Utilizar React Router.

## Estado global

Como mínimo puede existir un contexto de sesión simulada:

```text
currentUser
currentProfile
currentDepartment
```

No implementar autenticación real.

## Diseño

Bootstrap 5.

CSS propio solo cuando sea necesario.

## Responsabilidad

Los componentes de presentación no deben contener reglas complejas de negocio.

Las funciones de cálculo de días, coincidencias y estados deben estar en utilidades o servicios apropiados.

## Futuro backend

La arquitectura debe permitir sustituir los servicios mock por una API sin tener que reescribir las pantallas.
