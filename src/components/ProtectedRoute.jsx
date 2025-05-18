import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // Enquanto verifica autenticação, mostra um indicador de carregamento
  if (loading) {
    return <div className="loading-container">Carregando...</div>;
  }

  // Se não estiver autenticado, redireciona para o login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver autenticado, renderiza as rotas filhas
  return <Outlet />;
};

export default ProtectedRoute;
