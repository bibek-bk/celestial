import { useQuery } from '@tanstack/react-query';
import { postsApi } from '@/api/posts.api';
import { postKeys } from './keys';

export const useGetAllPosts = (userId?: string) => {
  return useQuery({
    queryKey: userId ? postKeys.byUser(userId) : postKeys.list(),
    queryFn: () => postsApi.getAllPosts(userId),
  });
};