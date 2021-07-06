import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';

interface elementState {
  isSidebarOpen: boolean;
}

const initialState: elementState = {
  isSidebarOpen: false,
};

export const elementSlice = createSlice({
  name: 'element',
  initialState,
  reducers: {
    toggleSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { toggleSidebar } = elementSlice.actions;
export const isSidebarOpen = (state: RootState) => state.element.isSidebarOpen;

export default elementSlice.reducer;
