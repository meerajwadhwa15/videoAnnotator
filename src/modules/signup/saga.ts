import { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest, all, call, put } from 'redux-saga/effects';
import { request } from 'utils/apiClient';
import {
  dispatchSignup,
  dispatchSignupFail,
  dispatchSignupSuccess,
} from './slice';
import { SignupData } from './types';
import { API_ENDPOINT } from 'utils/constants';

function* signupWorker({ payload }: PayloadAction<SignupData>) {
  try {
    yield call(request.post, API_ENDPOINT.signup, payload);
    yield put(dispatchSignupSuccess());
  } catch (error) {
    yield put(dispatchSignupFail());
  }
}

function* signupSaga() {
  yield all([takeLatest(dispatchSignup.type, signupWorker)]);
}

export default signupSaga;
