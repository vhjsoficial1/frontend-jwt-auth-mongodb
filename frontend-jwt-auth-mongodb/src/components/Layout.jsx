import PropTypes from 'prop-types';
import Navbar from './ui/Navbar';
import './Layout.scss';

const Layout = ({ children, title = 'Finance App' }) => {
  return (
    <div className="layout">
      <Navbar title={title} />
      <main className="layout-content">
        {children}
      </main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};

export default Layout;