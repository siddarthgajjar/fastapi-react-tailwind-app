import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';  // Import AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>  {/* Wrap your App with AuthProvider */}
      <App />
    </AuthProvider>
  </BrowserRouter>
);
