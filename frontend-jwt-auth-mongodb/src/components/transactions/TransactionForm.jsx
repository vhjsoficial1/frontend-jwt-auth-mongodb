import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

const TransactionForm = ({ onSubmit, initialData, onCancel, isLoading }) => {
  const [formData, setFormData] = useState(initialData || {
    description: '',
    amount: '',
    type: 'expense',
    category: 'food',
    date: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});

  const categories = [
    { value: 'food', label: 'Alimentação' },
    { value: 'transport', label: 'Transporte' },
    { value: 'salary', label: 'Salário' },
    { value: 'investment', label: 'Investimento' },
    { value: 'others', label: 'Outros' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.description.trim()) newErrors.description = 'Descrição é obrigatória';
    if (!formData.amount || Number(formData.amount) <= 0) newErrors.amount = 'Valor inválido';
    if (!formData.date) newErrors.date = 'Data inválida';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    onSubmit({
      ...formData,
      amount: Number(formData.amount)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <h2>{initialData ? 'Editar Transação' : 'Nova Transação'}</h2>
      
      <Input
        label="Descrição"
        name="description"
        value={formData.description}
        onChange={handleChange}
        error={errors.description}
        required
      />
      
      <Input
        label="Valor"
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        step="0.01"
        min="0.01"
        error={errors.amount}
        required
      />
      
      <Select
        label="Tipo"
        name="type"
        value={formData.type}
        onChange={handleChange}
        options={[
          { value: 'income', label: 'Receita' },
          { value: 'expense', label: 'Despesa' }
        ]}
      />
      
      <Select
        label="Categoria"
        name="category"
        value={formData.category}
        onChange={handleChange}
        options={categories}
      />
      
      <Input
        label="Data"
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        error={errors.date}
        required
      />
      
      <div className="form-actions">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Salvando...' : 'Salvar'}
        </Button>
      </div>
    </form>
  );
};

TransactionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  isLoading: PropTypes.bool
};

export default TransactionForm;