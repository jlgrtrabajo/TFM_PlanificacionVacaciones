import type { VacationPlanning } from '../../models/VacationModels';
import PlanningStatusBadge from '../planning/PlanningStatusBadge';
import ConfirmButton from '../common/ConfirmButton';

interface AdminPlanningDetailProps {
  planning: VacationPlanning | null;
  onApprove: () => void;
  onReject: (reason: string) => void;
  rejectReason: string;
  onRejectReasonChange: (value: string) => void;
}

function AdminPlanningDetail({ planning, onApprove, onReject, rejectReason, onRejectReasonChange }: AdminPlanningDetailProps) {
  if (!planning) {
    return (
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h5">Detalle de planificación</h2>
          <p className="mb-0">Selecciona una planificación para ver detalles.</p>
        </div>
      </div>
    );
  }

  const isPending = planning.status === 'PENDING';

  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h2 className="h5">Detalle de planificación</h2>
            <p className="mb-1">Empleado: {planning.employeeName}</p>
            <p className="mb-1">Creada: {planning.createdAt.slice(0, 10)}</p>
            <p className="mb-1">Estado: <PlanningStatusBadge status={planning.status} /></p>
          </div>
          <div className="text-end">
            <span className="badge bg-secondary">ID {planning.id}</span>
          </div>
        </div>

        <div className="mb-3">
          <h3 className="h6">Periodos</h3>
          <div className="table-responsive">
            <table className="table table-sm mb-0">
              <thead>
                <tr>
                  <th>Inicio</th>
                  <th>Fin</th>
                  <th>Días laborables</th>
                </tr>
              </thead>
              <tbody>
                {planning.lines.map((line) => (
                  <tr key={line.id}>
                    <td>{line.startDate}</td>
                    <td>{line.endDate}</td>
                    <td>{line.workingDays}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-3">
          <p className="mb-1">Total días: {planning.totalDays}</p>
          {planning.approverId && <p className="mb-1">Aprobador: {planning.approverId}</p>}
          {planning.approvalDate && <p className="mb-1">Fecha aprobación: {planning.approvalDate.slice(0, 10)}</p>}
          {planning.rejectionReason && <p className="mb-1">Motivo de rechazo: {planning.rejectionReason}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="rejectReason" className="form-label">
            Motivo de rechazo
          </label>
          <textarea
            id="rejectReason"
            className="form-control"
            rows={3}
            value={rejectReason}
            onChange={(event) => onRejectReasonChange(event.target.value)}
            disabled={!isPending}
          />
        </div>

        <div className="d-flex gap-2">
          <ConfirmButton
            onConfirm={onApprove}
            label="Aprobar"
            confirmMessage="¿Confirmas que quieres aprobar esta planificación?"
            variant="primary"
            disabled={!isPending}
          />
          <ConfirmButton
            onConfirm={() => onReject(rejectReason)}
            label="Rechazar"
            confirmMessage="¿Confirmas que quieres rechazar esta planificación?"
            variant="danger"
            disabled={!isPending || !rejectReason.trim()}
          />
        </div>
        {planning.status !== 'PENDING' && (
          <div className="alert alert-secondary mt-3 mb-0">
            Esta planificación está cerrada y no se puede modificar en estado <strong>{planning.status.toLowerCase()}</strong>.
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPlanningDetail;
