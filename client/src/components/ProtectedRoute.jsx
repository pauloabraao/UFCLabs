import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import getCookie from '../utils/getCookies';

const ProtectedRoute = () => {
  // Verifica se o token de autenticação existe no cookie.
  const token = getCookie('token');
  // Se não houver token, redireciona para a página de login.
  if (!token) {
    return <Navigate to="/" replace />;
  }
  // Se houver token, renderiza o componente filho (a página protegida).
  return <Outlet />;
};

export default ProtectedRoute;