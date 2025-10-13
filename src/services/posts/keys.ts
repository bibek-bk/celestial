export const postKeys = {
  all: ['posts'] as const,
  list: () => [...postKeys.all, 'list'] as const,
  byUser: (userId: string) => [...postKeys.all, 'user', userId] as const,
  detail: (postId: string) => [...postKeys.all, 'detail', postId] as const,
};                                                                          


