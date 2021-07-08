import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'models/user.model';
import type { RootState } from 'redux/store';

interface AppState {
  user: User;
}

const initialState: AppState = {
  user: {
    email: '',
    fullName: '',
    roles: [],
  },
};

export const appSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setCurrentLoginUser(state: AppState, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
});

export const userDataSelector = (state: RootState) => state.app.user;

export const { setCurrentLoginUser } = appSlice.actions;

export default appSlice.reducer;
