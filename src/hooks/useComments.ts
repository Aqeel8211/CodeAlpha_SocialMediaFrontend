import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { commentApi } from '../api/commentApi';
import type { CreateCommentRequest, UpdateCommentRequest } from '../types';

export const useComments = (postId: number) => {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => commentApi.getCommentsByPostId(postId),
    enabled: !!postId,
  });
};

export const useAddComment = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCommentRequest) =>
      commentApi.addComment(postId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    },
  });
};

export const useUpdateComment = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCommentRequest }) =>
      commentApi.updateComment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    },
  });
};

export const useDeleteComment = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => commentApi.deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    },
  });
};