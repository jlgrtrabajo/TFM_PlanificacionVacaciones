import type { VacationPlanning } from '../../models/VacationModels';
import PlanningStatusBadge from '../planning/PlanningStatusBadge';

interface AdminPlanningListProps {
  plans: VacationPlanning[];
  selectedId: number | null;
  statusFilter: 'ALL' | VacationPlanning['status'];
  searchText: string;
  onSelect: (planId: number) => void;
  onStatusFilterChange: (value: 'ALL' | VacationPlanning['status']) => void;
  onSearchTextChange: (value: string) => void;
}

function AdminPlanningList({
  plans,
  selectedId,
  statusFilter,
  searchText,
  onSelect,
  onStatusFilterChange,
  onSearchTextChange,
}: AdminPlanningListProps) {
  const filteredPlans = plans.filter((planning) => {
    const matchesStatus = statusFilter === 'ALL' || planning.status === statusFilter;
    const matchesSearch = searchText
      ? planning.employeeName.toLowerCase().includes(searchText.toLowerCase()) ||
        planning.id.toString() === searchText
      : true;
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div>
            <h2 className="h5 mb-1">Planificaciones del departamento</h2>
            <p className="text-muted mb-0">{filteredPlans.length} resultados</p>
          </div>
          <div className="d-flex gap-2">
            <select
              className="form-select"
              value={statusFilter}
              onChange={(event) => onStatusFilterChange(event.target.value as AdminPlanningListProps['statusFilter'])}
            >
              <option value="ALL">Todas</option>
              <option value="PENDING">Pendientes</option>
              <option value="APPROVED">Aprobadas</option>
              <option value="REJECTED">Rechazadas</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <input
            type="search"
            className="form-control"
            placeholder="Buscar por empleado o ID"
            value={searchText}
            onChange={(event) => onSearchTextChange(event.target.value)}
          />
        </div>

        <div className="table-responsive">
          <table className="table table-hover table-sm mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Empleado</th>
                <th>Fecha</th>
                <th>Días</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlans.map((planning) => (
                <tr
                  key={planning.id}
                  className={planning.id === selectedId ? 'table-active' : 'cursor-pointer'}
                  onClick={() => onSelect(planning.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{planning.id}</td>
                  <td>{planning.employeeName}</td>
                  <td>{planning.createdAt.slice(0, 10)}</td>
                  <td>{planning.totalDays}</td>
                  <td>
                    <PlanningStatusBadge status={planning.status} />
                  </td>
                </tr>
              ))}
              {!filteredPlans.length && (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-4">
                    No hay planificaciones con esos criterios.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPlanningList;
