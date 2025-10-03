import { useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAppDispatch } from '../store';
import { setAuth, clearAuth, setLoading } from '../store/slices/authSlice';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        dispatch(setAuth({ user: session.user, session }));
      } else {
        dispatch(setLoading(false));
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        dispatch(setAuth({ user: session.user, session }));
      } else {
        dispatch(clearAuth());
      }
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
}