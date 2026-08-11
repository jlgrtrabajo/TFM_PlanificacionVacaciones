/**
 * @file dateUtils.ts
 * @description Funciones de utilidad para manipulación, formateo y cálculo de fechas laborales.
 * 
 * CONCEPTOS PARA DESARROLLADORES (C# / JavaScript):
 * - `parseDate`: Convierte un string "YYYY-MM-DD" en objeto `Date` en hora local a las 00:00:00.
 * - `formatDate`: Convierte un objeto `Date` local a un string "YYYY-MM-DD" sin sufrir desfasajes
 *   de zona horaria (a diferencia de `.toISOString()` que convierte a hora UTC).
 */

import { CalendarDay } from '../models/CalendarModels';

/**
 * Parsea una cadena de fecha "YYYY-MM-DD" a un objeto `Date` local con hora fijada a las 00:00:00.
 * @param value Cadena de fecha en formato ISO corto (ej. "2026-01-15")
 * @returns Objeto `Date` de JavaScript
 */
export const parseDate = (value: string): Date => new Date(value + 'T00:00:00');

/**
 * Formatea un objeto `Date` a una cadena "YYYY-MM-DD" conservando el año, mes y día en hora local.
 * Evita el problema común de `.toISOString()` que resta un día en zonas horarias UTC+ (ej. España/CET).
 * 
 * @param date Objeto `Date` a formatear
 * @returns Cadena en formato "YYYY-MM-DD"
 */
export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Compara dos objetos `Date` para determinar si corresponden exactamente al mismo día de calendario.
 */
export const isSameDay = (dateA: Date, dateB: Date): boolean =>
  dateA.getFullYear() === dateB.getFullYear() &&
  dateA.getMonth() === dateB.getMonth() &&
  dateA.getDate() === dateB.getDate();

/**
 * Determina si una fecha cae en sábado (6) o domingo (0).
 */
export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

/**
 * Busca en el catálogo del calendario laboral el día correspondiente a la fecha dada.
 */
export const getCalendarDay = (calendar: CalendarDay[], date: string): CalendarDay | undefined =>
  calendar.find((day) => day.date === date);

/**
 * Cuenta cuántos días LABORABLES (excluyendo fines de semana y festivos según el calendario)
 * existen en un rango entre `startDate` y `endDate` (ambos inclusive).
 * 
 * @param calendar Colección de días del año con la propiedad `isWorkingDay`
 * @param startDate Fecha inicio "YYYY-MM-DD"
 * @param endDate Fecha fin "YYYY-MM-DD"
 * @returns Número total de días laborales válidos
 */
export const countWorkingDays = (calendar: CalendarDay[], startDate: string, endDate: string): number => {
  const start = parseDate(startDate);
  const end = parseDate(endDate);

  if (end < start) {
    return 0;
  }

  let count = 0;
  let current = new Date(start);

  while (current <= end) {
    const dateString = formatDate(current);
    const calendarDay = getCalendarDay(calendar, dateString);
    if (calendarDay?.isWorkingDay) {
      count += 1;
    }
    current.setDate(current.getDate() + 1);
  }

  return count;
};
