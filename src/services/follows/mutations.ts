// src/services/follows/mutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';
import { followApi } from '@/api/follow.api';
import { followKeys } from './keys';
import { profileKeys } from '../profiles/keys';
import type { User } from '@/entities/user/types';

type UserWithFollowers = User & { followers_count?: number };

export const useFollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (targetUserId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      await followApi.followUser(user.id, targetUserId);
    },
    onMutate: async (targetUserId) => {
      await queryClient.cancelQueries({ queryKey: followKeys.isFollowing(targetUserId) });
      await queryClient.cancelQueries({ queryKey: profileKeys.detail(targetUserId) });

      const previousIsFollowing = queryClient.getQueryData(followKeys.isFollowing(targetUserId));
      const previousProfile = queryClient.getQueryData(profileKeys.detail(targetUserId));

      // Optimistically update
      queryClient.setQueryData(followKeys.isFollowing(targetUserId), true);
      queryClient.setQueryData(profileKeys.detail(targetUserId), (old: UserWithFollowers | null) => {
        if (!old) return old;
        return {
          ...old,
          followers_count: (old.followers_count || 0) + 1,
        };
      });

      return { previousIsFollowing, previousProfile, targetUserId };
    },
    onError: (err, targetUserId, context) => {
      if (context) {
        queryClient.setQueryData(
          followKeys.isFollowing(context.targetUserId),
          context.previousIsFollowing
        );
        queryClient.setQueryData(
          profileKeys.detail(context.targetUserId),
          context.previousProfile
        );
      }
    },
    onSettled: (data, error, targetUserId) => {
      queryClient.invalidateQueries({ queryKey: followKeys.isFollowing(targetUserId) });
      queryClient.invalidateQueries({ queryKey: profileKeys.detail(targetUserId) });
      queryClient.invalidateQueries({ queryKey: followKeys.followers(targetUserId) });
    },
  });
};

export const useUnfollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (targetUserId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      await followApi.unfollowUser(user.id, targetUserId);
    },
    onMutate: async (targetUserId) => {
      await queryClient.cancelQueries({ queryKey: followKeys.isFollowing(targetUserId) });
      await queryClient.cancelQueries({ queryKey: profileKeys.detail(targetUserId) });

      const previousIsFollowing = queryClient.getQueryData(followKeys.isFollowing(targetUserId));
      const previousProfile = queryClient.getQueryData(profileKeys.detail(targetUserId));

      queryClient.setQueryData(followKeys.isFollowing(targetUserId), false);
      queryClient.setQueryData(profileKeys.detail(targetUserId), (old: UserWithFollowers | null) => {
        if (!old) return old;
        return {
          ...old,
          followers_count: Math.max((old.followers_count || 0) - 1, 0),
        };
      });

      return { previousIsFollowing, previousProfile, targetUserId };
    },
    onError: (err, targetUserId, context) => {
      if (context) {
        queryClient.setQueryData(
          followKeys.isFollowing(context.targetUserId),
          context.previousIsFollowing
        );
        queryClient.setQueryData(
          profileKeys.detail(context.targetUserId),
          context.previousProfile
        );
      }
    },
    onSettled: (data, error, targetUserId) => {
      queryClient.invalidateQueries({ queryKey: followKeys.isFollowing(targetUserId) });
      queryClient.invalidateQueries({ queryKey: profileKeys.detail(targetUserId) });
      queryClient.invalidateQueries({ queryKey: followKeys.followers(targetUserId) });
    },
  });
};