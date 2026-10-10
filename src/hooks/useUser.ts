import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../api/userApi';
import type { UpdateProfileRequest } from '../types';

export const useProfile = (id: number) => {
  return useQuery({
    queryKey: ['profile', id],
    queryFn: () => userApi.getProfile(id),
    enabled: !!id,
  });
};

export const useMyProfile = () => {
  return useQuery({
    queryKey: ['myProfile'],
    queryFn: () => userApi.getMyProfile(),
  });
};

export const useUpdateMyProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => userApi.updateMyProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myProfile'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

export const useSearchUsers = (query: string) => {
  return useQuery({
    queryKey: ['searchUsers', query],
    queryFn: () => userApi.searchUsers(query),
    enabled: query.trim().length > 0,
  });
};