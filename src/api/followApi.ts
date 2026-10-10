import axiosInstance from './axiosInstance';
import type { FollowUser, IsFollowingResponse } from '../types';

export const followApi = {
  followUser: async (userId: number): Promise<void> => {
    await axiosInstance.post(`/follow/user/${userId}`);
  },

  unfollowUser: async (userId: number): Promise<void> => {
    await axiosInstance.delete(`/follow/user/${userId}`);
  },

  getFollowers: async (userId: number): Promise<FollowUser[]> => {
    const response = await axiosInstance.get<FollowUser[]>(`/follow/user/${userId}/followers`);
    return response.data;
  },

  getFollowing: async (userId: number): Promise<FollowUser[]> => {
    const response = await axiosInstance.get<FollowUser[]>(`/follow/user/${userId}/following`);
    return response.data;
  },

  isFollowing: async (userId: number): Promise<IsFollowingResponse> => {
    const response = await axiosInstance.get<IsFollowingResponse>(
      `/follow/user/${userId}/is-following`
    );
    return response.data;
  },
};