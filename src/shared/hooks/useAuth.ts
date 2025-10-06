import { useAppSelector } from "@/app/store";
import {
  selectAuthUser,
  selectAuthSession,
  selectAuthLoading,
  selectIsAuthenticated,
} from "@/app/store/slices/authSlice";

export function useAuth() {
  const user = useAppSelector(selectAuthUser);
  const session = useAppSelector(selectAuthSession);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectAuthLoading);

  return {
    user,
    session,
    isAuthenticated,
    isLoading,
    userId: user?.id ?? null,
  };
}


