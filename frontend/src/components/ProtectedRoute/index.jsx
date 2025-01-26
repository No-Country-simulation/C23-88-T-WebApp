import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { routess } from '../../utils/routes';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('authToken');
  const navigate =useNavigate();
  const routes = routess();

  useEffect(()=>{
	if (!token) {
		// Si no hay token, redirige al login
	   return (
		navigate(routes.LOGIN)
	   )
	  }
  }, [token, navigate, routes]);
  if (!token) {
    return null; // Evita que se rendericen los children hasta que la redirección ocurra
  }

  return children;
}

export default ProtectedRoute;
