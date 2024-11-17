import React, { createContext, useContext, useEffect, useState } from 'react';
import { login } from '../api/authApi';

// Create Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check token on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  // Login function
  const handleLogin = async (username, password) => {
    const response = await login(username, password);
    localStorage.setItem('token', response.data.access_token);
    setIsAuthenticated(true);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use Auth Context
export const useAuth = () => useContext(AuthContext);
