import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User, Session } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  session: null,
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ user: User; session: Session }>) => {
      state.user = action.payload.user;
      state.session = action.payload.session;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    clearAuth: (state) => {
      state.user = null;
      state.session = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setAuth, clearAuth, setLoading } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectAuthUser = (state: { auth: AuthState }) => state.auth.user;
export const selectAuthSession = (state: { auth: AuthState }) => state.auth.session;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.isLoading;