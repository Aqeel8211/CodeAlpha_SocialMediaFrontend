import axiosInstance from './axiosInstance';
import type { LikeCountResponse } from '../types';

export const likeApi = {
  likePost: async (postId: number): Promise<void> => {
    await axiosInstance.post(`/like/post/${postId}`);
  },

  unlikePost: async (postId: number): Promise<void> => {
    await axiosInstance.delete(`/like/post/${postId}`);
  },

  getLikesCount: async (postId: number): Promise<LikeCountResponse> => {
    const response = await axiosInstance.get<LikeCountResponse>(`/like/post/${postId}/count`);
    return response.data;
  },
};