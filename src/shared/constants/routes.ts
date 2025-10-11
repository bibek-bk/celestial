
/**
 * Centralized route paths to prevent typos and enable refactoring
 * Usage: navigate(ROUTES.PROFILE(userId))
 */
export const ROUTES = {
    // Public routes
    LOGIN: '/login',
    PUBLIC_PROFILE: (id: string) => `/public/profile/${id}`,
    
    // Authenticated routes
    HOME: '/',
    SEARCH: '/search',
    MESSAGES: '/messages',
    PROFILE: (id: string) => `/profile/${id}`,
  } as const;
  
  // Type helper for route validation
  export type RouteKey = keyof typeof ROUTES;
  export type RoutePath = typeof ROUTES[RouteKey];