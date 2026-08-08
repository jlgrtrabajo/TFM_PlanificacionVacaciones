import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import DefaultLayout from '../layouts/DefaultLayout';
import PlanningSummary from '../components/planning/PlanningSummary';
import PlanningLineList from '../components/planning/PlanningLineList';
import PlanningPeriodForm from '../components/planning/PlanningPeriodForm';
import PlanningHistoryList from '../components/planning/PlanningHistoryList';
import YearCalendar from '../components/calendar/YearCalendar';
import { getApprovers, getCalendar, getUsers } from '../services/dataService';
import * as planningService from '../services/planningService';
import { getTotalWorkingDays } from '../utils/planningUtils';
import type { VacationPlanning, VacationPlanningLine } from '../models/VacationModels';

const REQUIRED_DAYS = 22;

function EmployeePlanningPage() {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [calendar] = useState(() => getCalendar());
  const [plannings, setPlannings] = useState<VacationPlanning[]>([]);
  const [lines, setLines] = useState<VacationPlanningLine[]>([]);
  const [nextLineId, setNextLineId] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user) {
      setPlannings([]);
      return;
    }

    const userPlanningData = planningService.getPlanningHistoryByUserId(user.id);
    setPlannings(userPlanningData);
  }, [user]);

  const activePlanning = plannings[0] ?? null;

  useEffect(() => {
    if (activePlanning) {
      setLines(activePlanning.lines);
      setNextLineId(activePlanning.lines.length + 1);
    } else {
      setLines([]);
      setNextLineId(1);
    }
  }, [activePlanning]);

  const totalSelected = useMemo(() => getTotalWorkingDays(calendar, lines), [calendar, lines]);
  const remaining = REQUIRED_DAYS - totalSelected;

  const handleSaveLine = (line: VacationPlanningLine) => {
    if (totalSelected + line.workingDays > REQUIRED_DAYS) {
      setMessage('No puedes seleccionar más de 22 días laborables.');
      return;
    }

    setLines((current) => [...current, { ...line, planningId: activePlanning?.id ?? 0 }]);
    setNextLineId((current) => current + 1);
    setMessage('');
  };

  const handleCreateNewPlanning = () => {
    if (!user || !activePlanning || activePlanning.status !== 'REJECTED') {
      return;
    }

    const newPlanningId = Date.now();
    const newPlanning: VacationPlanning = {
      id: newPlanningId,
      userId: user.id,
      employeeName: user.name,
      year: activePlanning.year,
      totalDays: 0,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      lines: [],
    };

    planningService.createNewPlanning(newPlanning);
    // refresh local list from service
    setPlannings(planningService.getPlanningHistoryByUserId(user.id));
    setMessage('Nueva planificación creada. Completa los 22 días y envíala.');
  };

  const handleSend = () => {
    if (!activePlanning) {
      setMessage('No hay planificación activa para enviar.');
      return;
    }

    if (activePlanning.status !== 'PENDING') {
      setMessage('No puedes enviar esta planificación porque no está en estado Pendiente.');
      return;
    }

    if (remaining !== 0) {
      setMessage('Debes seleccionar exactamente 22 días laborables para enviar la planificación.');
      return;
    }

    // persist lines to the planning service and refresh
    planningService.savePlanningLines(activePlanning.id, lines);
    setPlannings(planningService.getPlanningHistoryByUserId(user.id));
    setMessage('Planificación enviada correctamente. Estado: Pendiente.');

    const employee = getUsers().find((item) => item.id === activePlanning.userId);
    const approver = employee ? getApprovers().find((item) => item.departmentId === employee.departmentId) : undefined;

    addNotification({
      id: Date.now(),
      planningId: activePlanning.id,
      from: 'sistema@empresa.local',
      to: [user.email],
      subject: 'Planificación enviada',
      body: `Tu planificación ${activePlanning.id} ha sido enviada y se encuentra pendiente de revisión.`,
      sent: true,
      createdAt: new Date().toISOString(),
    });

    if (approver) {
      const approverUser = getUsers().find((item) => item.id === approver.userId);
      addNotification({
        id: Date.now() + 1,
        planningId: activePlanning.id,
        from: 'sistema@empresa.local',
        to: [approverUser?.email ?? ''],
        subject: 'Nueva planificación pendiente',
        body: `El empleado ${user.name} ha enviado una nueva planificación.`,
        sent: true,
        createdAt: new Date().toISOString(),
      });
    }
  };

  if (!user || !activePlanning) {
    return (
      <DefaultLayout>
        <div className="alert alert-warning">No se encontró la planificación del empleado.</div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="h4">Portal del empleado</h1>
          <p>Bienvenido, {user.name}. Selecciona tus 22 días laborables para la planificación de 2026.</p>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8">
          <PlanningPeriodForm
            onSave={handleSaveLine}
            calendar={calendar}
            nextLineId={nextLineId}
            disabled={activePlanning.status !== 'PENDING'}
          />
          <YearCalendar calendar={calendar} selectedLines={lines} />
        </div>
        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="h5">Estadísticas</h2>
              <p className="mb-1">Días seleccionados: {totalSelected}</p>
              <p className="mb-1">Días restantes: {remaining > 0 ? remaining : 0}</p>
              <p className="mb-1">Estado actual: {activePlanning.status}</p>
            </div>
          </div>
          {activePlanning.status === 'REJECTED' && (
            <div className="alert alert-warning mb-3">
              <p className="mb-1">Tu última planificación fue rechazada.</p>
              <p className="mb-2"><strong>Motivo:</strong> {activePlanning.rejectionReason}</p>
              <button type="button" className="btn btn-outline-primary" onClick={handleCreateNewPlanning}>
                Crear nueva planificación
              </button>
            </div>
          )}
          <button
            className="btn btn-primary w-100"
            type="button"
            onClick={handleSend}
            disabled={activePlanning.status !== 'PENDING'}
          >
            Enviar planificación
          </button>
          {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
      </div>
      <PlanningSummary
        planning={{
          ...activePlanning,
          lines,
          totalDays: totalSelected,
        }}
      />
      <PlanningLineList lines={lines} />
      <PlanningHistoryList history={plannings} activePlanningId={activePlanning.id} />
    </DefaultLayout>
  );
}

export default EmployeePlanningPage;
