export const profileKeys = {
    all: ['profiles'] as const,
    detail: (username: string) => [...profileKeys.all, username] as const,
  };