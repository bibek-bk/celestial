// import { ReduxProvider } from './ReduxProvider';
import { QueryProvider } from './QueryProvider';
// import { AuthProvider } from './AuthProvider';

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    // <ReduxProvider>
      <QueryProvider>
        {/* <AuthProvider> */}
          {children}
        {/* </AuthProvider> */}
      </QueryProvider>
    // </ReduxProvider>
  );
}