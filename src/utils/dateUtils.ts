import { CalendarDay } from '../models/CalendarModels';

export const parseDate = (value: string): Date => new Date(value + 'T00:00:00');

export const formatDate = (date: Date): string => date.toISOString().slice(0, 10);

export const isSameDay = (dateA: Date, dateB: Date): boolean =>
  dateA.getFullYear() === dateB.getFullYear() &&
  dateA.getMonth() === dateB.getMonth() &&
  dateA.getDate() === dateB.getDate();

export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

export const getCalendarDay = (calendar: CalendarDay[], date: string): CalendarDay | undefined =>
  calendar.find((day) => day.date === date);

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
