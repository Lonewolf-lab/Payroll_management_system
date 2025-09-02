import { Navigate, Outlet } from 'react-router-dom';
import AuthService from '@/services/auth-service';

interface ProtectedRouteProps {
  allowedRoles?: string[];
  redirectTo?: string;
}

export const ProtectedRoute = ({
                                 allowedRoles = [],
                                 redirectTo = '/login'
                               }: ProtectedRouteProps) => {
  const user = AuthService.getCurrentUser();
  console.log("Hello")
  console.log(user)
  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // If specific roles are required but user doesn't have any of them, redirect to home
  if (allowedRoles.length > 0 && !user.roles.some(role => allowedRoles.includes(role))) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};