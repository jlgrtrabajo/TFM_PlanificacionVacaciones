/**
 * @file VacationModels.ts
 * @description Modelos de datos para las solicitudes de vacaciones y sus periodos (líneas).
 */

/**
 * Estados posibles en los que puede estar una planificación de vacaciones.
 * - `DRAFT`: Borrador en edición por el empleado.
 * - `PENDING`: Enviada por el empleado, pendiente de revisión por su responsable.
 * - `APPROVED`: Aprobada por el responsable.
 * - `REJECTED`: Rechazada por el responsable.
 */
export type VacationPlanningStatus = 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED';

/**
 * Representa una línea o periodo concreto de vacaciones dentro de una planificación.
 * (Relación 1 a N con VacationPlanning, similar a Detalle/Línea de Factura en SQL / C#).
 */
export interface VacationPlanningLine {
  /** ID único de la línea de periodo */
  id: number;
  /** ID de la planificación principal a la que pertenece (Foreign Key) */
  planningId: number;
  /** Fecha de inicio en formato 'YYYY-MM-DD' */
  startDate: string;
  /** Fecha de fin en formato 'YYYY-MM-DD' */
  endDate: string;
  /** Cantidad de días laborables consumidos en este periodo */
  workingDays: number;
}

/**
 * Entidad principal que representa la planificación de vacaciones completa de un empleado para un año.
 */
export interface VacationPlanning {
  /** ID único de la planificación (Primary Key) */
  id: number;
  /** ID del empleado propietario de la solicitud (Foreign Key) */
  userId: number;
  /** Nombre completo o comercial del empleado (desnormalizado para acceso rápido) */
  employeeName: string;
  /** Año de la planificación (ejemplo: 2026) */
  year: number;
  /** Suma total de días laborables de todos los periodos incluidos */
  totalDays: number;
  /** Estado actual del flujo de aprobación */
  status: VacationPlanningStatus;
  /** Motivo en texto si la solicitud fue rechazada por el responsable */
  rejectionReason?: string;
  /** Observaciones o comentarios adicionales del empleado */
  observations?: string;
  /** ID del usuario responsable que aprobó la solicitud */
  approverId?: number;
  /** Fecha de aprobación en formato ISO */
  approvalDate?: string;
  /** Fecha de creación de la solicitud */
  createdAt: string;
  /** Fecha de la última modificación */
  modifiedAt?: string;
  /** Array con los periodos de vacaciones seleccionados (Líneas hijas) */
  lines: VacationPlanningLine[];
}
