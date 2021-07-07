import { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest, all, call, put } from 'redux-saga/effects';
import { request } from 'utils/apiClient';
import {
  resetPassword,
  resetPasswordSuccess,
  resetPasswordFail,
} from './slice';
import { ResetData } from './types';

function* resetPasswordWorker({ payload }: PayloadAction<ResetData>) {
  try {
    yield call(request.post, 'resetpassword', payload);
    yield put(resetPasswordSuccess());
  } catch (error) {
    yield put(resetPasswordFail());
  }
}

function* loginSaga() {
  yield all([takeLatest(resetPassword.type, resetPasswordWorker)]);
}

export default loginSaga;
