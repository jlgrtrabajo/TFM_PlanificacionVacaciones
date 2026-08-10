import { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import DefaultLayout from '../layouts/DefaultLayout';
import { getCalendar, getDepartments, getUsers } from '../services/dataService';
import * as planningService from '../services/planningService';
import type { VacationPlanning } from '../models/VacationPlanning';
import type { CalendarDay } from '../models/CalendarModels';
import { parseDate } from '../utils/dateUtils';
import { DEMO_YEAR } from '../mock/constants';

const QUARTERS = ['ALL', 'Q1', 'Q2', 'Q3', 'Q4'] as const;
const DEFAULT_START_DATE = `${DEMO_YEAR}-01-01`;
const DEFAULT_END_DATE = `${DEMO_YEAR}-01-01`;
const STATUS_FILTERS = ['ALL', 'PENDING', 'APPROVED', 'REJECTED'] as const;
const MONTH_NAMES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

type QuarterOption = typeof QUARTERS[number];

type StatusOption = typeof STATUS_FILTERS[number];

const quarterRanges: Record<QuarterOption, { startMonth: number; endMonth: number }> = {
  ALL: { startMonth: 1, endMonth: 12 },
  Q1: { startMonth: 1, endMonth: 3 },
  Q2: { startMonth: 4, endMonth: 6 },
  Q3: { startMonth: 7, endMonth: 9 },
  Q4: { startMonth: 10, endMonth: 12 },
};

function formatMonthLabel(quarter: QuarterOption) {
  if (quarter === 'ALL') {
    return 'Año completo';
  }

  return quarter.replace('Q', 'Trimestre ');
}

function isRangeOverlap(startA: Date, endA: Date, startB: Date, endB: Date) {
  return startA <= endB && startB <= endA;
}

function isLineActiveOnDay(line: { startDate: string; endDate: string }, date: string) {
  const day = parseDate(date);
  return isRangeOverlap(parseDate(line.startDate), parseDate(line.endDate), day, day);
}

function buildMonthGroups(days: CalendarDay[]) {
  const groups: Record<number, CalendarDay[]> = {};
  days.forEach((day) => {
    groups[day.month] = groups[day.month] ?? [];
    groups[day.month].push(day);
  });
  return groups;
}

function AdminDashboardPage() {
  const { user } = useAuth();
  const allPlans = useMemo(() => planningService.getAllPlannings(), []);
  const allUsers = useMemo(() => getUsers(), []);
  const departments = useMemo(() => getDepartments(), []);
  const calendar = useMemo(() => getCalendar(), []);

  const years = useMemo(() => Array.from(new Set(allPlans.map((plan) => plan.year))).sort(), [allPlans]);

  const approverDepartment = useMemo(() => {
    if (!user) return null;
    return getUsers().find((employee) => employee.id === user.id)?.departmentId ?? null;
  }, [user]);

  const [year, setYear] = useState<number>(DEMO_YEAR);
  const [departmentId, setDepartmentId] = useState<number | 'ALL'>(approverDepartment ?? 'ALL');
  const [employeeId, setEmployeeId] = useState<number | 'ALL'>('ALL');
  const [statusFilter, setStatusFilter] = useState<StatusOption>('ALL');
  const [quarter, setQuarter] = useState<QuarterOption>('ALL');
  const [startDate, setStartDate] = useState(DEFAULT_START_DATE);
  const [endDate, setEndDate] = useState(DEFAULT_END_DATE);

  const quarterDays = useMemo(() => {
    const { startMonth, endMonth } = quarterRanges[quarter];
    const start = parseDate(`${year}-${String(startMonth).padStart(2, '0')}-01`);
    const end = parseDate(`${year}-${String(endMonth).padStart(2, '0')}-${new Date(year, endMonth, 0).getDate()}`);
    return calendar.filter((day) => {
      const current = parseDate(day.date);
      return current >= start && current <= end;
    });
  }, [calendar, quarter, year]);

  const filteredPlannings = useMemo(() => {
    const dateFilterActive = startDate && endDate;
    const filterStart = dateFilterActive ? parseDate(startDate) : null;
    const filterEnd = dateFilterActive ? parseDate(endDate) : null;

    return allPlans.filter((plan) => {
      if (plan.year !== year) {
        return false;
      }

      if (departmentId !== 'ALL') {
        const employee = allUsers.find((userItem) => userItem.id === plan.userId);
        if (!employee || employee.departmentId !== departmentId) {
          return false;
        }
      }

      if (employeeId !== 'ALL' && plan.userId !== employeeId) {
        return false;
      }

      if (statusFilter !== 'ALL' && plan.status !== statusFilter) {
        return false;
      }

      if (dateFilterActive && filterStart && filterEnd) {
        return plan.lines.some((line) =>
          isRangeOverlap(parseDate(line.startDate), parseDate(line.endDate), filterStart, filterEnd),
        );
      }

      return true;
    });
  }, [allPlans, allUsers, departmentId, employeeId, statusFilter, year, startDate, endDate]);

  const employeesOnDashboard = useMemo(() => {
    const employeeMap = new Map<number, string>();
    filteredPlannings.forEach((plan) => {
      if (!employeeMap.has(plan.userId)) {
        employeeMap.set(plan.userId, plan.employeeName);
      }
    });
    return Array.from(employeeMap.entries()).map(([id, name]) => ({ id, name }));
  }, [filteredPlannings]);

  const dayConflictCounts = useMemo(() => {
    const map = new Map<string, number>();

    quarterDays.forEach((day) => {
      const employeesWithDay = new Set<number>();
      filteredPlannings.forEach((plan) => {
        if (plan.lines.some((line) => isLineActiveOnDay(line, day.date) && day.isWorkingDay)) {
          employeesWithDay.add(plan.userId);
        }
      });

      if (employeesWithDay.size > 1) {
        map.set(day.date, employeesWithDay.size);
      }
    });

    return map;
  }, [filteredPlannings, quarterDays]);

  const planningCount = filteredPlannings.length;
  const pendingCount = filteredPlannings.filter((plan) => plan.status === 'PENDING').length;
  const approvedCount = filteredPlannings.filter((plan) => plan.status === 'APPROVED').length;
  const rejectedCount = filteredPlannings.filter((plan) => plan.status === 'REJECTED').length;
  const conflictDayCount = dayConflictCounts.size;
  const conflictSummary = Array.from(dayConflictCounts.entries()).slice(0, 4);

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
          <h1 className="h4">Dashboard de administración</h1>
          <p>Analiza visualmente las vacaciones por empleado.</p>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-sm-6 col-lg-2">
          <div className="card text-center">
            <div className="card-body">
              <h6 className="text-muted">Empleados</h6>
              <strong>{employeesOnDashboard.length}</strong>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-2">
          <div className="card text-center">
            <div className="card-body">
              <h6 className="text-muted">Planificaciones</h6>
              <strong>{planningCount}</strong>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-2">
          <div className="card text-center">
            <div className="card-body">
              <h6 className="text-muted">Pendientes</h6>
              <strong>{pendingCount}</strong>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-2">
          <div className="card text-center">
            <div className="card-body">
              <h6 className="text-muted">Aprobadas</h6>
              <strong>{approvedCount}</strong>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-2">
          <div className="card text-center">
            <div className="card-body">
              <h6 className="text-muted">Rechazadas</h6>
              <strong>{rejectedCount}</strong>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-2">
          <div className="card text-center">
            <div className="card-body">
              <h6 className="text-muted">Días conflicto</h6>
              <strong>{conflictDayCount}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row gy-3">
            <div className="col-md-3">
              <label className="form-label">Año</label>
              <select className="form-select" value={year} onChange={(event) => setYear(Number(event.target.value))}>
                {years.map((optionYear) => (
                  <option key={optionYear} value={optionYear}>
                    {optionYear}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Departamento</label>
              <select
                className="form-select"
                value={departmentId}
                onChange={(event) => setDepartmentId(event.target.value === 'ALL' ? 'ALL' : Number(event.target.value))}
                disabled={approverDepartment !== null}
              >
                {approverDepartment ? (
                  <option value={approverDepartment}>{departments.find((d) => d.id === approverDepartment)?.name ?? 'Departamento'}</option>
                ) : (
                  <>
                    <option value="ALL">Todos</option>
                    {departments.map((department) => (
                      <option key={department.id} value={department.id}>
                        {department.name}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Empleado</label>
              <select
                className="form-select"
                value={employeeId}
                onChange={(event) => setEmployeeId(event.target.value === 'ALL' ? 'ALL' : Number(event.target.value))}
              >
                <option value="ALL">Todos</option>
                {allUsers
                  .filter((employee) => employee.profileId === 1)
                  .filter((employee) => (approverDepartment ? employee.departmentId === approverDepartment : true))
                  .map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Estado</label>
              <select
                className="form-select"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as StatusOption)}
              >
                {STATUS_FILTERS.map((status) => (
                  <option key={status} value={status}>
                    {status === 'ALL' ? 'Todos' : status}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Fecha inicio</label>
              <input
                className="form-control"
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Fecha fin</label>
              <input
                className="form-control"
                type="date"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Vista</label>
              <select className="form-select" value={quarter} onChange={(event) => setQuarter(event.target.value as QuarterOption)}>
                {QUARTERS.map((option) => (
                  <option key={option} value={option}>
                    {formatMonthLabel(option)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12">
          <div className="card bg-light">
            <div className="card-body">
              <h2 className="h6">Coincidencias detectadas</h2>
              {conflictSummary.length ? (
                <ul className="mb-0">
                  {conflictSummary.map(([date, count]) => (
                    <li key={date}>
                      {date}: {count} empleados de vacaciones
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mb-0 text-muted">No se detectaron coincidencias en el rango seleccionado.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive mb-5" style={{ overflowX: 'auto' }}>
        <table className="table table-bordered table-sm mb-0" style={{ minWidth: `${quarterDays.length * 2.8 + 150}px` }}>
          <thead>
            <tr>
              <th className="align-middle">Empleado</th>
              {Object.entries(buildMonthGroups(quarterDays)).map(([monthKey, monthDays]) => (
                <th key={monthKey} colSpan={monthDays.length} className="text-center bg-secondary text-white p-1">
                  {MONTH_NAMES[Number(monthKey) - 1]}
                </th>
              ))}
            </tr>
            <tr>
              <th className="align-middle"></th>
              {quarterDays.map((day) => (
                <th key={day.date} className="text-center p-1 small text-muted">
                  {day.day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employeesOnDashboard.map((employee, index) => (
              <tr key={employee.id}>
                <th className="text-nowrap" scope="row">
                  {employee.name}
                </th>
                {quarterDays.map((day) => {
                  const active = filteredPlannings.some(
                    (plan) =>
                      plan.userId === employee.id &&
                      plan.lines.some((line) => isLineActiveOnDay(line, day.date) && day.isWorkingDay),
                  );
                  const conflictCount = dayConflictCounts.get(day.date) ?? 0;
                  return (
                    <td
                      key={day.date}
                      className={`p-0 ${active ? (conflictCount > 1 ? 'bg-danger text-white' : 'bg-primary text-white') : 'bg-white'}`}
                      style={{ width: '2rem', minWidth: '2rem', height: '1.6rem' }}
                    />
                  );
                })}
              </tr>
            ))}
            {!employeesOnDashboard.length && (
              <tr>
                <td colSpan={quarterDays.length + 1} className="text-center text-muted py-4">
                  No hay datos para los filtros seleccionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DefaultLayout>
  );
}

export default AdminDashboardPage;
