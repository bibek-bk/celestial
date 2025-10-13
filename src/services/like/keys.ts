export const likeKeys = {
  all: ['likes'] as const,
  hasLiked: (postId: string) => [...likeKeys.all, 'hasLiked', postId] as const,
};


