import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import { TransactionProvider } from './context/TransactionContext';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Rotas públicas */}
        <Route path="/register" element={
          <AuthProvider>
            <Register />
          </AuthProvider>
        } />
        <Route path="/login" element={
          <AuthProvider>
            <Login />
          </AuthProvider>
        } />
        
        {/* Rotas protegidas */}
        <Route element={
          <AuthProvider>
            <ProtectedRoute />
          </AuthProvider>
        }>
          <Route path="/dashboard" element={
            <TransactionProvider>
              <Dashboard />
            </TransactionProvider>
          } />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
