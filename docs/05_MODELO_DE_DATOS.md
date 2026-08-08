# Modelo de datos del prototipo

## 1. Principio

El modelo TypeScript del prototipo debe representar conceptualmente el modelo real proporcionado, pero no debe reproducir campos técnicos de auditoría que no aporten valor a la interfaz.

No existe base de datos.

## 2. Planificación

Equivalente conceptual a `PlanifAnualVacaciones`.

Campos recomendados:

```typescript
interface VacationPlanning {
    id: number;
    userId: number;
    employeeName: string;
    year: number;
    totalDays: number;
    status: VacationPlanningStatus;
    rejectionReason?: string;
    observations?: string;
    approverId?: number;
    approvalDate?: string;
    createdAt: string;
    modifiedAt?: string;
    lines: VacationPlanningLine[];
}
```

## 3. Línea de planificación

Equivalente conceptual a `PlanifAnualVacacionesLineas`.

```typescript
interface VacationPlanningLine {
    id: number;
    planningId: number;
    startDate: string;
    endDate: string;
    workingDays: number;
}
```

## 4. Estados

```typescript
type VacationPlanningStatus =
    | 'PENDING'
    | 'APPROVED'
    | 'REJECTED';
```

## 5. Usuario

```typescript
interface User {
    id: number;
    login: string;
    password: string;
    name: string;
    surname1?: string;
    surname2?: string;
    email: string;
    profileId: number;
    departmentId: number;
}
```

La contraseña solo existe para simular el login.

No debe tratarse como una contraseña real.

## 6. Perfil

```typescript
interface Profile {
    id: number;
    description: 'Usuario' | 'AdminPlanifVacac';
}
```

## 7. Departamento

```typescript
interface Department {
    id: number;
    name: string;
}
```

## 8. Aprobador por departamento

```typescript
interface DepartmentApprover {
    id: number;
    departmentId: number;
    userId: number;
}
```

## 9. Día de calendario

Equivalente conceptual a la tabla Calendario.

```typescript
interface CalendarDay {
    date: string;
    year: number;
    month: number;
    day: number;
    isWorkingDay: boolean;
}
```

## 10. Notificación simulada

Equivalente conceptual a `PlanifAnualVacacionesEmail`.

```typescript
interface SimulatedEmail {
    id: number;
    planningId: number;
    from: string;
    to: string[];
    cc?: string[];
    subject: string;
    body: string;
    sent: boolean;
    createdAt: string;
}
```

## 11. Relación no utilizada

La tabla real `RelacionUserAprobadorUsers` NO debe utilizarse.

No crear lógica del prototipo basada en ella.

La relación de aprobación se determina mediante departamento/aprobador.

## 12. Campos de auditoría

Campos como:

- FechaCreacion
- UsuarioCreacion
- FechaUltModif
- UsuarioUltModif
- UsuarioDesactiv
- FechaDesactiv

solo deben incorporarse al modelo frontend si son necesarios para alguna pantalla del prototipo.

No deben contaminar innecesariamente los componentes.
