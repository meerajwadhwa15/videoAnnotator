import { PayloadAction } from '@reduxjs/toolkit';
import router from 'next/router';
import { takeLatest, all, call, put, delay } from 'redux-saga/effects';
import { request } from 'utils/apiClient';
import {
  dispatchSignup,
  dispatchSignupFail,
  dispatchSignupSuccess,
  toggleAlert,
} from './slice';
import { SignupData } from './types';

function* signupWorker({ payload }: PayloadAction<SignupData>) {
  try {
    yield call(request.post, 'signup', payload);
    yield put(dispatchSignupSuccess());
    yield put(toggleAlert());
    yield delay(1000);
    yield call(router.push, '/login');
  } catch (error) {
    yield put(dispatchSignupFail());
  }
}

function* signupSaga() {
  yield all([takeLatest(dispatchSignup.type, signupWorker)]);
}

export default signupSaga;
