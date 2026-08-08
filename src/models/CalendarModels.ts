export interface CalendarDay {
  date: string;
  year: number;
  month: number;
  day: number;
  weekday: number;
  isWorkingDay: boolean;
}

export interface SimulatedEmail {
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
