import { useQuery } from '@tanstack/react-query';
import { postsApi } from '@/api/posts.api';

export const useGetAllPosts = (userId?: string) => {
  return useQuery({
    queryKey: ['posts', userId],
    queryFn: () => postsApi.getAllPosts(userId),
  });
};