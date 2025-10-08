import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout, AuthenticatedLayout } from '@/app/layout';
import { RequireAuth } from '@/shared/components/guards/RequireAuth';
import { RedirectIfAuthenticated } from '@/shared/components/guards/RedirectIfAuthenticated';
import { RouteErrorBoundary } from './ErrorBoundary';
import { NotFound } from './NotFound';

// Lazy pages (from src/pages)
const FeedPage = lazy(() => import('@/pages/FeedPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const AuthPage = lazy(() => import('@/pages/AuthPage'));
const SearchComingSoon = lazy(() => import('@/pages/SearchComingSoon'));
const MessagesComingSoon = lazy(() => import('@/pages/MessagesComingSoon'));

// Simple role meta and gate
type AppRole = 'guest' | 'user';
type RouteMeta = { roles?: AppRole[] };

function withRoleGate(element: React.ReactNode, meta?: RouteMeta) {
  if (!meta?.roles || meta.roles.length === 0) return element;
  // For now, map: user-only routes guarded by RequireAuth; guest routes via RedirectIfAuthenticated
  const requiresUser = meta.roles.includes('user');
  const guestOnly = meta.roles.includes('guest') && !meta.roles.includes('user');
  if (requiresUser) {
    return <RequireAuth to="/login" loadingFallback={null}>{element}</RequireAuth>;
  }
  if (guestOnly) {
    return <RedirectIfAuthenticated to="/app">{element}</RedirectIfAuthenticated>;
  }
  return element;
}

const withSuspense = (node: React.ReactNode) => (
  <Suspense fallback={<div className="text-white p-6">Loading...</div>}>{node}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RequireAuth to="/login">
        <AuthenticatedLayout />
      </RequireAuth>
    ),
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: withSuspense(withRoleGate(<FeedPage />, { roles: ['user'] })),
      },
      {
        path: 'search',
        element: withSuspense(withRoleGate(<SearchComingSoon />, { roles: ['user'] })),
      },
      {
        path: 'messages',
        element: withSuspense(withRoleGate(<MessagesComingSoon />, { roles: ['user'] })),
      },
      {
        path: 'profile/:id',
        element: withSuspense(withRoleGate(<ProfilePage />, { roles: ['user'] })),
      },
    ],
  },
  {
    // Pathless layout so it doesn't shadow the authenticated '/' branch
    element: <PublicLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: '/login',
        element: withSuspense(withRoleGate(<AuthPage />, { roles: ['guest'] })),
      },
      {
        path: '/public/profile/:id',
        // Public profile page viewable by guests; actions inside page should self-guard
        element: withSuspense(<ProfilePage />),
      },
    ],
  },
  { path: '*', element: <NotFound /> },
]);


