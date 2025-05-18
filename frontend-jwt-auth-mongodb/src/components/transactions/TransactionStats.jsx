import PropTypes from 'prop-types';
import { formatCurrency } from '../../utils/helpers';

const TransactionStats = ({ stats }) => {
  const income = stats.find(s => s._id === 'income') || { totalAmount: 0 };
  const expense = stats.find(s => s._id === 'expense') || { totalAmount: 0 };
  const balance = income.totalAmount - expense.totalAmount;

  return (
    <div className="transaction-stats">
      <div className="stat-card balance">
        <h3>Saldo</h3>
        <p className={balance >= 0 ? 'positive' : 'negative'}>
          {formatCurrency(balance)}
        </p>
      </div>
      
      <div className="stat-card income">
        <h3>Receitas</h3>
        <p>+ {formatCurrency(income.totalAmount)}</p>
      </div>
      
      <div className="stat-card expense">
        <h3>Despesas</h3>
        <p>- {formatCurrency(expense.totalAmount)}</p>
      </div>
    </div>
  );
};

TransactionStats.propTypes = {
  stats: PropTypes.array.isRequired
};

export default TransactionStats;