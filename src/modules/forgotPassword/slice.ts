import { createSlice, createAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';
import { ForgotPassData, ForgotPassState } from './types';

const initialState: ForgotPassState = {
  loading: false,
  error: '',
  alert: false,
};

export const [
  dispatchForgotPassword,
  dispatchForgotPasswordSuccess,
  dispatchForgotPasswordFail,
] = [
  createAction<ForgotPassData>('forgotPass/dispatchForgotPassword'),
  createAction('forgotPass/dispatchForgotPasswordSuccess'),
  createAction('forgotPass/dispatchForgotPasswordFail'),
];

export const forgotPassSlice = createSlice({
  name: 'forgotPass',
  initialState,
  reducers: {
    toggleAlert(state: ForgotPassState) {
      state.alert = !state.alert;
    },
  },
  extraReducers: {
    [dispatchForgotPassword.type](state: ForgotPassState) {
      state.loading = true;
    },
    [dispatchForgotPasswordSuccess.type](state: ForgotPassState) {
      state.loading = false;
      state.error = '';
    },
    [dispatchForgotPasswordFail.type](state: ForgotPassState) {
      state.loading = false;
      state.error = 'request failed';
    },
  },
});

// actions
export const { toggleAlert } = forgotPassSlice.actions;

// selectors
export const loadingSelector = (state: RootState) => state.forgotPass.loading;
export const errorSelector = (state: RootState) => state.forgotPass.error;
export const alertSelector = (state: RootState) => state.forgotPass.alert;

export default forgotPassSlice.reducer;
