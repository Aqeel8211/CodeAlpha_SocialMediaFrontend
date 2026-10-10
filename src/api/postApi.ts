import axiosInstance from './axiosInstance';
import type { Post, CreatePostRequest, UpdatePostRequest } from '../types';

export const postApi = {
  getFeed: async (page: number = 1, pageSize: number = 10): Promise<Post[]> => {
    const response = await axiosInstance.get<Post[]>('/post/feed', {
      params: { page, pageSize },
    });
    return response.data;
  },

  getUserPosts: async (userId: number): Promise<Post[]> => {
    const response = await axiosInstance.get<Post[]>(`/post/user/${userId}`);
    return response.data;
  },

  getPostById: async (id: number): Promise<Post> => {
    const response = await axiosInstance.get<Post>(`/post/${id}`);
    return response.data;
  },

  createPost: async (data: CreatePostRequest): Promise<Post> => {
    const response = await axiosInstance.post<Post>('/post', data);
    return response.data;
  },

  updatePost: async (id: number, data: UpdatePostRequest): Promise<Post> => {
    const response = await axiosInstance.put<Post>(`/post/${id}`, data);
    return response.data;
  },

  deletePost: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/post/${id}`);
  },
};