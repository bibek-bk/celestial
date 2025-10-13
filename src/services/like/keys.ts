export const likeKeys = {
  hasLiked: (postId: string) => ['likes', 'hasLiked', postId] as const,
};


