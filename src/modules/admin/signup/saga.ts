import { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest, all, call, put, delay } from 'redux-saga/effects';
import { request } from 'utils/apiClient';
import Router from 'next/router';
import {
  dispatchSignup,
  dispatchSignupFail,
  dispatchSignupSuccess,
} from './slice';
import { SignupData } from './types';
import { ADMIN_ROUTING, API_ENDPOINT } from 'utils/constants';

function* signupWorker({ payload }: PayloadAction<SignupData>) {
  try {
    yield call(request.post, API_ENDPOINT.signup, payload);
    yield put(dispatchSignupSuccess());
    yield delay(1000), yield call(Router.push, ADMIN_ROUTING.login);
  } catch (error) {
    yield put(dispatchSignupFail());
  }
}

function* signupSaga() {
  yield all([takeLatest(dispatchSignup.type, signupWorker)]);
}

export default signupSaga;
