import { useState } from 'react';
import { useTransaction } from '../utils/useTransaction';

const TransactionForm = ({ onClose, editingTransaction }) => {
  const { createTransaction, updateTransaction } = useTransaction();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    description: editingTransaction?.description || '',
    amount: editingTransaction?.amount || '',
    type: editingTransaction?.type || 'expense',
    category: editingTransaction?.category || 'others',
    date: editingTransaction?.date 
      ? new Date(editingTransaction.date).toISOString().split('T')[0] 
      : new Date().toISOString().split('T')[0]
  });
  const [errors, setErrors] = useState({});

  // Mapeamento de categorias para exibição em português
  const categoryOptions = {
    food: 'Alimentação',
    transport: 'Transporte',
    salary: 'Salário',
    investment: 'Investimento',
    others: 'Outros'
  };

  // Mapeamento de tipos para exibição em português
  const typeOptions = {
    income: 'Receita',
    expense: 'Despesa'
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }
    
    if (!formData.amount) {
      newErrors.amount = 'Valor é obrigatório';
    } else if (isNaN(formData.amount) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Valor deve ser um número positivo';
    }
    
    if (!formData.category) {
      newErrors.category = 'Categoria é obrigatória';
    }
    
    if (!formData.date) {
      newErrors.date = 'Data é obrigatória';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'amount' ? parseFloat(value) || value : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      if (editingTransaction) {
        await updateTransaction(editingTransaction._id, formData);
      } else {
        await createTransaction(formData);
      }
      onClose();
    } catch (error) {
      console.error('Erro ao salvar transação:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="transaction-form">
      <div className="form-header">
        <h2>{editingTransaction ? 'Editar Transação' : 'Nova Transação'}</h2>
        <button onClick={onClose} className="btn-close">×</button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Ex: Salário, Aluguel, etc."
            disabled={loading}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="amount">Valor (R$)</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            disabled={loading}
          />
          {errors.amount && <span className="error-message">{errors.amount}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="type">Tipo</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            disabled={loading}
          >
            {Object.entries(typeOptions).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Categoria</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            disabled={loading}
          >
            {Object.entries(categoryOptions).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          {errors.category && <span className="error-message">{errors.category}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="date">Data</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.date && <span className="error-message">{errors.date}</span>}
        </div>
        
        <div className="form-actions">
          <button type="button" onClick={onClose} className="btn-secondary" disabled={loading}>
            Cancelar
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
