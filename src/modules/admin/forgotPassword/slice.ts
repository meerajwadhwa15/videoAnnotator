import { createSlice, createAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';
import { ForgotPassData, ForgotPassState } from './types';

const initialState: ForgotPassState = {
  loading: false,
  message: {
    type: '',
    text: '',
  },
};

export const [
  dispatchForgotPassword,
  dispatchForgotPasswordSuccess,
  dispatchForgotPasswordFail,
  clearMessage,
] = [
  createAction<ForgotPassData>('forgotPass/dispatchForgotPassword'),
  createAction('forgotPass/dispatchForgotPasswordSuccess'),
  createAction('forgotPass/dispatchForgotPasswordFail'),
  createAction('forgotPass/clearMessage'),
];

export const forgotPassSlice = createSlice({
  name: 'forgotPass',
  initialState,
  reducers: {},
  extraReducers: {
    [dispatchForgotPassword.type](state: ForgotPassState) {
      state.loading = true;
    },
    [dispatchForgotPasswordSuccess.type](state: ForgotPassState) {
      state.loading = false;
      state.message.type = 'success';
      state.message.text = 'fp_success';
    },
    [dispatchForgotPasswordFail.type](state: ForgotPassState) {
      state.loading = false;
      state.message.type = 'error';
      state.message.text = 'fp_error';
    },
    [clearMessage.type](state: ForgotPassState) {
      state.message.type = '';
      state.message.text = '';
    },
  },
});

// selectors
export const loadingSelector = (state: RootState) => state.forgotPass.loading;
export const messageSelector = (state: RootState) => state.forgotPass.message;

export default forgotPassSlice.reducer;
