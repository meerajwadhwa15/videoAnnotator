import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import * as actions from './actions';
import { AuthStatus, ConsumerAuthenState } from './types';

const initialState: ConsumerAuthenState = {
  open: false,
  loading: false,
  status: AuthStatus.resetPass,
};

const authSlice = createSlice({
  name: 'auth/consumer',
  initialState,
  reducers: {
    toggleLoginDialog: (state) => {
      state.open = !state.open;
    },
    setStatus(state, action: PayloadAction<AuthStatus>) {
      state.status = action.payload;
    },
  },
  extraReducers: {
    [actions.dispatchSignup.type](state) {
      state.loading = true;
    },
    [actions.dispatchSignupSuccess.type](state) {
      state.loading = false;
      state.status = AuthStatus.verify;
    },
    [actions.dispatchSignupFail.type](state) {
      state.loading = false;
    },
    [actions.dispatchVerifyEmail.type](state) {
      state.loading = true;
    },
    [actions.dispatchVerifyEmailSuccess.type](state) {
      state.loading = false;
      state.status = AuthStatus.login;
    },
    [actions.dispatchVerifyEmailFail.type](state) {
      state.loading = false;
    },
    [actions.dispatchLogin.type](state) {
      state.loading = true;
    },
    [actions.dispatchLoginSuccess.type](state) {
      state.loading = false;
    },
    [actions.dispatchLoginFail.type](state) {
      state.loading = false;
    },
    [actions.dispatchForgetPass.type](state) {
      state.loading = true;
    },
    [actions.dispatchForgetPassSuccess.type](state) {
      state.loading = false;
      state.status = AuthStatus.resetPass;
    },
    [actions.dispatchForgetPassFail.type](state) {
      state.loading = false;
    },
    [actions.dispatchResetPass.type](state) {
      state.loading = true;
    },
    [actions.dispatchResetPassSuccess.type](state) {
      state.loading = false;
      state.status = AuthStatus.login;
    },
    [actions.dispatchResetPassFail.type](state) {
      state.loading = false;
    },
  },
});

export const { toggleLoginDialog, setStatus } = authSlice.actions;

export const isOpenSelector = (state: RootState) => state.authClient.open;
export const loadingSelector = (state: RootState) => state.authClient.loading;
export const authStatusSelector = (state: RootState) => state.authClient.status;

export default authSlice.reducer;
