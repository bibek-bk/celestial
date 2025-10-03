import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  activeModal: string | null;
}

const initialState: UiState = {
  theme: 'dark',
  sidebarOpen: true,
  activeModal: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    openModal: (state, action: PayloadAction<string>) => {
      state.activeModal = action.payload;
    },
    closeModal: (state) => {
      state.activeModal = null;
    },
  },
});

export const { toggleTheme, toggleSidebar, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;