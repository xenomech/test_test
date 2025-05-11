import { axiosInstance } from '../lib/axios';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  username: string;
}

interface AuthResponse {
  user: {
    id: number;
    email: string;
    username: string;
  };
  token: string;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>('/auth/login/', {
      username: credentials.email,
      password: credentials.password,
    });
    return response.data;
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>('/auth/register/', {
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
    });
    return response.data;
  },

  logout: async (): Promise<void> => {
    await axiosInstance.post('/auth/logout/');
  },

  getCurrentUser: async (): Promise<AuthResponse> => {
    const response = await axiosInstance.get<AuthResponse>('/auth/me/');
    return response.data;
  },

  refreshToken: async (): Promise<{ token: string }> => {
    const response = await axiosInstance.post<{ token: string }>('/auth/refresh/');
    return response.data;
  },
};
