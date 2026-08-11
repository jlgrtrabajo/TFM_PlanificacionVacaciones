/**
 * @file PlanningPeriodForm.tsx
 * @description Formulario para añadir un nuevo periodo de vacaciones (rango de fecha inicio a fecha fin).
 * 
 * CONCEPTOS PARA DESARROLLADORES (React / HTML):
 * - `<form onSubmit={handleSubmit}>`: Intercepta el envío del formulario mediante JavaScript.
 * - `event.preventDefault()`: Evita que el navegador recargue la página (comportamiento tradicional por defecto del HTML form).
 * - `useState`: Controla los campos de entrada (`startDate`, `endDate`) y mensajes de validación.
 * - `useMemo`: Recalcula dinámicamente los días laborables consumidos según las fechas seleccionadas.
 */

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import type { CalendarDay } from '../../models/CalendarModels';
import type { VacationPlanningLine } from '../../models/VacationModels';
import { countWorkingDays } from '../../utils/dateUtils';
import { isValidPeriod } from '../../utils/planningUtils';
import { DEMO_YEAR } from '../../mock/constants';

interface PlanningPeriodFormProps {
  /** Callback para notificar al componente padre que se ha creado un nuevo periodo válido */
  onSave: (line: VacationPlanningLine) => void;
  /** Calendario laboral del año */
  calendar: CalendarDay[];
  /** Siguiente ID autoincremental a asignar a la línea */
  nextLineId: number;
  /** Días restantes disponibles por seleccionar (hasta llegar al límite de 22) */
  remainingDays: number;
  /** Deshabilita la edición si la solicitud no está en borrador */
  disabled?: boolean;
}

const DEFAULT_DATE = `${DEMO_YEAR}-01-01`;

function PlanningPeriodForm({ onSave, calendar, nextLineId, remainingDays, disabled = false }: PlanningPeriodFormProps) {
  const [startDate, setStartDate] = useState(DEFAULT_DATE);
  const [endDate, setEndDate] = useState(DEFAULT_DATE);
  const [error, setError] = useState('');

  // Sincroniza la fecha de fin para que nunca sea inferior a la fecha de inicio seleccionada
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

  // Calcula automáticamente los días laborables del rango seleccionado
  const workingDays = useMemo(() => {
    if (!startDate || !endDate) {
      return 0;
    }
    return countWorkingDays(calendar, startDate, endDate);
  }, [calendar, endDate, startDate]);

  const isWithinDemoYear = (date: string) => date.startsWith(`${DEMO_YEAR}-`);

  /**
   * Manejador del evento de envío del formulario. Realiza las validaciones de negocio.
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita el submit HTML nativo
    setError('');

    if (!startDate || !endDate) {
      setError('Debes seleccionar fecha de inicio y fin.');
      return;
    }
    if (!isWithinDemoYear(startDate) || !isWithinDemoYear(endDate)) {
      setError(`Las fechas deben pertenecer al año ${DEMO_YEAR}.`);
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

    // Invoca la función callback enviando el objeto de la nueva línea
    onSave({
      id: nextLineId,
      planningId: 0,
      startDate,
      endDate,
      workingDays,
    });

    // Reinicia los controles del formulario
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
            <p className="mb-1">
              Días laborables seleccionados: <span className="fw-bold">{workingDays}</span>
            </p>
            <p className="mb-1">
              Días restantes disponibles: <span className="fw-bold">{remainingDays}</span>
            </p>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary" disabled={disabled || remainingDays <= 0}>
              Añadir periodo
            </button>
            {disabled && (
              <p className="form-text text-muted mt-2">
                No puedes editar la planificación mientras está pendiente o aprobada.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default PlanningPeriodForm;
