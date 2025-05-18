import { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Verifica e valida o token JWT
  const verifyToken = useCallback(async (token) => {
    try {
      const { exp } = JSON.parse(atob(token.split('.')[1]));
      if (exp * 1000 < Date.now()) {
        throw new Error('Token expirado');
      }
      
      // Verificação adicional com o backend se necessário
      const response = await api.get('/api/protected', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      return response.data.user;
    } catch (error) {
      localStorage.removeItem('token');
      throw error;
    }
  }, []);

  // Inicializa a autenticação
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const userData = await verifyToken(token);
        setUser({ token, ...userData });
      } catch (error) {
        console.error('Falha na verificação do token:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [verifyToken]);

  // Função de login
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      
      localStorage.setItem('token', data.token);
      const userData = await verifyToken(data.token);
      
      setUser({ token: data.token, ...userData });
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro no login:', error);
      toast.error(error.response?.data?.message || 'Erro ao fazer login');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Função de registro
  const register = async (userData) => {
    setIsLoading(true);
    try {
      await api.post('/api/auth/register', userData);
      toast.success('Registro realizado! Faça login para continuar.');
      navigate('/login');
    } catch (error) {
      console.error('Erro no registro:', error);
      
      if (error.response?.data?.message.includes('senha')) {
        toast.error('A senha deve ter pelo menos 6 caracteres');
      } else if (error.response?.data?.message.includes('email')) {
        toast.error('Este email já está em uso');
      } else {
        toast.error('Erro ao registrar. Tente novamente.');
      }
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Você foi desconectado com sucesso');
    navigate('/login');
  };

  // Verifica se a rota requer autenticação
  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
      await verifyToken(token);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        checkAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};