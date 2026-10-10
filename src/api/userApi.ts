import axiosInstance from './axiosInstance';
import type { UserProfile, UpdateProfileRequest, UserSearchResult } from '../types';

export const userApi = {
  getProfile: async (id: number): Promise<UserProfile> => {
    const response = await axiosInstance.get<UserProfile>(`/user/${id}`);
    return response.data;
  },

  getMyProfile: async (): Promise<UserProfile> => {
    const response = await axiosInstance.get<UserProfile>('/user/me');
    return response.data;
  },

  updateMyProfile: async (data: UpdateProfileRequest): Promise<UserProfile> => {
    const response = await axiosInstance.put<UserProfile>('/user/me', data);
    return response.data;
  },

  searchUsers: async (query: string): Promise<UserSearchResult[]> => {
    const response = await axiosInstance.get<UserSearchResult[]>('/user/search', {
      params: { query },
    });
    return response.data;
  },
};