// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, redirectTo }) => {
  const isAuthenticated = Boolean(localStorage.getItem('token')); // Check if user is authenticated

  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
