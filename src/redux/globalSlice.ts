import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';
import { User } from 'models';
interface AppState {
  user: User;
  usersList: User[];
}

const initialState: AppState = {
  user: {
    id: -1,
    email: '',
    fullName: '',
    introduction: '',
    phone: '',
    address: '',
    roles: [],
  },
  usersList: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrentLoginUser(state: AppState, action: PayloadAction<User>) {
      state.user = { ...state.user, ...action.payload };
    },
    fetchUsersListSSR(state: AppState, action: PayloadAction<User[]>) {
      state.usersList = action.payload;
    },
  },
});

export const userDataSelector = (state: RootState) => state.app.user;
export const usersListDataSelector = (state: RootState) => state.app.usersList;

export const { setCurrentLoginUser, fetchUsersListSSR } = appSlice.actions;

export default appSlice.reducer;
