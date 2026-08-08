import { CalendarDay } from '../models/CalendarModels';
import { DEMO_YEAR } from './constants';

const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

const formatDate = (date: Date): string => date.toISOString().slice(0, 10);

export const calendar: CalendarDay[] = Array.from({ length: 365 }, (_, index) => {
  const date = new Date(DEMO_YEAR, 0, 1 + index);
  if (date.getFullYear() !== DEMO_YEAR) {
    return null;
  }

  return {
    date: formatDate(date),
    year: DEMO_YEAR,
    month: date.getMonth() + 1,
    day: date.getDate(),
    weekday: date.getDay(),
    isWorkingDay: !isWeekend(date),
  };
}).filter((entry): entry is CalendarDay => entry !== null);
