import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';
import { LoginState } from './types';
import extraReducers from './extraReducers';

const initialState: LoginState = {
  loading: false,
  error: '',
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers,
});

export const loadingSelector = (state: RootState) => state.login.loading;
export const loginErrorSelector = (state: RootState) => state.login.error;

export default loginSlice.reducer;
