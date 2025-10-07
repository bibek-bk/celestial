import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postsApi, type CreatePostPayload } from '@/api/posts.api';
import { supabase } from '@/lib/supabaseClient';
import { postKeys } from './keys';

export const useUploadImage = () => {
  return useMutation({
    mutationFn: ({ file, userId }: { file: File; userId: string }) =>
      postsApi.uploadImage(file, userId),
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePostPayload) => postsApi.createPost(payload),
    onSuccess: (newPost) => {
      queryClient.invalidateQueries({ queryKey: postKeys.list() });
      queryClient.invalidateQueries({ queryKey: postKeys.byUser(newPost.user_id) });
    },
  });
};

export const useDeleteImage = () => {
  return useMutation({
    mutationFn: (imageUrl: string) => postsApi.deleteImage(imageUrl),
  });
};

export const useGetCurrentUserId = async (): Promise<string> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');
  return user.id;
};


