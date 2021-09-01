import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from 'redux/store';
import * as actions from './actions';
import { AuthStatus, ConsumerAuthenState } from './types';

const initialState: ConsumerAuthenState = {
  open: false,
  confirmEmail: '',
  loading: false,
  status: AuthStatus.login,
};

const authSlice = createSlice({
  name: 'auth/module',
  initialState,
  reducers: {
    toggleLoginDialog: (state) => {
      if (state.open) {
        state.confirmEmail = '';
        state.loading = false;
        state.status = AuthStatus.login;
      }
      state.open = !state.open;
    },
    setStatus(state, action: PayloadAction<AuthStatus>) {
      state.status = action.payload;
    },
    resetAuthStatus: (state) => {
      state.confirmEmail = '';
      state.loading = false;
      state.status = AuthStatus.login;
    },
  },
  extraReducers: {
    [actions.dispatchSignup.type](state) {
      state.loading = true;
    },
    [actions.dispatchSignupSuccess.type](
      state,
      action: PayloadAction<{ email: string }>
    ) {
      state.loading = false;
      state.confirmEmail = action.payload.email;
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
    [actions.dispatchForgetPassSuccess.type](
      state,
      action: PayloadAction<{ email: string }>
    ) {
      state.loading = false;
      state.confirmEmail = action.payload.email;
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
    [HYDRATE](state, { payload }: PayloadAction<any>) {
      return payload.authClient;
    },
  },
});

export const { toggleLoginDialog, setStatus, resetAuthStatus } =
  authSlice.actions;

export const isOpenSelector = (state: RootState) => state.authClient.open;
export const loadingSelector = (state: RootState) => state.authClient.loading;
export const authStatusSelector = (state: RootState) => state.authClient.status;

export default authSlice.reducer;
