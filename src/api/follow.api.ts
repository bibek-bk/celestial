// src/api/follow.api.ts
import { supabase } from '@/lib/supabaseClient';

export interface Follow {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
}

export interface FollowWithProfile extends Follow {
  profiles?: {
    id: string;
    username: string;
    full_name: string;
    avatar_url: string;
  } | null;
}

export const followApi = {
  // Check if current user follows target user
  checkIsFollowing: async (currentUserId: string, targetUserId: string): Promise<boolean> => {
    const { data, error } = await supabase
      .from('follows')
      .select('id')
      .eq('follower_id', currentUserId)
      .eq('following_id', targetUserId)
      .maybeSingle();

    if (error) throw error;
    return !!data;
  },

  // Follow a user
  followUser: async (currentUserId: string, targetUserId: string): Promise<void> => {
    const { error } = await supabase
      .from('follows')
      .insert({
        follower_id: currentUserId,
        following_id: targetUserId,
      });

    if (error) throw error;
  },

  // Unfollow a user
  unfollowUser: async (currentUserId: string, targetUserId: string): Promise<void> => {
    const { error } = await supabase
      .from('follows')
      .delete()
      .eq('follower_id', currentUserId)
      .eq('following_id', targetUserId);

    if (error) throw error;
  },

  // Get followers list
  getFollowers: async (userId: string): Promise<FollowWithProfile[]> => {
    const { data, error } = await supabase
      .from('follows')
      .select(`
        id,
        follower_id,
        following_id,
        created_at,
        profiles:follower_id!single (
          id,
          username,
          full_name,
          avatar_url
        )
      `)
      .eq('following_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    // Transform the data to ensure profiles is a single object, not an array
    return data?.map(item => ({
      ...item,
      profiles: Array.isArray(item.profiles) ? item.profiles[0] || null : item.profiles
    })) || [];
  },

  // Get following list
  getFollowing: async (userId: string): Promise<FollowWithProfile[]> => {
    const { data, error } = await supabase
      .from('follows')
      .select(`
        id,
        follower_id,
        following_id,
        created_at,
        profiles:following_id!single (
          id,
          username,
          full_name,
          avatar_url
        )
      `)
      .eq('follower_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    // Transform the data to ensure profiles is a single object, not an array
    return data?.map(item => ({
      ...item,
      profiles: Array.isArray(item.profiles) ? item.profiles[0] || null : item.profiles
    })) || [];
  },

  // Get followers count
  getFollowersCount: async (userId: string): Promise<number> => {
    const { count, error } = await supabase
      .from('follows')
      .select('*', { count: 'exact', head: true })
      .eq('following_id', userId);

    if (error) throw error;
    return count || 0;
  },

  // Get following count
  getFollowingCount: async (userId: string): Promise<number> => {
    const { count, error } = await supabase
      .from('follows')
      .select('*', { count: 'exact', head: true })
      .eq('follower_id', userId);

    if (error) throw error;
    return count || 0;
  },
};