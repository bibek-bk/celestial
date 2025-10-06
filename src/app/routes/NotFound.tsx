import React from 'react';

export function NotFound(): React.JSX.Element {
  return (
    <div className="text-white p-6">
      <h1 className="text-xl font-semibold">404 - Page not found</h1>
      <p className="opacity-80">The page you are looking for does not exist.</p>
    </div>
  );
}


