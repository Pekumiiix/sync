export const QUERY_KEYS = {
  auth: {
    all: ['auth'] as const,
    currentUser: () => [...QUERY_KEYS.auth.all, 'currentUser'] as const
  }
} as const;
