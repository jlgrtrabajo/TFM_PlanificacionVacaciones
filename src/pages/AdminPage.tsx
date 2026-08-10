import { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import DefaultLayout from '../layouts/DefaultLayout';
import AdminPlanningList from '../components/admin/AdminPlanningList';
import AdminPlanningDetail from '../components/admin/AdminPlanningDetail';
import { getUsers, getApprovers } from '../services/dataService';
import * as planningService from '../services/planningService';
import type { VacationPlanning } from '../models/VacationModels';

function AdminPage() {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [statusFilter, setStatusFilter] = useState<'ALL' | VacationPlanning['status']>('ALL');
  const [searchText, setSearchText] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [message, setMessage] = useState('');
  const [plans, setPlans] = useState<VacationPlanning[]>(() => planningService.getAllPlannings());

  const departmentApprover = useMemo(() => {
    if (!user) return null;
    return getApprovers().find((approver) => approver.userId === user.id) ?? null;
  }, [user]);

  const departmentId = departmentApprover?.departmentId ?? null;

  const departmentPlans = useMemo(
    () =>
      plans.filter((plan) => {
        if (!departmentId) return false;
        const employee = getUsers().find((item) => item.id === plan.userId);
        return employee?.departmentId === departmentId;
      }),
    [plans, departmentId],
  );

  const selectedPlan = selectedId ? plans.find((plan) => plan.id === selectedId) ?? null : null;

  const handleApprove = () => {
    if (!selectedPlan || selectedPlan.status !== 'PENDING') return;

    const updatedPlan = {
      ...selectedPlan,
      status: 'APPROVED' as const,
      approverId: user?.id,
      approvalDate: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
    };

    planningService.updatePlanning(updatedPlan);
    setPlans(planningService.getAllPlannings());
    setMessage(`Planificación ID ${selectedPlan.id} aprobada correctamente.`);

    addNotification({
      id: Date.now(),
      planningId: selectedPlan.id,
      from: 'sistema@empresa.local',
      to: [selectedPlan.userId ? getUsers().find((item) => item.id === selectedPlan.userId)?.email ?? '' : ''],
      subject: 'Planificación aprobada',
      body: `Tu planificación ${selectedPlan.id} ha sido aprobada.`,
      sent: true,
      createdAt: new Date().toISOString(),
    });

    if (user?.email) {
      addNotification({
        id: Date.now() + 1,
        planningId: selectedPlan.id,
        from: 'sistema@empresa.local',
        to: [user.email],
        subject: 'Planificación revisada',
        body: `Has aprobado la planificación ${selectedPlan.id}.`,
        sent: true,
        createdAt: new Date().toISOString(),
      });
    }
  };

  const handleReject = (reason: string) => {
    if (!selectedPlan || selectedPlan.status !== 'PENDING') return;

    const updatedPlan = {
      ...selectedPlan,
      status: 'REJECTED' as const,
      rejectionReason: reason,
      modifiedAt: new Date().toISOString(),
    };

    planningService.updatePlanning(updatedPlan);
    setPlans(planningService.getAllPlannings());
    setRejectReason('');
    setMessage(`Planificación ID ${selectedPlan.id} rechazada correctamente.`);

    addNotification({
      id: Date.now(),
      planningId: selectedPlan.id,
      from: 'sistema@empresa.local',
      to: [selectedPlan.userId ? getUsers().find((item) => item.id === selectedPlan.userId)?.email ?? '' : ''],
      subject: 'Planificación rechazada',
      body: `Tu planificación ${selectedPlan.id} ha sido rechazada: ${reason}`,
      sent: true,
      createdAt: new Date().toISOString(),
    });

    if (user?.email) {
      addNotification({
        id: Date.now() + 1,
        planningId: selectedPlan.id,
        from: 'sistema@empresa.local',
        to: [user.email],
        subject: 'Planificación revisada',
        body: `Has rechazado la planificación ${selectedPlan.id}.`,
        sent: true,
        createdAt: new Date().toISOString(),
      });
    }
  };

  if (!user) {
    return (
      <DefaultLayout>
        <div className="alert alert-warning">Acceso no autorizado.</div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="h4">Administración de planificaciones</h1>
          <p>Departamento: {departmentApprover ? `#${departmentApprover.departmentId}` : 'Sin departamento asignado'}</p>
        </div>
      </div>

      {message && (
        <div className="row mb-3">
          <div className="col-12">
            <div className="alert alert-success">{message}</div>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-lg-5">
          <AdminPlanningList
            plans={departmentPlans}
            selectedId={selectedId}
            statusFilter={statusFilter}
            searchText={searchText}
            onSelect={setSelectedId}
            onStatusFilterChange={setStatusFilter}
            onSearchTextChange={setSearchText}
          />
        </div>
        <div className="col-lg-7">
          <AdminPlanningDetail
            planning={selectedPlan}
            onApprove={handleApprove}
            onReject={handleReject}
            rejectReason={rejectReason}
            onRejectReasonChange={setRejectReason}
          />
        </div>
      </div>
    </DefaultLayout>
  );
}

export default AdminPage;
