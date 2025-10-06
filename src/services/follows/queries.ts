// src/services/follows/queries.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';
import { followApi } from '@/api/follow.api';
import { followKeys } from './keys';


// Check if current user follows target user
export const useIsFollowing = (targetUserId: string) => {
  return useQuery({
    queryKey: followKeys.isFollowing(targetUserId),
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      return followApi.checkIsFollowing(user.id, targetUserId);
    },
    enabled: !!targetUserId,
  });
};

// Get followers list
export const useFollowers = (userId: string) => {
  return useQuery({
    queryKey: followKeys.followers(userId),
    queryFn: () => followApi.getFollowers(userId),
    enabled: !!userId,
  });
};

// Get following list
export const useFollowing = (userId: string) => {
  return useQuery({
    queryKey: followKeys.following(userId),
    queryFn: () => followApi.getFollowing(userId),
    enabled: !!userId,
  });
};