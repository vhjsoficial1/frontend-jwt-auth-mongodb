import { useTransaction } from '../utils/useTransaction';
import { formatDate } from '../utils/formatters';

const TransactionList = ({ transactions, onEdit }) => {
  const { deleteTransaction, loading } = useTransaction();

  // Mapeamento de categorias para exibição em português
  const categoryLabels = {
    food: 'Alimentação',
    transport: 'Transporte',
    salary: 'Salário',
    investment: 'Investimento',
    others: 'Outros'
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta transação?')) {
      await deleteTransaction(id);
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="empty-state">
        <p>Nenhuma transação encontrada. Adicione uma nova transação para começar!</p>
      </div>
    );
  }

  return (
    <div className="transaction-list">
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Data</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr 
              key={transaction._id} 
              className={transaction.type === 'income' ? 'income-row' : 'expense-row'}
            >
              <td>{transaction.description}</td>
              <td>{categoryLabels[transaction.category] || transaction.category}</td>
              <td>{formatDate(transaction.date)}</td>
              <td className={`amount ${transaction.type}`}>
                R$ {transaction.amount.toFixed(2)}
              </td>
              <td className="actions">
                <button 
                  onClick={() => onEdit(transaction)} 
                  className="btn-edit"
                  disabled={loading}
                >
                  Editar
                </button>
                <button 
                  onClick={() => handleDelete(transaction._id)} 
                  className="btn-delete"
                  disabled={loading}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
