import { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest, all, call, put, delay } from 'redux-saga/effects';
import { request } from 'utils/apiClient';
import {
  dispatchForgotPassword,
  dispatchForgotPasswordFail,
  dispatchForgotPasswordSuccess,
  toggleAlert,
} from './slice';
import { ForgotPassData } from './types';

function* forgotPasswordWorker({ payload }: PayloadAction<ForgotPassData>) {
  try {
    yield call(request.post, 'updatePassword', payload);
    yield put(dispatchForgotPasswordSuccess());
    yield put(toggleAlert());
    yield delay(1000);
  } catch (error) {
    yield put(dispatchForgotPasswordFail());
  }
}

function* forgotPassSaga() {
  yield all([takeLatest(dispatchForgotPassword.type, forgotPasswordWorker)]);
}

export default forgotPassSaga;
