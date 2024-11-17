// src/components/PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Check if the user is authenticated (e.g., by checking localStorage or sessionStorage)
  const token = localStorage.getItem('token'); // or use a global state

  // If the token doesn't exist, redirect to login page
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children; // Render the protected route if user is authenticated
};

export default PrivateRoute;
