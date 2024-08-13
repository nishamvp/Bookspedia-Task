import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { CheckAuth } from '../../../helpers/api-communicator';

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const storedAuth = localStorage.getItem('isAuth');

      if (storedAuth === 'true') {
        // If already authenticated, set state and do not need API call
        setIsAuthenticated(true);
        return;
      }

      try {
        const data = await CheckAuth();
        const authenticated = data.isAuthenticated;

        // Store and set authentication status
        localStorage.setItem('isAuth', authenticated.toString());
        setIsAuthenticated(authenticated);
      } catch (error) {
        // On error, set authentication status to false
        localStorage.setItem('isAuth', 'false');
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [navigate]);

  // Show loading indicator while checking authentication
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // Redirect based on authentication status
  return isAuthenticated ? <Outlet /> : navigate("/login") ;
};

export default PrivateRoute;
