import type { VacationPlanningLine } from '../../models/VacationModels';

interface PlanningLineListProps {
  lines: VacationPlanningLine[];
  onRemoveLine?: (lineId: number) => void;
  isEditable?: boolean;
}

function PlanningLineList({ lines, onRemoveLine, isEditable = false }: PlanningLineListProps) {
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
              {isEditable && <th className="text-end">Acción</th>}
            </tr>
          </thead>
          <tbody>
            {lines.length === 0 ? (
              <tr>
                <td colSpan={isEditable ? 4 : 3} className="text-center text-muted py-4">
                  No hay periodos seleccionados.
                </td>
              </tr>
            ) : (
              lines.map((line) => (
                <tr key={line.id}>
                  <td>{line.startDate}</td>
                  <td>{line.endDate}</td>
                  <td>{line.workingDays}</td>
                  {isEditable && (
                    <td className="text-end">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onRemoveLine?.(line.id)}
                      >
                        Borrar
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PlanningLineList;
