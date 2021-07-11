import { createSlice, createAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';
import { SignupData, SignupState } from './types';

const initialState: SignupState = {
  loading: false,
  message: {
    type: '',
    text: '',
  },
};

export const [
  dispatchSignup,
  dispatchSignupSuccess,
  dispatchSignupFail,
  clearMessage,
] = [
  createAction<SignupData>('signup/dispatchSignup'),
  createAction('signup/dispatchSignupSuccess'),
  createAction('signup/dispatchSignupFail'),
  createAction('signup/clearMessage'),
];

export const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {},
  extraReducers: {
    [dispatchSignup.type](state: SignupState) {
      state.loading = true;
    },
    [dispatchSignupSuccess.type](state: SignupState) {
      state.loading = false;
      state.message.type = 'success';
      state.message.text = 'signup_success';
    },
    [dispatchSignupFail.type](state: SignupState) {
      state.loading = false;
      state.message.type = 'error';
      state.message.text = 'signup_error';
    },
    [clearMessage.type](state: SignupState) {
      state.message.type = '';
      state.message.text = '';
    },
  },
});

// selectors
export const loadingSelector = (state: RootState) => state.signup.loading;
export const messageSelector = (state: RootState) => state.signup.message;

export default signupSlice.reducer;
