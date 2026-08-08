import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DefaultLayout from '../layouts/DefaultLayout';

function AdminModePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  if (user.profileId !== 2) {
    return <Navigate to="/employee" replace />;
  }

  const handlePortal = () => navigate('/employee');
  const handleAdmin = () => navigate('/admin');
  const handleDashboard = () => navigate('/admin-dashboard');

  return (
    <DefaultLayout>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="h4">Modo administrador</h1>
              <p>Selecciona el modo que deseas utilizar.</p>
              <div className="d-grid gap-2">
                <button className="btn btn-outline-primary" type="button" onClick={handlePortal}>
                  Portal de planificación
                </button>
                <button className="btn btn-secondary" type="button" onClick={handleAdmin}>
                  Administración de planificaciones
                </button>
                <button className="btn btn-primary" type="button" onClick={handleDashboard}>
                  Dashboard administrativo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default AdminModePage;
