export type VacationPlanningStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface VacationPlanningLine {
  id: number;
  planningId: number;
  startDate: string;
  endDate: string;
  workingDays: number;
}

export interface VacationPlanning {
  id: number;
  userId: number;
  employeeName: string;
  year: number;
  totalDays: number;
  status: VacationPlanningStatus;
  rejectionReason?: string;
  observations?: string;
  approverId?: number;
  approvalDate?: string;
  createdAt: string;
  modifiedAt?: string;
  lines: VacationPlanningLine[];
}
