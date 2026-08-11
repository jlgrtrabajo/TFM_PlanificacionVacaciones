import type { CalendarDay } from '../../models/CalendarModels';
import type { VacationPlanningLine } from '../../models/VacationModels';
import { parseDate } from '../../utils/dateUtils';
import { DEMO_YEAR } from '../../mock/constants';

interface YearCalendarProps {
  calendar: CalendarDay[];
  selectedLines: VacationPlanningLine[];
}

const WEEKDAY_LABELS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const MONTH_NAMES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

function YearCalendar({ calendar, selectedLines }: YearCalendarProps) {
  const selectedDates = new Set(
    selectedLines.flatMap((line) => {
      const start = parseDate(line.startDate);
      const end = parseDate(line.endDate);
      const dates: string[] = [];
      let current = new Date(start);

      while (current <= end) {
        dates.push(current.toISOString().slice(0, 10));
        current.setDate(current.getDate() + 1);
      }

      return dates;
    }),
  );

  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="h5 mb-3">Calendario {DEMO_YEAR}</h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 gy-3">
          {months.map((month) => {
            const monthDays = calendar.filter((day) => day.month === month);
            const firstDay = monthDays[0];
            const offset = firstDay ? ((firstDay.weekday + 6) % 7) : 0;
            const title = `${MONTH_NAMES[month - 1]} ${DEMO_YEAR}`;

            return (
              <div key={month} className="col">
                <div className="border rounded p-2 h-100">
                  <div className="mb-2 text-center fw-semibold">{title}</div>
                  <div className="d-grid" style={{ gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.25rem' }}>
                    {WEEKDAY_LABELS.map((label) => (
                      <div key={label} className="text-center small fw-semibold">
                        {label}
                      </div>
                    ))}
                    {Array.from({ length: offset }).map((_, index) => (
                      <div key={`empty-${index}`} />
                    ))}
                    {monthDays.map((day) => {
                      const isSelected = selectedDates.has(day.date);
                      const classes = ['text-center', 'rounded', 'p-1', 'small'];

                      if (isSelected) {
                        classes.push('bg-danger', 'text-white', 'border', 'border-danger');
                      } else if (day.isWorkingDay) {
                        classes.push('bg-white');
                      } else {
                        classes.push('bg-secondary', 'bg-opacity-10', 'text-muted');
                      }

                      return (
                        <div key={day.date} className={classes.join(' ')}>
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
