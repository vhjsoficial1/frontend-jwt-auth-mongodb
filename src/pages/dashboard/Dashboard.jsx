import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTransaction } from '../../utils/useTransaction';
import TransactionForm from '../../components/TransactionForm';
import TransactionList from '../../components/TransactionList';
import '../../assets/css/dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { transactions, stats, loading, fetchTransactions } = useTransaction();
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAddNew = () => {
    setEditingTransaction(null);
    setShowForm(true);
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingTransaction(null);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Sistema Financeiro</h1>
          <div className="user-info">
            <span>Olá, {user?.name}</span>
            <button onClick={logout} className="btn-logout">
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="stats-container">
          <div className="stat-card income">
            <h3>Receitas</h3>
            <p>R$ {stats.totalIncome.toFixed(2)}</p>
          </div>
          <div className="stat-card expense">
            <h3>Despesas</h3>
            <p>R$ {stats.totalExpense.toFixed(2)}</p>
          </div>
          <div className="stat-card balance">
            <h3>Saldo</h3>
            <p>R$ {stats.balance.toFixed(2)}</p>
          </div>
        </div>

        <div className="transactions-header">
          <h2>Transações</h2>
          <button onClick={handleAddNew} className="btn-add">
            Nova Transação
          </button>
        </div>

        {loading ? (
          <div className="loading">Carregando transações...</div>
        ) : (
          <TransactionList 
            transactions={transactions} 
            onEdit={handleEdit} 
          />
        )}
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <TransactionForm 
              onClose={handleFormClose} 
              editingTransaction={editingTransaction} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
