import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute, AuthRoute } from './components/auth/AuthRoute';
import Layout from './components/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Transactions = lazy(() => import('./pages/Transactions'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner fullPage />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Rotas públicas */}
          <Route index element={<Home />} />
          <Route element={<AuthRoute />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* Rotas protegidas */}
          <Route element={<PrivateRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="transactions" element={<Transactions />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}