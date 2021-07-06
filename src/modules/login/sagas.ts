import { PayloadAction } from '@reduxjs/toolkit';
import router from 'next/router';
import { takeLatest, all, call, put } from 'redux-saga/effects';
import { request } from 'utils/apiClient';
import { clientCookie } from 'utils/clientCookies';
import {
  dispatchLoginFail,
  dispatchLoginSuccess,
  dispatchLogin,
} from './slice';
import { LoginData } from './types';

function* loginWorker({ payload }: PayloadAction<LoginData>) {
  try {
    const { data } = yield call(request.post, 'login', payload);
    const { accessToken } = data;
    clientCookie.saveToken(accessToken);
    yield put(dispatchLoginSuccess());
    yield call(router.push, '/');
  } catch (error) {
    yield put(dispatchLoginFail());
  }
}

function* loginSaga() {
  yield all([takeLatest(dispatchLogin.type, loginWorker)]);
}

export default loginSaga;
