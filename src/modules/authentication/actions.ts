import { createAction } from '@reduxjs/toolkit';
import { LoginData } from 'modules/admin/login/types';
import { ResetPassData } from 'modules/admin/resetPassword/types';
import { SignupData } from 'modules/admin/signup/types';

const prefix = 'auth/consumer';

export const [dispatchSignup, dispatchSignupSuccess, dispatchSignupFail] = [
  createAction<SignupData>(`${prefix}/dispatchSignup`),
  createAction<{ email: string }>(`${prefix}/dispatchSignupSuccess`),
  createAction(`${prefix}/dispatchSignupFail`),
];

export const [
  dispatchVerifyEmail,
  dispatchVerifyEmailSuccess,
  dispatchVerifyEmailFail,
] = [
  createAction<{ token: string }>(`${prefix}/dispatchVerifyEmail`),
  createAction(`${prefix}/dispatchVerifyEmailSuccess`),
  createAction(`${prefix}/dispatchVerifyEmailFail`),
];

export const [dispatchLogin, dispatchLoginSuccess, dispatchLoginFail] = [
  createAction<LoginData>(`${prefix}/dispatchLogin`),
  createAction(`${prefix}/dispatchLoginSuccess`),
  createAction(`${prefix}/dispatchLoginFail`),
];

export const [
  dispatchForgetPass,
  dispatchForgetPassSuccess,
  dispatchForgetPassFail,
] = [
  createAction<{ email: string }>(`${prefix}/dispatchForgetPass`),
  createAction<{ email: string }>(`${prefix}/dispatchForgetPassSuccess`),
  createAction(`${prefix}/dispatchForgetPassFail`),
];

export const [
  dispatchResetPass,
  dispatchResetPassSuccess,
  dispatchResetPassFail,
] = [
  createAction<ResetPassData>(`${prefix}/dispatchResetPass`),
  createAction(`${prefix}/dispatchResetPassSuccess`),
  createAction(`${prefix}/dispatchResetPassFail`),
];
