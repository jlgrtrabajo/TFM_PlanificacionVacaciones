/**
 * @file CalendarModels.ts
 * @description Modelos de datos para la gestión del calendario laboral y las notificaciones por correo simuladas.
 * 
 * NOTA PARA DESARROLLADORES (Equivalencia con C# / POO):
 * En TypeScript, `interface` define la estructura/contrato de un objeto (similar a una struct o DTO en C#).
 * A diferencia de C#, las interfaces de TypeScript existen solo en tiempo de compilación y no generan código JavaScript.
 */

/**
 * Representa un día individual del calendario del año.
 * Equivale a una fila/registro de tabla de calendario laboral o a un DTO en C#.
 */
export interface CalendarDay {
  /** Fecha en formato ISO 'YYYY-MM-DD' (ejemplo: "2026-01-01") */
  date: string;
  /** Año correspondiente (ejemplo: 2026) */
  year: number;
  /** Mes en formato numérico 1-12 (1 = Enero, 12 = Diciembre) */
  month: number;
  /** Número de día del mes (1-31) */
  day: number;
  /** Día de la semana en formato JavaScript Date (0 = Domingo, 1 = Lunes, ..., 6 = Sábado) */
  weekday: number;
  /** Indica si el día es laboral (`true`) o fin de semana/festivo (`false`) */
  isWorkingDay: boolean;
}

/**
 * Representa un correo electrónico simulado que envía el sistema ante cambios en la planificación.
 */
export interface SimulatedEmail {
  /** Identificador único del correo */
  id: number;
  /** ID de la planificación relacionada con esta notificación */
  planningId: number;
  /** Dirección de correo del emisor (ejemplo: "sistema@empresa.local") */
  from: string;
  /** Lista de destinatarios */
  to: string[];
  /** Lista opcional de destinatarios en copia (con '?' indica que es un atributo opcional) */
  cc?: string[];
  /** Asunto del correo */
  subject: string;
  /** Cuerpo en texto del correo */
  body: string;
  /** Estado de envío */
  sent: boolean;
  /** Fecha y hora de creación en formato ISO (ej. "2026-05-12T15:35:00Z") */
  createdAt: string;
}
