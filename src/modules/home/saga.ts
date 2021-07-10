import { all, takeLatest, fork, put, call } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { request } from 'utils/apiClient';
import { assignVideo, assignVideoSuccess, assignVideoError } from './slice';
import { assignVideoRequestData } from './types';

function* assignVideoWorker(action: PayloadAction<assignVideoRequestData>) {
  try {
    const response = yield call(
      request.update,
      '/video/assign',
      action.payload
    );
    yield put(assignVideoSuccess(response));
  } catch (error) {
    yield put(assignVideoError());
  }
}

export function* assignVideoSaga() {
  yield takeLatest(assignVideo.toString(), assignVideoWorker);
}

function* homeSaga() {
  yield all([fork(assignVideoSaga)]);
}

export default homeSaga;
