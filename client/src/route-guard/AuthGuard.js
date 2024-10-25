import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// project import
import useAuth from 'hooks/useAuth';

// ==============================|| AUTH GUARD ||============================== //

const AuthGuard = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      navigate('login', {
        state: {
          from: location.pathname
        },
        replace: true
      });
    }
  }, [navigate, location, token]);

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default AuthGuard;
