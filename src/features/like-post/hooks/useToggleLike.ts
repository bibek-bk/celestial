import { useCallback } from 'react';
import { useAuth } from '@/shared/hooks/useAuth';
import { useLikePost, useUnlikePost } from '@/services/like/mutations';

export const useToggleLike = (postId: string, isLiked: boolean) => {
  const { userId } = useAuth();
  const like = useLikePost();
  const unlike = useUnlikePost();

  const toggle = useCallback(() => {
    if (!userId) return;
    if (isLiked) {
      unlike.mutate({ postId, userId });
    } else {
      like.mutate({ postId, userId });
    }
  }, [userId, isLiked, like, unlike, postId]);

  return {
    toggle,
    isPending: like.isPending || unlike.isPending,
  };
};


