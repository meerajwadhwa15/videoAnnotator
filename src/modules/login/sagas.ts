import { PayloadAction } from '@reduxjs/toolkit';
import router from 'next/router';
import { takeLatest, all, call, put } from 'redux-saga/effects';
import { request } from 'utils/apiClient';
import * as actions from './actions';
import { LoginData } from './types';

function* loginWorker({ payload }: PayloadAction<LoginData>) {
  try {
    const { data } = yield call(request.post, 'login', payload);
    console.log('data', data);
    yield put(actions.dispatchLoginSuccess());
    yield call(router.push, '/');
  } catch (error) {
    yield put(actions.dispatchLoginFail());
  }
}

function* loginSaga() {
  yield all([takeLatest(actions.dispatchLogin.type, loginWorker)]);
}

export default loginSaga;
