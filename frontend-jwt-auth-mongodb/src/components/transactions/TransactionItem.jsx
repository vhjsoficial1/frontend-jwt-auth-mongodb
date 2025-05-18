import PropTypes from 'prop-types';
import Button from '../ui/Button';
import { formatCurrency, formatDate } from '../../utils/helpers';

const TransactionItem = ({ transaction, onEdit, onDelete }) => {
  const isIncome = transaction.type === 'income';
  const categoryMap = {
    food: 'Alimentação',
    transport: 'Transporte',
    salary: 'Salário',
    investment: 'Investimento',
    others: 'Outros'
  };

  return (
    <div className={`transaction-item ${isIncome ? 'income' : 'expense'}`}>
      <div className="transaction-info">
        <h3>{transaction.description}</h3>
        <p className="transaction-category">{categoryMap[transaction.category]}</p>
        <p className="transaction-date">{formatDate(transaction.date)}</p>
      </div>
      <div className="transaction-amount">
        {isIncome ? '+' : '-'} {formatCurrency(transaction.amount)}
      </div>
      <div className="transaction-actions">
        <Button variant="text" size="small" onClick={() => onEdit(transaction)}>
          Editar
        </Button>
        <Button 
          variant="text" 
          size="small" 
          className="danger"
          onClick={() => onDelete(transaction._id)}
        >
          Excluir
        </Button>
      </div>
    </div>
  );
};

TransactionItem.propTypes = {
  transaction: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default TransactionItem;