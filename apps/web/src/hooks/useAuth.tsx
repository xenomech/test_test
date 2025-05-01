"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { STORAGE_KEYS } from "@/constants/keys";
import { getUserApi, loginApi } from "@/services/auth";
import { useRouter } from "next/router";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "@workspace/utils/storage";
import api, { resetAuthHeaders } from "@/lib/api";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = getLocalStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
      if (!token) {
        setIsLoading(false);
        router.push("/auth/login");
      } else {
        const userResponse = await getUserApi();
        setUser(userResponse.data);
        router.push("/app");
      }
    };
    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await loginApi({ username, password });
      setLocalStorageItem(STORAGE_KEYS.ACCESS_TOKEN, response.data.access);
      setLocalStorageItem(STORAGE_KEYS.REFRESH_TOKEN, response.data.refresh);

      api.defaults.headers.common.Authorization = `Bearer ${response.data.access}`;

      const userResponse = await getUserApi();
      setUser(userResponse.data);

      router.push("/app");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid username or password");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    resetAuthHeaders();
    setUser(null);
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
