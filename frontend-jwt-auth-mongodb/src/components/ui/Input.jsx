import PropTypes from 'prop-types';
import './Input.scss';

const Input = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  error = '',
  className = '',
  ...props 
}) => {
  return (
    <div className={`input-group ${className}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={error ? 'error' : ''}
        {...props}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  className: PropTypes.string
};

export default Input;