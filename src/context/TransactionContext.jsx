import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0
  });

  // Buscar todas as transações
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await api.get('/transactions');
      setTransactions(response.data.data.transactions);
      await fetchStats();
    } catch (error) {
      toast.error('Erro ao carregar transações');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Buscar estatísticas
  const fetchStats = async () => {
    try {
      const response = await api.get('/transactions/stats');
      setStats({
        totalIncome: response.data.totalIncome || 0,
        totalExpense: response.data.totalExpense || 0,
        balance: response.data.balance || 0
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

  // Criar nova transação
  const createTransaction = async (transactionData) => {
    setLoading(true);
    try {
      const response = await api.post('/transactions', transactionData);
      const newTransaction = response.data.data.transaction;
      
      // Atualizar a lista de transações
      setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
      
      // Atualizar estatísticas imediatamente
      if (newTransaction.type === 'income') {
        setStats(prevStats => ({
          ...prevStats,
          totalIncome: prevStats.totalIncome + newTransaction.amount,
          balance: prevStats.balance + newTransaction.amount
        }));
      } else {
        setStats(prevStats => ({
          ...prevStats,
          totalExpense: prevStats.totalExpense + newTransaction.amount,
          balance: prevStats.balance - newTransaction.amount
        }));
      }
      
      // Buscar estatísticas atualizadas do servidor
      await fetchStats();
      
      toast.success('Transação criada com sucesso!');
      return true;
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao criar transação';
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Atualizar transação
  const updateTransaction = async (id, transactionData) => {
    setLoading(true);
    try {
      const response = await api.put(`/transactions/${id}`, transactionData);
      const updatedTransaction = response.data.data.transaction;
      
      // Encontrar a transação antiga para calcular a diferença
      const oldTransaction = transactions.find(t => t._id === id);
      
      // Atualizar a lista de transações
      setTransactions(prevTransactions => 
        prevTransactions.map(transaction =>
          transaction._id === id ? updatedTransaction : transaction
        )
      );
      
      // Atualizar estatísticas imediatamente
      if (oldTransaction && updatedTransaction) {
        // Se o tipo mudou, precisamos ajustar ambas as categorias
        if (oldTransaction.type !== updatedTransaction.type) {
          if (updatedTransaction.type === 'income') {
            // Mudou de despesa para receita
            setStats(prevStats => ({
              ...prevStats,
              totalIncome: prevStats.totalIncome + updatedTransaction.amount,
              totalExpense: prevStats.totalExpense - oldTransaction.amount,
              balance: prevStats.balance + updatedTransaction.amount + oldTransaction.amount
            }));
          } else {
            // Mudou de receita para despesa
            setStats(prevStats => ({
              ...prevStats,
              totalIncome: prevStats.totalIncome - oldTransaction.amount,
              totalExpense: prevStats.totalExpense + updatedTransaction.amount,
              balance: prevStats.balance - updatedTransaction.amount - oldTransaction.amount
            }));
          }
        } else {
          // Mesmo tipo, só mudou o valor
          const difference = updatedTransaction.amount - oldTransaction.amount;
          
          if (updatedTransaction.type === 'income') {
            setStats(prevStats => ({
              ...prevStats,
              totalIncome: prevStats.totalIncome + difference,
              balance: prevStats.balance + difference
            }));
          } else {
            setStats(prevStats => ({
              ...prevStats,
              totalExpense: prevStats.totalExpense + difference,
              balance: prevStats.balance - difference
            }));
          }
        }
      }
      
      // Buscar estatísticas atualizadas do servidor
      await fetchStats();
      
      toast.success('Transação atualizada com sucesso!');
      return true;
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao atualizar transação';
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Excluir transação
  const deleteTransaction = async (id) => {
    setLoading(true);
    try {
      // Encontrar a transação a ser excluída para ajustar as estatísticas
      const transactionToDelete = transactions.find(t => t._id === id);
      
      await api.delete(`/transactions/${id}`);
      
      // Atualizar a lista de transações
      setTransactions(prevTransactions => 
        prevTransactions.filter(transaction => transaction._id !== id)
      );
      
      // Atualizar estatísticas imediatamente
      if (transactionToDelete) {
        if (transactionToDelete.type === 'income') {
          setStats(prevStats => ({
            ...prevStats,
            totalIncome: prevStats.totalIncome - transactionToDelete.amount,
            balance: prevStats.balance - transactionToDelete.amount
          }));
        } else {
          setStats(prevStats => ({
            ...prevStats,
            totalExpense: prevStats.totalExpense - transactionToDelete.amount,
            balance: prevStats.balance + transactionToDelete.amount
          }));
        }
      }
      
      // Buscar estatísticas atualizadas do servidor
      await fetchStats();
      
      toast.success('Transação excluída com sucesso!');
      return true;
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao excluir transação';
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        stats,
        loading,
        fetchTransactions,
        createTransaction,
        updateTransaction,
        deleteTransaction
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContext;
