import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { routess } from '../../utils/routes';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('authToken');
  const navigate =useNavigate();
  const routes = routess();

  useEffect(()=>{
	if (!token) {
	   return (
		navigate(routes.LOGIN)
	   )
	  }
  }, [token, navigate, routes]);
  if (!token) {
    return null; 
  }

  return children;
}

export default ProtectedRoute;
