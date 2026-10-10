import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postApi } from '../api/postApi';
import type { CreatePostRequest, UpdatePostRequest, Post } from '../types';

export const useFeed = (page: number = 1, pageSize: number = 10) => {
  return useQuery({
    queryKey: ['feed', page, pageSize],
    queryFn: () => postApi.getFeed(page, pageSize),
  });
};

export const useUserPosts = (userId: number) => {
  return useQuery({
    queryKey: ['userPosts', userId],
    queryFn: () => postApi.getUserPosts(userId),
    enabled: !!userId,
  });
};

export const usePost = (id: number) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => postApi.getPostById(id),
    enabled: !!id,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostRequest) => postApi.createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePostRequest }) =>
      postApi.updatePost(id, data),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
      queryClient.invalidateQueries({ queryKey: ['post', variables.id] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => postApi.deletePost(id),
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ['feed'] });
      await queryClient.cancelQueries({ queryKey: ['userPosts'] });

      const previousFeedPages = queryClient.getQueriesData<Post[]>({
        queryKey: ['feed'],
      });
      const previousUserPosts = queryClient.getQueriesData<Post[]>({
        queryKey: ['userPosts'],
      });

      queryClient.setQueriesData<Post[]>({ queryKey: ['feed'] }, (old) =>
        old ? old.filter((post) => post.id !== id) : old
      );

      queryClient.setQueriesData<Post[]>({ queryKey: ['userPosts'] }, (old) =>
        old ? old.filter((post) => post.id !== id) : old
      );

      return { previousFeedPages, previousUserPosts };
    },
    onError: (_err, _id, context) => {
      if (context?.previousFeedPages) {
        context.previousFeedPages.forEach(([key, data]) => {
          queryClient.setQueryData(key, data);
        });
      }
      if (context?.previousUserPosts) {
        context.previousUserPosts.forEach(([key, data]) => {
          queryClient.setQueryData(key, data);
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
      queryClient.removeQueries({ queryKey: ['post'] });
    },
  });
};