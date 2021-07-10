import { createSlice, createAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';
import { LoginState, LoginData } from './types';

const initialState: LoginState = {
  loading: false,
  message: {
    type: '',
    text: '',
  },
};

export const [
  dispatchLogin,
  dispatchLoginSuccess,
  dispatchLoginFail,
  clearMessage,
] = [
  createAction<LoginData>('login/dispatchLogin'),
  createAction('login/dispatchLoginSuccess'),
  createAction('login/dispatchLoginFail'),
  createAction('login/clearMessage'),
];

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: {
    [dispatchLogin.type](state: LoginState) {
      state.loading = true;
      state.message.type = '';
      state.message.text = '';
    },
    [dispatchLoginSuccess.type](state: LoginState) {
      state.loading = false;
      state.message.type = 'success';
      state.message.text = 'login_success';
    },
    [dispatchLoginFail.type](state: LoginState) {
      state.loading = false;
      state.message.type = 'error';
      state.message.text = 'login_error';
    },
    [clearMessage.type](state: LoginState) {
      state.message.type = '';
      state.message.text = '';
    },
  },
});

export const loadingSelector = (state: RootState) => state.login.loading;
export const messageSelector = (state: RootState) => state.login.message;

export default loginSlice.reducer;
