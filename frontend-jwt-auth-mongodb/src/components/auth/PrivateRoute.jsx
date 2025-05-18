import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';

const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <LoadingSpinner fullPage />;
  }

  // Se não estiver autenticado, redireciona para login
  // Caso contrário, permite acesso à rota protegida
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;