import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../layouts/AuthLayout';

function LoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const redirectToHome = (profileId: number) => {
    if (profileId === 2) {
      navigate('/admin-mode');
    } else {
      navigate('/employee');
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = authenticate(login.trim(), password.trim());
    if (!user) {
      setError('Credenciales incorrectas. Prueba con un usuario demo.');
      return;
    }

    setUser(user);
    redirectToHome(user.profileId);
  };

  return (
    <AuthLayout>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h1 className="h4 mb-3">Login de demostración</h1>
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label htmlFor="login" className="form-label">
                      Usuario
                    </label>
                    <input
                      id="login"
                      type="text"
                      className="form-control"
                      value={login}
                      onChange={(event) => setLogin(event.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Contraseña
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <button type="submit" className="btn btn-primary w-100">
                    Entrar
                  </button>
                </form>
              </div>
            </div>
            <div className="mt-3">
              <div className="card card-body bg-light">
                <h2 className="h6">Usuarios de prueba</h2>
                <p className="mb-1">empleado: juan / juan123</p>
                <p className="mb-1">empleado: pedro / pedro123</p>
                <p className="mb-1">admin: dani / dani123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default LoginPage;
