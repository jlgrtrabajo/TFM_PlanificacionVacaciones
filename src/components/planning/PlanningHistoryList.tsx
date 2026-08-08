import type { VacationPlanning } from '../../models/VacationModels';
import PlanningStatusBadge from './PlanningStatusBadge';
import { formatDate } from '../../utils/dateUtils';

interface PlanningHistoryListProps {
  history: VacationPlanning[];
  activePlanningId?: number;
}

function PlanningHistoryList({ history, activePlanningId }: PlanningHistoryListProps) {
  if (!history.length) {
    return (
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h5 mb-3">Histórico de planificaciones</h2>
          <p className="mb-0">Aún no tienes planificaciones anteriores.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="h5 mb-3">Histórico de planificaciones</h2>
        <div className="table-responsive">
          <table className="table table-sm align-middle mb-0">
            <thead>
              <tr>
                <th>Creación</th>
                <th>Estado</th>
                <th>Días</th>
                <th>Motivo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {history.map((planning) => (
                <tr key={planning.id} className={planning.id === activePlanningId ? 'table-primary' : ''}>
                  <td>{formatDate(new Date(planning.createdAt))}</td>
                  <td>
                    <PlanningStatusBadge status={planning.status} />
                  </td>
                  <td>{planning.totalDays}</td>
                  <td>{planning.rejectionReason ?? '-'}</td>
                  <td>{planning.id === activePlanningId ? <span className="badge bg-info text-dark">Actual</span> : null}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PlanningHistoryList;
