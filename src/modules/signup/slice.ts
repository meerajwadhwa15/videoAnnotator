import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';
import { SignupData, SignupState } from './types';

const initialState: SignupState = {
  loading: false,
  error: '',
  alert: false,
};

export const [dispatchSignup, dispatchSignupSuccess, dispatchSignupFail] = [
  createAction<SignupData>('signup/dispatchSignup'),
  createAction('signup/dispatchSignupSuccess'),
  createAction<string>('signup/dispatchSignupFail'),
];

export const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    toggleAlert(state: SignupState) {
      state.alert = !state.alert;
    },
  },
  extraReducers: {
    [dispatchSignup.type](state: SignupState) {
      state.loading = true;
    },
    [dispatchSignupSuccess.type](state: SignupState) {
      state.loading = false;
      state.error = '';
    },
    [dispatchSignupFail.type](
      state: SignupState,
      action: PayloadAction<string>
    ) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// actions
export const { toggleAlert } = signupSlice.actions;

// selectors
export const loadingSelector = (state: RootState) => state.signup.loading;
export const signupErrorSelector = (state: RootState) => state.signup.error;
export const alertSelector = (state: RootState) => state.signup.alert;

export default signupSlice.reducer;
