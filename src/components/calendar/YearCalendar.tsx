import type { CalendarDay } from '../../models/CalendarModels';
import type { VacationPlanningLine } from '../../models/VacationModels';
import { parseDate } from '../../utils/dateUtils';

interface YearCalendarProps {
  calendar: CalendarDay[];
  selectedLines: VacationPlanningLine[];
}

function YearCalendar({ calendar, selectedLines }: YearCalendarProps) {
  const selectedDates = new Set(selectedLines.flatMap((line) => {
    const start = parseDate(line.startDate);
    const end = parseDate(line.endDate);
    const dates: string[] = [];
    let current = new Date(start);

    while (current <= end) {
      dates.push(current.toISOString().slice(0, 10));
      current.setDate(current.getDate() + 1);
    }

    return dates;
  }));

  const months = Array.from({ length: 12 }, (_, index) => index);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="h5 mb-3">Calendario 2026</h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 gy-3">
          {months.map((monthIndex) => {
            const monthDays = calendar.filter((day) => day.month === monthIndex + 1);
            return (
              <div key={monthIndex} className="col">
                <div className="border rounded p-2 h-100">
                  <div className="mb-2 text-center fw-semibold">{monthDays[0]?.date.slice(0, 7) ?? ''}</div>
                  <div className="d-flex flex-wrap gap-1">
                    {monthDays.map((day) => {
                      const isSelected = selectedDates.has(day.date);
                      const classes = [
                        'text-center',
                        'rounded',
                        'p-1',
                        'flex-fill',
                        'min-w-0',
                        'small',
                        day.isWorkingDay ? 'bg-white' : 'bg-secondary bg-opacity-10 text-muted',
                      ];

                      if (isSelected && day.isWorkingDay) {
                        classes.push('bg-primary', 'text-white');
                      }

                      return (
                        <div key={day.date} className={classes.join(' ')} style={{ width: '2rem' }}>
                          {day.day}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default YearCalendar;
