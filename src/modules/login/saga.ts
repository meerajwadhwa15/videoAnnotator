import { PayloadAction } from '@reduxjs/toolkit';
import router from 'next/router';
import { takeLatest, all, call, put } from 'redux-saga/effects';
import { request, setAuthorizationHeader } from 'utils/apiClient';
import { clientCookies } from 'utils/clientCookies';
import {
  dispatchLoginFail,
  dispatchLoginSuccess,
  dispatchLogin,
} from './slice';
import { LoginData } from './types';

function* loginWorker({ payload }: PayloadAction<LoginData>) {
  try {
    const { remember, ...data } = payload;
    const result = yield call(request.post, '/user/signin', data);
    const token = result.token.replace('Bearer ', '');
    clientCookies.saveToken({ token, remember });
    setAuthorizationHeader();
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
