import { createSlice, createAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';
import { LoginState, LoginData } from './types';

const initialState: LoginState = {
  loading: false,
  error: '',
};

export const [dispatchLogin, dispatchLoginSuccess, dispatchLoginFail] = [
  createAction<LoginData>('login/dispatchLogin'),
  createAction('login/dispatchLoginSuccess'),
  createAction('login/dispatchLoginFail'),
];

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: {
    [dispatchLogin.type](state: LoginState) {
      state.loading = true;
    },
    [dispatchLoginSuccess.type](state: LoginState) {
      state.loading = false;
    },
    [dispatchLoginFail.type](state: LoginState) {
      state.loading = false;
      state.error = 'login failed';
    },
  },
});

export const loadingSelector = (state: RootState) => state.login.loading;
export const loginErrorSelector = (state: RootState) => state.login.error;

export default loginSlice.reducer;
