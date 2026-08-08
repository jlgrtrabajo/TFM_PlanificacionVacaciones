import type { VacationPlanningStatus } from '../../models/VacationModels';

interface PlanningStatusBadgeProps {
  status: VacationPlanningStatus;
}

const statusClasses: Record<VacationPlanningStatus, string> = {
  APPROVED: 'bg-success',
  PENDING: 'bg-warning text-dark',
  REJECTED: 'bg-danger',
};

function PlanningStatusBadge({ status }: PlanningStatusBadgeProps) {
  return <span className={`badge ${statusClasses[status]}`}>{status}</span>;
}

export default PlanningStatusBadge;
