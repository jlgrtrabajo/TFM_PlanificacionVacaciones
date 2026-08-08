import { useMemo, useState, type FormEvent } from 'react';
import type { CalendarDay } from '../../models/CalendarModels';
import type { VacationPlanningLine } from '../../models/VacationModels';
import { countWorkingDays, isValidPeriod } from '../../utils/dateUtils';

interface PlanningPeriodFormProps {
  onSave: (line: VacationPlanningLine) => void;
  calendar: CalendarDay[];
  nextLineId: number;
  disabled?: boolean;
}

function PlanningPeriodForm({ onSave, calendar, nextLineId, disabled = false }: PlanningPeriodFormProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  const workingDays = useMemo(() => {
    if (!startDate || !endDate) {
      return 0;
    }
    return countWorkingDays(calendar, startDate, endDate);
  }, [calendar, endDate, startDate]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!startDate || !endDate) {
      setError('Debes seleccionar fecha de inicio y fin.');
      return;
    }

    if (!isValidPeriod(startDate, endDate)) {
      setError('La fecha de fin no puede ser anterior a la fecha de inicio.');
      return;
    }

    onSave({
      id: nextLineId,
      planningId: 0,
      startDate,
      endDate,
      workingDays,
    });

    setStartDate('');
    setEndDate('');
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
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </div>
          </div>
          <div className="mt-3">
            <p className="mb-1">Días laborables seleccionados: {workingDays}</p>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-outline-primary" disabled={disabled}>
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
