import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likeApi } from '../api/likeApi';

export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => likeApi.likePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      queryClient.invalidateQueries({ queryKey: ['post'] });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    },
  });
};

export const useUnlikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => likeApi.unlikePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      queryClient.invalidateQueries({ queryKey: ['post'] });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    },
  });
};