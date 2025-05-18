import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';

const AuthRoute = () => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <LoadingSpinner fullPage />;
  }

  // Se estiver autenticado, redireciona para a página inicial
  // Caso contrário, permite acesso às rotas de autenticação
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default AuthRoute;