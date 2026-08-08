import type { VacationPlanningLine } from '../../models/VacationModels';

interface PlanningLineListProps {
  lines: VacationPlanningLine[];
}

function PlanningLineList({ lines }: PlanningLineListProps) {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="h5 mb-3">Periodos seleccionados</h2>
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Inicio</th>
              <th>Fin</th>
              <th>Días laborables</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line) => (
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
  );
}

export default PlanningLineList;
