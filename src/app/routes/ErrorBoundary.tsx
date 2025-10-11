// src/app/routes/ErrorBoundary.tsx
import React from 'react';
import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';

/**
 * Route-level error boundary with typed error handling
 * Catches navigation errors, component errors, and HTTP errors
 */
export function RouteErrorBoundary(): React.JSX.Element {
  const error = useRouteError();

  // Handle HTTP-like errors (404, 403, etc.)
  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
            <h1 className="text-4xl font-bold mb-2">404</h1>
            <p className="text-white/60 mb-6">Page not found</p>
            <Link 
              to={ROUTES.HOME} 
              className="px-4 py-2 bg-white text-black rounded-lg hover:bg-white/90 transition"
            >
              Go Home
            </Link>
          </div>
        );
      
      case 403:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
            <h1 className="text-4xl font-bold mb-2">403</h1>
            <p className="text-white/60 mb-6">Access Denied</p>
            <Link 
              to={ROUTES.HOME} 
              className="px-4 py-2 bg-white text-black rounded-lg hover:bg-white/90 transition"
            >
              Go Home
            </Link>
          </div>
        );
      
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
            <h1 className="text-4xl font-bold mb-2">{error.status}</h1>
            <p className="text-white/60 mb-6">{error.statusText || 'Something went wrong'}</p>
            <Link 
              to={ROUTES.HOME} 
              className="px-4 py-2 bg-white text-black rounded-lg hover:bg-white/90 transition"
            >
              Go Home
            </Link>
          </div>
        );
    }
  }

  // Handle unexpected errors (component crashes, etc.)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-semibold mb-2">Oops! Something went wrong</h1>
      <p className="text-white/60 mb-6">
        {error instanceof Error ? error.message : 'An unexpected error occurred'}
      </p>
      <div className="flex gap-4">
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition"
        >
          Reload Page
        </button>
        <Link 
          to={ROUTES.HOME} 
          className="px-4 py-2 bg-white text-black rounded-lg hover:bg-white/90 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}