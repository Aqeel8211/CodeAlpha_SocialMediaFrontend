import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { followApi } from '../api/followApi';

export const useFollowers = (userId: number) => {
  return useQuery({
    queryKey: ['followers', userId],
    queryFn: () => followApi.getFollowers(userId),
    enabled: !!userId,
  });
};

export const useFollowing = (userId: number) => {
  return useQuery({
    queryKey: ['following', userId],
    queryFn: () => followApi.getFollowing(userId),
    enabled: !!userId,
  });
};

export const useIsFollowing = (userId: number) => {
  return useQuery({
    queryKey: ['isFollowing', userId],
    queryFn: () => followApi.isFollowing(userId),
    enabled: !!userId,
  });
};

export const useFollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => followApi.followUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followers'] });
      queryClient.invalidateQueries({ queryKey: ['following'] });
      queryClient.invalidateQueries({ queryKey: ['isFollowing'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

export const useUnfollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => followApi.unfollowUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followers'] });
      queryClient.invalidateQueries({ queryKey: ['following'] });
      queryClient.invalidateQueries({ queryKey: ['isFollowing'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};