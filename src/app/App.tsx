import { AppProviders } from './providers';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { Analytics } from '@vercel/analytics/react';


export function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
      <Analytics />
    </AppProviders>
  );
}