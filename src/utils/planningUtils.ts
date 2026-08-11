/**
 * @file planningUtils.ts
 * @description Funciones de ayuda para cálculos globales de planificaciones de vacaciones.
 */

import { CalendarDay } from '../models/CalendarModels';
import { VacationPlanningLine } from '../models/VacationModels';
import { countWorkingDays, parseDate } from './dateUtils';

/**
 * Calcula la suma total de días laborables consumidos por un conjunto de líneas/periodos de vacaciones.
 * Utiliza `Array.prototype.reduce` (similar a `.Sum()` en LINQ de C#).
 * 
 * @param calendar Calendario laboral
 * @param lines Arreglo de periodos seleccionados por el usuario
 * @returns Total acumulado de días laborables
 */
export const getTotalWorkingDays = (calendar: CalendarDay[], lines: VacationPlanningLine[]): number =>
  lines.reduce((total, line) => total + countWorkingDays(calendar, line.startDate, line.endDate), 0);

/**
 * Valida si un rango de fechas es coherente (la fecha de inicio no es posterior a la de fin).
 */
export const isValidPeriod = (startDate: string, endDate: string): boolean => {
  const start = parseDate(startDate);
  const end = parseDate(endDate);
  return start <= end;
};
