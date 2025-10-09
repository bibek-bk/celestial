export const likeKeys = {
  all: ['likes'] as const,
  hasLiked: (postId: string) => [...likeKeys.all, 'hasLiked', postId] as const,
  count: (postId: string) => [...likeKeys.all, 'count', postId] as const,
};


