import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="bg-white border rounded p-3 mb-4">
      <h2 className="h6">Navegación</h2>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/employee" className="nav-link p-1">
            Portal empleado
          </Link>
        </li>
        {user?.profileId === 2 && (
          <>
            <li className="nav-item">
              <Link to="/admin" className="nav-link p-1">
                Administración
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin-dashboard" className="nav-link p-1">
                Dashboard administración
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/notifications" className="nav-link p-1">
                Notificaciones
              </Link>
            </li>
          </>
        )}
        {user?.profileId === 1 && (
          <li className="nav-item">
            <Link to="/notifications" className="nav-link p-1">
              Notificaciones
            </Link>
          </li>
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;
