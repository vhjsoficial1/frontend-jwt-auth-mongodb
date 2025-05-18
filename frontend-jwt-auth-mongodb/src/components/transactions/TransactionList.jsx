import PropTypes from 'prop-types';
import TransactionItem from './TransactionItem';
import LoadingSpinner from '../ui/LoadingSpinner';

const TransactionList = ({ transactions, loading, onEdit, onDelete }) => {
  if (loading) return <LoadingSpinner />;
  
  if (transactions.length === 0) {
    return (
      <div className="empty-transactions">
        <p>Nenhuma transação encontrada</p>
      </div>
    );
  }

  return (
    <div className="transaction-list">
      {transactions.map(transaction => (
        <TransactionItem
          key={transaction._id}
          transaction={transaction}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

TransactionList.propTypes = {
  transactions: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default TransactionList;