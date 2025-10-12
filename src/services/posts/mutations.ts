import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postsApi, type CreatePostPayload } from '@/api/posts.api';
import { supabase } from '@/lib/supabaseClient';
import { postKeys } from './keys';
import { useToast } from '@/shared/components/ui/useToast';

export const useUploadImage = () => {
  const { success, error } = useToast();
  
  return useMutation({
    mutationFn: ({ file, userId }: { file: File; userId: string }) =>
      postsApi.uploadImage(file, userId),
    onSuccess: () => {
      success('Image uploaded', 'Your image is ready to be posted.');
    },
    onError: (err) => {
      error('Failed to upload image', err instanceof Error ? err.message : 'Please try again with a different image.');
    },
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const { success, error } = useToast();

  return useMutation({
    mutationFn: (payload: CreatePostPayload) => postsApi.createPost(payload),
    onSuccess: (newPost) => {
      queryClient.invalidateQueries({ queryKey: postKeys.list() });
      queryClient.invalidateQueries({ queryKey: postKeys.byUser(newPost.user_id) });
      success('Post created successfully!', 'Your post has been shared with your followers.');
    },
    onError: (err) => {
      error('Failed to create post', err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    },
  });
};

export const useDeleteImage = () => {
  const { success, error } = useToast();
  return useMutation({
    mutationFn: (imageUrl: string) => postsApi.deleteImage(imageUrl),
    onSuccess: () => {
      success('Image deleted', 'The image has been removed.');
    },
    onError: (err) => {
      error('Failed to delete image', err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    },
  });
};

export const useGetCurrentUserId = async (): Promise<string> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');
  return user.id;
};


