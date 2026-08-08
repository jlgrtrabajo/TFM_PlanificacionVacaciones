import type { VacationPlanning } from '../../models/VacationModels';

interface PlanningSummaryProps {
  planning: VacationPlanning;
}

function PlanningSummary({ planning }: PlanningSummaryProps) {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h2 className="h5">Resumen de planificación</h2>
            <p className="mb-1">Estado: {planning.status}</p>
            <p className="mb-1">Días totales: {planning.totalDays}</p>
          </div>
          <div className="text-end">
            {planning.status === 'APPROVED' && <span className="badge bg-success">Aprobada</span>}
            {planning.status === 'PENDING' && <span className="badge bg-warning text-dark">Pendiente</span>}
            {planning.status === 'REJECTED' && <span className="badge bg-danger">Rechazada</span>}
          </div>
        </div>
        {planning.rejectionReason && (
          <div className="mt-3 alert alert-danger">Motivo del rechazo: {planning.rejectionReason}</div>
        )}
      </div>
    </div>
  );
}

export default PlanningSummary;
