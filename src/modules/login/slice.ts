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

export const [dispatchLogin, dispatchLoginSuccess, dispatchLoginFail] = [
  createAction<LoginData>('login/dispatchLogin'),
  createAction('login/dispatchLoginSuccess'),
  createAction('login/dispatchLoginFail'),
];

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    clearMessage(state) {
      state.message.type = '';
      state.message.text = '';
    },
  },
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
  },
});

export const loadingSelector = (state: RootState) => state.login.loading;
export const messageSelector = (state: RootState) => state.login.message;
export const { clearMessage } = loginSlice.actions;

export default loginSlice.reducer;
