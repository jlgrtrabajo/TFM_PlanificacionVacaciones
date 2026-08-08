import { CalendarDay } from '../models/CalendarModels';
import { VacationPlanningLine } from '../models/VacationModels';
import { countWorkingDays, parseDate } from './dateUtils';

export const getTotalWorkingDays = (calendar: CalendarDay[], lines: VacationPlanningLine[]): number =>
  lines.reduce((total, line) => total + countWorkingDays(calendar, line.startDate, line.endDate), 0);

export const isValidPeriod = (startDate: string, endDate: string): boolean => {
  const start = parseDate(startDate);
  const end = parseDate(endDate);
  return start <= end;
};
