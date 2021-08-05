import { all, takeLatest, fork, put, call } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { request } from 'utils/apiClient';
import {
  getVideoDetail,
  getVideoDetailSuccess,
  getVideoDetailError,
} from './slice';
import { API_ENDPOINT } from 'utils/constants';

function* fetchVideoDetailWorker({ payload }: PayloadAction<number>) {
  try {
    const response = yield call(
      request.get,
      `${API_ENDPOINT.clientVideoList}/${payload}`
    );
    yield put(getVideoDetailSuccess(response));
  } catch (error) {
    yield put(getVideoDetailError());
  }
}

export function* fetchVideoDetailSaga() {
  yield takeLatest(getVideoDetail.toString(), fetchVideoDetailWorker);
}

function* clientHomeSaga() {
  yield all([fork(fetchVideoDetailSaga)]);
}

export default clientHomeSaga;
