import { useEffect, useMemo, useState, type FormEvent } from 'react';
import type { CalendarDay } from '../../models/CalendarModels';
import type { VacationPlanningLine } from '../../models/VacationModels';
import { countWorkingDays } from '../../utils/dateUtils';
import { isValidPeriod } from '../../utils/planningUtils';
import { DEMO_YEAR } from '../../mock/constants';

interface PlanningPeriodFormProps {
  onSave: (line: VacationPlanningLine) => void;
  calendar: CalendarDay[];
  nextLineId: number;
  remainingDays: number;
  disabled?: boolean;
}

const DEFAULT_DATE = `${DEMO_YEAR}-01-01`;

function PlanningPeriodForm({ onSave, calendar, nextLineId, remainingDays, disabled = false }: PlanningPeriodFormProps) {
  const [startDate, setStartDate] = useState(DEFAULT_DATE);
  const [endDate, setEndDate] = useState(DEFAULT_DATE);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!startDate) {
      setStartDate(DEFAULT_DATE);
    }

    if (!endDate) {
      setEndDate(startDate || DEFAULT_DATE);
      return;
    }

    if (startDate && endDate < startDate) {
      setEndDate(startDate);
    }
  }, [startDate, endDate]);

  const workingDays = useMemo(() => {
    if (!startDate || !endDate) {
      return 0;
    }
    return countWorkingDays(calendar, startDate, endDate);
  }, [calendar, endDate, startDate]);

  const isWithinDemoYear = (date: string) => date.startsWith(`${DEMO_YEAR}-`);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!startDate || !endDate) {
      setError('Debes seleccionar fecha de inicio y fin.');
      return;
    }

    if (!isWithinDemoYear(startDate) || !isWithinDemoYear(endDate)) {
      setError('Las fechas deben pertenecer al año 2027.');
      return;
    }

    if (!isValidPeriod(startDate, endDate)) {
      setError('La fecha de fin no puede ser anterior a la fecha de inicio.');
      return;
    }

    if (remainingDays <= 0) {
      setError('Ya no quedan días disponibles para añadir más periodos.');
      return;
    }

    if (workingDays <= 0) {
      setError('El periodo debe incluir al menos un día laborable.');
      return;
    }

    if (workingDays > remainingDays) {
      setError(`Solo puedes añadir hasta ${remainingDays} días laborables restantes.`);
      return;
    }

    onSave({
      id: nextLineId,
      planningId: 0,
      startDate,
      endDate,
      workingDays,
    });

    setStartDate(DEFAULT_DATE);
    setEndDate(DEFAULT_DATE);
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="h5 mb-3">Añadir periodo</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="startDate" className="form-label">
                Fecha inicio
              </label>
              <input
                id="startDate"
                type="date"
                className="form-control"
                min={DEFAULT_DATE}
                max={`${DEMO_YEAR}-12-31`}
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="endDate" className="form-label">
                Fecha fin
              </label>
              <input
                id="endDate"
                type="date"
                className="form-control"
                min={DEFAULT_DATE}
                max={`${DEMO_YEAR}-12-31`}
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </div>
          </div>
          <div className="mt-3">
            <p className="mb-1">Días laborables seleccionados: {workingDays}</p>
            <p className="mb-1">Días restantes disponibles: {remainingDays}</p>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary" disabled={disabled || remainingDays <= 0}>
              Añadir periodo
            </button>
            {disabled && <p className="form-text text-muted mt-2">No puedes editar la planificación mientras está pendiente o aprobada.</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default PlanningPeriodForm;
