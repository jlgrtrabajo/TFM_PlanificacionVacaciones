import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm py-3 mb-4">
      <div className="container d-flex justify-content-between align-items-center">
        <div>
          <span className="h5 mb-0">Planificación de Vacaciones</span>
        </div>
        <div className="d-flex align-items-center gap-3">
          {user ? (
            <>
              <div className="text-muted text-end">
                <div>{user.name}</div>
                <small>{user.profileId === 2 ? 'Administrador' : 'Empleado'}</small>
              </div>
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <span className="text-muted">Usuario no autenticado</span>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
