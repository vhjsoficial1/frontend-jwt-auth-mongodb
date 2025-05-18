import PropTypes from 'prop-types';
import './LoadingSpinner.scss';

const LoadingSpinner = ({ fullPage = false, className = '' }) => {
  return (
    <div className={`loading-spinner ${fullPage ? 'full-page' : ''} ${className}`}>
      <div className="loader"></div>
    </div>
  );
};

LoadingSpinner.propTypes = {
  fullPage: PropTypes.bool,
  className: PropTypes.string
};

export default LoadingSpinner;