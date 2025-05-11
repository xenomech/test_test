import createPersistedStore from './index';

interface User {
  id: number;
  email: string;
  username: string;
}

interface AuthState {
  user: User | null;
  tokens: {
    access: string | null;
    refresh: string | null;
  };
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setTokens: (access: string, refresh: string) => void;
  logout: () => void;
}

export const useAuthStore = createPersistedStore<AuthState>(
  (set) => ({
    user: null,
    tokens: {
      access: null,
      refresh: null,
    },
    isAuthenticated: false,
    setUser: (user) => set({ user, isAuthenticated: !!user }),
    setTokens: (access, refresh) =>
      set({ tokens: { access, refresh } }),
    logout: () => {
      set({
        user: null,
        tokens: {
          access: null,
          refresh: null,
        },
        isAuthenticated: false,
      });
    },
  }),
  "auth-storage",
  {
    partialize: (state) => ({
      user: state.user,
      tokens: state.tokens,
      isAuthenticated: state.isAuthenticated,
    }),
  }
);
