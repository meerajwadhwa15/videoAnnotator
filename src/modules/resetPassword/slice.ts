import { createSlice, createAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';
import { ResetState, ResetData } from './types';

const initialState: ResetState = {
  loading: false,
  error: '',
};

export const [resetPassword, resetPasswordSuccess, resetPasswordFail] = [
  createAction<ResetData>('reset/resetPassword'),
  createAction('reset/resetPasswordSuccess'),
  createAction('reset/resetPasswordFail'),
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
    },
    [resetPasswordFail.type](state: ResetState) {
      state.loading = false;
      state.error = 'reset password failed';
    },
  },
});

export const loadingSelector = (state: RootState) =>
  state.resetPassword.loading;
export const errorSelector = (state: RootState) => state.resetPassword.error;

export default resetPasswordSlice.reducer;
