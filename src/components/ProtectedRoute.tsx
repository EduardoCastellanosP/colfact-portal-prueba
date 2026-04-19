import type { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

interface ProtectedRouteProps {
  children?: ReactNode; 
}


export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {

  const { isAuthenticated, isLoading } = useAuth();

  
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>; 
  }
 
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};