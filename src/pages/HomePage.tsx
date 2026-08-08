import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function HomePage() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={user.profileId === 2 ? '/admin-mode' : '/employee'} replace />;
}

export default HomePage;
