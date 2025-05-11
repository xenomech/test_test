import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/auth';
import { useAuthStore } from '../stores/auth';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { setUser, setToken } = useAuthStore();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  const { setUser, setToken } = useAuthStore();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      logout();
      queryClient.clear();
    },
  });
};

export const useCurrentUser = () => {
  const { user, isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['user'],
    queryFn: authService.getCurrentUser,
    enabled: isAuthenticated,
    initialData: user ? { user, token: '' } : undefined,
  });
};
