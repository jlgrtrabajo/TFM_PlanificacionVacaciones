import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import DefaultLayout from '../layouts/DefaultLayout';
import PlanningLineList from '../components/planning/PlanningLineList';
import PlanningPeriodForm from '../components/planning/PlanningPeriodForm';
import PlanningHistoryList from '../components/planning/PlanningHistoryList';
import YearCalendar from '../components/calendar/YearCalendar';
import PlanningStatusBadge from '../components/planning/PlanningStatusBadge';
import { getApprovers, getCalendar, getDepartments, getProfiles, getUsers } from '../services/dataService';
import * as planningService from '../services/planningService';
import { getTotalWorkingDays } from '../utils/planningUtils';
import { DEMO_YEAR } from '../mock/constants';
import type { VacationPlanning, VacationPlanningLine } from '../models/VacationModels';

const REQUIRED_DAYS = 22;

function EmployeePlanningPage() {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [calendar] = useState(() => getCalendar());
  const [plannings, setPlannings] = useState<VacationPlanning[]>([]);
  const [draftPlanning, setDraftPlanning] = useState<VacationPlanning | null>(null);
  const [lines, setLines] = useState<VacationPlanningLine[]>([]);
  const [nextLineId, setNextLineId] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user) {
      setPlannings([]);
      setDraftPlanning(null);
      return;
    }

    const userPlanningData = planningService.getPlanningHistoryByUserId(user.id);
    setPlannings(userPlanningData);

    const latestPlanning = userPlanningData[0] ?? null;
    if (!latestPlanning || latestPlanning.status === 'REJECTED') {
      setDraftPlanning({
        id: Date.now(),
        userId: user.id,
        employeeName: user.name,
        year: DEMO_YEAR,
        totalDays: 0,
        status: 'DRAFT',
        createdAt: new Date().toISOString(),
        lines: [],
      });
    } else {
      setDraftPlanning(null);
    }
  }, [user]);

  const pendingPlanning = plannings.find((planning) => planning.status === 'PENDING') ?? null;
  const approvedPlanning = plannings.find((planning) => planning.status === 'APPROVED') ?? null;
  const activePlanning = draftPlanning ?? pendingPlanning ?? approvedPlanning ?? null;
  const departmentName = user ? getDepartments().find((department) => department.id === user.departmentId)?.name : 'Desconocido';

  useEffect(() => {
    if (!activePlanning) {
      setLines([]);
      setNextLineId(1);
      return;
    }

    setLines(activePlanning.lines);
    setNextLineId(activePlanning.lines.length + 1);
  }, [activePlanning]);

  const totalSelected = useMemo(() => getTotalWorkingDays(calendar, lines), [calendar, lines]);
  const remaining = REQUIRED_DAYS - totalSelected;
  const isEditable = activePlanning?.status === 'DRAFT';

  const profileName = user ? getProfiles().find((profile) => profile.id === user.profileId)?.description : 'Desconocido';

  const handleRemoveLine = (lineId: number) => {
    if (!isEditable) {
      return;
    }
    setLines((current) => current.filter((line) => line.id !== lineId));
  };

  const handleSaveLine = (line: VacationPlanningLine) => {
    if (!activePlanning) {
      setMessage('Primero crea una planificación para poder añadir periodos.');
      return;
    }

    if (!isEditable) {
      setMessage('No puedes añadir periodos a una planificación que ya está enviada o aprobada.');
      return;
    }

    if (totalSelected + line.workingDays > REQUIRED_DAYS) {
      setMessage('No puedes seleccionar más de 22 días laborables.');
      return;
    }

    setLines((current) => [...current, { ...line, planningId: activePlanning.id }]);
    setNextLineId((current) => current + 1);
    setMessage('');
  };

  const handleSend = () => {
    if (!user || !activePlanning) {
      setMessage('No hay planificación activa para enviar.');
      return;
    }

    if (activePlanning.status !== 'DRAFT') {
      setMessage('No puedes enviar esta planificación porque no está en estado DRAFT.');
      return;
    }

    if (remaining !== 0) {
      setMessage('Debes seleccionar exactamente 22 días laborables para enviar la planificación.');
      return;
    }

    const pendingPlan: VacationPlanning = {
      ...activePlanning,
      status: 'PENDING',
      lines,
      totalDays: totalSelected,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
    };

    planningService.createNewPlanning(pendingPlan);
    setPlannings(planningService.getPlanningHistoryByUserId(user.id));
    setDraftPlanning(null);
    setLines([]);
    setNextLineId(1);
    setMessage('Planificación enviada correctamente. Estado: Pendiente. Notificaciones enviadas al usuario y su administrador.');

    addNotification({
      id: Date.now(),
      planningId: pendingPlan.id,
      from: 'sistema@empresa.local',
      to: [user.email],
      subject: 'Planificación enviada',
      body: `Tu planificación ${pendingPlan.id} ha sido enviada y se encuentra pendiente de revisión.`,
      sent: true,
      createdAt: new Date().toISOString(),
    });

    const employee = getUsers().find((item) => item.id === pendingPlan.userId);
    const approver = employee ? getApprovers().find((item) => item.departmentId === employee.departmentId) : undefined;
    if (approver) {
      const approverUser = getUsers().find((item) => item.id === approver.userId);
      if (approverUser?.email) {
        addNotification({
          id: Date.now() + 1,
          planningId: pendingPlan.id,
          from: 'sistema@empresa.local',
          to: [approverUser.email],
          subject: 'Nueva planificación pendiente',
          body: `El empleado ${user.name} ha enviado una nueva planificación.`,
          sent: true,
          createdAt: new Date().toISOString(),
        });
      }
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
          <p>
            Bienvenido, {user.name}. Perfil: {profileName}. Departamento: {departmentName}
          </p>
          <p>Planificación de vacaciones {DEMO_YEAR}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8">
          <PlanningPeriodForm
            onSave={handleSaveLine}
            calendar={calendar}
            nextLineId={nextLineId}
            remainingDays={remaining}
            disabled={!isEditable}
          />
          <PlanningLineList lines={lines} onRemoveLine={handleRemoveLine} isEditable={isEditable} />
          <button className="btn btn-primary mb-4" type="button" onClick={handleSend} disabled={!isEditable || remaining !== 0}>
            Enviar planificación
          </button>
          <YearCalendar calendar={calendar} selectedLines={lines} />
        </div>
        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="h5">Resumen</h2>
              <p className="mb-1">Días seleccionados: <strong>{totalSelected}</strong></p>
              <p className="mb-1">Días restantes: <strong>{remaining > 0 ? remaining : 0}</strong></p>
              <p className="mb-1">Estado actual: <PlanningStatusBadge status={activePlanning?.status ?? 'DRAFT'} /></p>
            </div>
          </div>
          {activePlanning.status === 'REJECTED' && (
            <div className="alert alert-warning mb-3">
              <p className="mb-1">Tu última planificación fue rechazada.</p>
              <p className="mb-2">
                <strong>Motivo:</strong> {activePlanning.rejectionReason}
              </p>
            </div>
          )}
          {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
      </div>
      <PlanningHistoryList history={plannings} activePlanningId={activePlanning.status === 'PENDING' ? activePlanning.id : undefined} />
    </DefaultLayout>
  );
}

export default EmployeePlanningPage;
