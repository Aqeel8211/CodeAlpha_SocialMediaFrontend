import axiosInstance from './axiosInstance';
import type { AuthResponse, LoginRequest, RegisterRequest } from '../types';

export const authApi = {
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>('/auth/login', data);
    return response.data;
  },
};