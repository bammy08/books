import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (currentUser) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

// Add PropTypes validation for the `children` prop
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
