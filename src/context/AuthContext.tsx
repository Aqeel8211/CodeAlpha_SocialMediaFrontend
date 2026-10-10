import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { AuthResponse, LoginRequest, RegisterRequest } from '../types';
import axiosInstance from '../api/axiosInstance';

// ============================================
// Context Type
// ============================================
interface AuthContextType {
  user: AuthResponse | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}

// ============================================
// Create Context
// ============================================
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============================================
// Provider
// ============================================
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setIsLoading(false);
  }, []);

  // Save auth data to state and localStorage
  const saveAuthData = (data: AuthResponse) => {
    setUser(data);
    setToken(data.token);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data));
  };

  // Login
  const login = async (data: LoginRequest) => {
    const response = await axiosInstance.post<AuthResponse>('/auth/login', data);
    saveAuthData(response.data);
  };

  // Register
  const register = async (data: RegisterRequest) => {
    const response = await axiosInstance.post<AuthResponse>('/auth/register', data);
    saveAuthData(response.data);
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};