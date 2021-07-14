import { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest, all, call, put } from 'redux-saga/effects';
import { request } from 'utils/apiClient';
import {
  dispatchForgotPassword,
  dispatchForgotPasswordFail,
  dispatchForgotPasswordSuccess,
} from './slice';
import { ForgotPassData } from './types';
import { API_ENDPOINT } from 'utils/constants';

function* forgotPasswordWorker({ payload }: PayloadAction<ForgotPassData>) {
  try {
    yield call(
      request.post,
      `${API_ENDPOINT.forgotPassword}?email=${payload.email}`
    );
    yield put(dispatchForgotPasswordSuccess());
  } catch (error) {
    yield put(dispatchForgotPasswordFail());
  }
}

function* forgotPassSaga() {
  yield all([takeLatest(dispatchForgotPassword.type, forgotPasswordWorker)]);
}

export default forgotPassSaga;
