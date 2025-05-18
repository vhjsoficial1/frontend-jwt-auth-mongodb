import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Button from './Button';
import './Navbar.scss';

const Navbar = ({ title }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>{title}</h1>
      </div>
      <div className="navbar-actions">
        {user && (
          <Button variant="text" onClick={logout}>
            Sair
          </Button>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired
};

export default Navbar;