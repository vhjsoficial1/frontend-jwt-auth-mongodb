import { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../ui/Input';
import Button from '../ui/Button';

const AuthForm = ({ isLogin = false, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpa o erro quando o usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    const data = isLogin 
      ? { email: formData.email, password: formData.password }
      : formData;
      
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {!isLogin && (
        <Input
          label="Nome"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />
      )}
      
      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />
      
      <Input
        label="Senha"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        required
        minLength={6}
      />
      
      {!isLogin && (
        <Input
          label="Confirmar Senha"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          required
          minLength={6}
        />
      )}
      
      <Button 
        type="submit" 
        variant="primary" 
        disabled={isLoading}
        className="auth-submit-btn"
      >
        {isLoading ? (
          <span className="loading-dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
        ) : isLogin ? 'Entrar' : 'Registrar'}
      </Button>
    </form>
  );
};

AuthForm.propTypes = {
  isLogin: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

export default AuthForm;