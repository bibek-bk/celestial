// src/services/follows/keys.ts
export const followKeys = {
    all: ['follows'] as const,
    followers: (userId: string) => [...followKeys.all, 'followers', userId] as const,
    following: (userId: string) => [...followKeys.all, 'following', userId] as const,
    isFollowing: (userId: string) => [...followKeys.all, 'isFollowing', userId] as const,
  };