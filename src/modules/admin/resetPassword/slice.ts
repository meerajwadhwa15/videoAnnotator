import { createSlice, createAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';
import { ResetState, ResetPassData } from './types';

const initialState: ResetState = {
  loading: false,
  message: {
    type: '',
    text: '',
  },
};

export const [
  resetPassword,
  resetPasswordSuccess,
  resetPasswordFail,
  clearMessage,
] = [
  createAction<ResetPassData>('reset/resetPassword'),
  createAction('reset/resetPasswordSuccess'),
  createAction('reset/resetPasswordFail'),
  createAction('reset/clearMessage'),
];

export const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {},
  extraReducers: {
    [resetPassword.type](state: ResetState) {
      state.loading = true;
    },
    [resetPasswordSuccess.type](state: ResetState) {
      state.loading = false;
      state.message.type = 'success';
      state.message.text = 'reset_pw_success';
    },
    [resetPasswordFail.type](state: ResetState) {
      state.loading = false;
      state.message.type = 'error';
      state.message.text = 'reset_pw_error';
    },
    [clearMessage.type](state: ResetState) {
      state.message.type = '';
      state.message.text = '';
    },
  },
});

export const loadingSelector = (state: RootState) =>
  state.resetPassword.loading;
export const messageSelector = (state: RootState) =>
  state.resetPassword.message;

export default resetPasswordSlice.reducer;
