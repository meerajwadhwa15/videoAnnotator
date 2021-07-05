import { createAction } from '@reduxjs/toolkit';
import { LoginData } from './types';

export const [dispatchLogin, dispatchLoginSuccess, dispatchLoginFail] = [
  createAction<LoginData>('login/dispatchLogin'),
  createAction('dispatchLoginSuccess'),
  createAction('dispatchLoginFail'),
];
