import { FormEvent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../layouts/AuthLayout';
import { getDepartments, getProfiles, getUsers } from '../services/dataService';

function LoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const users = useMemo(() => getUsers(), []);
  const profiles = useMemo(() => getProfiles(), []);
  const departments = useMemo(() => getDepartments(), []);

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
                <h2 className="h6">Usuarios disponibles</h2>
                <div className="table-responsive">
                  <table className="table table-sm mb-0">
                    <thead>
                      <tr>
                        <th>Login</th>
                        <th>Contraseña</th>
                        <th>Perfil</th>
                        <th>Departamento</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((userItem) => {
                        const profile = profiles.find((profileItem) => profileItem.id === userItem.profileId);
                        const department = departments.find((departmentItem) => departmentItem.id === userItem.departmentId);
                        return (
                          <tr key={userItem.id}>
                            <td>{userItem.login}</td>
                            <td>{userItem.password}</td>
                            <td>{profile?.description ?? 'N/A'}</td>
                            <td>{department?.name ?? 'N/A'}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default LoginPage;
