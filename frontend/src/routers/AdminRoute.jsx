import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/admin" />;
  }
  return children ? children : <Outlet />;
};

// Add PropTypes validation for the `children` prop
AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminRoute;
