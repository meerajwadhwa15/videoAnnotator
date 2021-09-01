import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { User } from 'models';
import { HYDRATE } from 'next-redux-wrapper';
interface GlobalState {
  user: User;
  usersList: User[];
}

const initialState: GlobalState = {
  user: {
    id: -1,
    email: '',
    fullName: '',
    introduction: '',
    phone: '',
    address: '',
    roles: [],
    avatar: '',
  },
  usersList: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrentLoginUser(state: GlobalState, action: PayloadAction<User>) {
      state.user = { ...state.user, ...action.payload };
    },
    fetchUsersListSSR(state: GlobalState, action: PayloadAction<User[]>) {
      state.usersList = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE](state, { payload }: PayloadAction<any>) {
      return payload.app;
    },
  },
});

export const userDataSelector = (state: RootState) => state.app.user;
export const usersListDataSelector = (state: RootState) => state.app.usersList;

export const { setCurrentLoginUser, fetchUsersListSSR } = appSlice.actions;

export default appSlice.reducer;
