import React from 'react';

export function RouteErrorBoundary(): React.JSX.Element {
  return (
    <div className="text-white p-6">
      <h1 className="text-xl font-semibold">Something went wrong.</h1>
      <p className="opacity-80">Please try again or go back.</p>
    </div>
  );
}


