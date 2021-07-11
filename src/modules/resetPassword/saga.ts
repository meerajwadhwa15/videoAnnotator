import { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest, all, call, put } from 'redux-saga/effects';
import { request } from 'utils/apiClient';
import {
  resetPassword,
  resetPasswordSuccess,
  resetPasswordFail,
} from './slice';
import { ResetData } from './types';
import { API_ENDPOINT } from 'utils/constants';

function* resetPasswordWorker({ payload }: PayloadAction<ResetData>) {
  try {
    yield call(request.post, API_ENDPOINT.resetPassword, payload);
    yield put(resetPasswordSuccess());
  } catch (error) {
    yield put(resetPasswordFail());
  }
}

function* loginSaga() {
  yield all([takeLatest(resetPassword.type, resetPasswordWorker)]);
}

export default loginSaga;
