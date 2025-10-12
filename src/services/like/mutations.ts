import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likeApi } from '@/api/like.api';
import { postKeys } from '@/services/posts/keys';
import { likeKeys } from './keys';
import { useToast } from '@/shared/components/ui/useToast';

type PostCacheShape = {
  id: string;
  likes: number; // existing field name in PostCard props
  isLiked: boolean; // existing field name in PostCard props
  user?: { username: string; avatar: string };
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  const { success, error } = useToast();

  return useMutation({
    mutationFn: async ({ postId, userId }: { postId: string; userId: string }) => {
      await likeApi.insertLike(postId, userId);
    },
    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries({ queryKey: postKeys.all });
      await queryClient.cancelQueries({ queryKey: likeKeys.hasLiked(postId) });
      await queryClient.cancelQueries({ queryKey: likeKeys.count(postId) });

      const listPrev = queryClient.getQueriesData<PostCacheShape[]>({ queryKey: postKeys.all });

      const detailPrev = queryClient.getQueryData<PostCacheShape>(postKeys.detail(postId));

      // Optimistically update any lists containing this post
      listPrev.forEach(([key, old]) => {
        if (!old) return;
        const updated = old.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1, isLiked: true } : p));
        queryClient.setQueryData(key, updated);
      });

      // Optimistically update detail cache
      if (detailPrev) {
        queryClient.setQueryData(postKeys.detail(postId), {
          ...detailPrev,
          likes: Math.max(0, detailPrev.likes + 1),
          isLiked: true,
        });
      }

      // Optimistically set hasLiked query
      queryClient.setQueryData(likeKeys.hasLiked(postId), true);
      queryClient.setQueryData(likeKeys.count(postId), (prev: number | undefined) => (typeof prev === 'number' ? prev + 1 : undefined));

      return { listPrev, detailPrev };
    },
    onError: (_err, { postId }, ctx) => {
      error('Failed to like post', 'Something went wrong. Please try again.');
      // rollback
      ctx?.listPrev?.forEach(([key, old]) => {
        if (old) queryClient.setQueryData(key, old);
      });
      if (ctx?.detailPrev) {
        queryClient.setQueryData(postKeys.detail(postId), ctx.detailPrev);
      }
      queryClient.setQueryData(likeKeys.hasLiked(postId), false);
      queryClient.setQueryData(likeKeys.count(postId), (prev: number | undefined) => prev);
    },
    onSuccess: () => {
      success('Post liked', 'You liked this post.');
    },
    onSettled: (_data, _error, { postId }) => {
      // Optionally invalidate for consistency
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) });
      queryClient.invalidateQueries({ queryKey: postKeys.list() });
      queryClient.invalidateQueries({ queryKey: likeKeys.hasLiked(postId) });
      queryClient.invalidateQueries({ queryKey: likeKeys.count(postId) });
    },
  });
};

export const useUnlikePost = () => {
  const queryClient = useQueryClient();
  const { success, error } = useToast();

  return useMutation({
    mutationFn: async ({ postId, userId }: { postId: string; userId: string }) => {
      await likeApi.deleteLike(postId, userId);
    },
    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries({ queryKey: postKeys.all });
      await queryClient.cancelQueries({ queryKey: likeKeys.hasLiked(postId) });
      await queryClient.cancelQueries({ queryKey: likeKeys.count(postId) });

      const listPrev = queryClient.getQueriesData<PostCacheShape[]>({ queryKey: postKeys.all });
      const detailPrev = queryClient.getQueryData<PostCacheShape>(postKeys.detail(postId));

      listPrev.forEach(([key, old]) => {
        if (!old) return;
        const updated = old.map((p) => (p.id === postId ? { ...p, likes: Math.max(0, p.likes - 1), isLiked: false } : p));
        queryClient.setQueryData(key, updated);
      });

      if (detailPrev) {
        queryClient.setQueryData(postKeys.detail(postId), {
          ...detailPrev,
          likes: Math.max(0, detailPrev.likes - 1),
          isLiked: false,
        });
      }

      queryClient.setQueryData(likeKeys.hasLiked(postId), false);
      queryClient.setQueryData(likeKeys.count(postId), (prev: number | undefined) => (typeof prev === 'number' ? Math.max(0, prev - 1) : undefined));

      return { listPrev, detailPrev };
    },
    onError: (_err, { postId }, ctx) => {
      error('Failed to unlike post', 'Something went wrong. Please try again.');
      ctx?.listPrev?.forEach(([key, old]) => {
        if (old) queryClient.setQueryData(key, old);
      });
      if (ctx?.detailPrev) {
        queryClient.setQueryData(postKeys.detail(postId), ctx.detailPrev);
      }
      queryClient.setQueryData(likeKeys.hasLiked(postId), true);
      queryClient.setQueryData(likeKeys.count(postId), (prev: number | undefined) => prev);
    },
    onSuccess: () => {
      success('Post unliked', 'You removed your like.');
    },
    onSettled: (_data, _error, { postId }) => {
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) });
      queryClient.invalidateQueries({ queryKey: postKeys.list() });
      queryClient.invalidateQueries({ queryKey: likeKeys.hasLiked(postId) });
      queryClient.invalidateQueries({ queryKey: likeKeys.count(postId) });
    },
  });
};


