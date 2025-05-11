import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '../stores/auth';
import { useCurrentUser } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { isLoading, isError } = useCurrentUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate({ to: '/auth/login' });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error loading user data</div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
};
