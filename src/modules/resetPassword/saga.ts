import { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest, all, call, put, delay } from 'redux-saga/effects';
import { request } from 'utils/apiClient';
import Router from 'next/router';
import {
  resetPassword,
  resetPasswordSuccess,
  resetPasswordFail,
} from './slice';
import { ResetData } from './types';
import { API_ENDPOINT } from 'utils/constants';

function* resetPasswordWorker({ payload }: PayloadAction<ResetData>) {
  try {
    const { token, ...data } = payload;
    yield call(
      request.post,
      `${API_ENDPOINT.resetPassword}?token=${token}`,
      data
    );
    yield put(resetPasswordSuccess());
    yield delay(1000);
    yield call(Router.push, '/login');
  } catch (error) {
    yield put(resetPasswordFail());
  }
}

function* resetPasswordSaga() {
  yield all([takeLatest(resetPassword.type, resetPasswordWorker)]);
}

export default resetPasswordSaga;
