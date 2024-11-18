import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CreateApplicationForm from './pages/CreateApplicationForm';
import EditApplicationPage from './pages/EditApplicationPage'; // Import the EditApplicationPage
import { useAuth } from './hooks/useAuth';
const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();  // Access authentication status from context

  // If user is not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return element;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* If user is authenticated, redirect them from / to /dashboard */}
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protect the Dashboard route */}
      <Route
        path="/dashboard"
        element={<ProtectedRoute element={<DashboardPage />} />}
      />

      {/* Protect other routes similarly */}
      <Route
        path="/applications/create"
        element={<ProtectedRoute element={<CreateApplicationForm />} />}
      />
      <Route
        path="/applications/edit/:id"
        element={<ProtectedRoute element={<EditApplicationPage />} />}
      />
    </Routes>
  );
};

export default AppRoutes;
