import { useQuery } from '@tanstack/react-query';
import { postsApi } from '@/api/posts.api';

export const useGetAllPosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => postsApi.getAllPosts(),
  });
};