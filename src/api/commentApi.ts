import axiosInstance from './axiosInstance';
import type { Comment, CreateCommentRequest, UpdateCommentRequest } from '../types';

export const commentApi = {
  getCommentsByPostId: async (postId: number): Promise<Comment[]> => {
    const response = await axiosInstance.get<Comment[]>(`/comment/post/${postId}`);
    return response.data;
  },

  addComment: async (postId: number, data: CreateCommentRequest): Promise<Comment> => {
    const response = await axiosInstance.post<Comment>(`/comment/post/${postId}`, data);
    return response.data;
  },

  updateComment: async (id: number, data: UpdateCommentRequest): Promise<Comment> => {
    const response = await axiosInstance.put<Comment>(`/comment/${id}`, data);
    return response.data;
  },

  deleteComment: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/comment/${id}`);
  },
};