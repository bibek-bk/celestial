import { AppProviders } from './providers';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';

export function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}