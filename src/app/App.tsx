import { AppProviders } from './providers';
import { Sidebar } from '@/shared/components/ui/Sidebar';
import AuthForm from '@/features/auth/AuthForm';
import { Feed } from '@/features/feed';
import ProfilePage from '@/features/profile/components/ProfilePage';

export function App() {
  return (
    <AppProviders>
      <div className="min-h-screen w-full bg-black">
        <div className="flex w-full">
          <div className="px-6">
            <Sidebar />
          </div>

          <div className="flex flex-col w-full items-center justify-center">
            <ProfilePage />
            <AuthForm />
            <Feed className="w-md" />
          </div>
        </div>
      </div>
    </AppProviders>
  );
}