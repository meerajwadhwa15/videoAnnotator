import { all, takeLatest, fork, put, call } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { request } from 'utils/apiClient';
import {
  assignVideo,
  assignVideoSuccess,
  assignVideoError,
  createVideo,
  createVideoSuccess,
  createVideoError,
  editVideo,
  editVideoSuccess,
  editVideoError,
  deleteVideo,
  deleteVideoSuccess,
  deleteVideoError,
} from './slice';
import { assignVideoRequestData, createAndEditVideoRequestData } from './types';
import { API_ENDPOINT } from 'utils/constants';
import {
  fetchVideosList,
  fetchVideosListError,
  fetchVideosListSuccess,
} from './actions';
import { uploadImage } from 'utils/helpers';

function* fetchVideosListWorker() {
  try {
    const response = yield call(request.get, API_ENDPOINT.video);
    yield put(fetchVideosListSuccess(response));
  } catch (error) {
    yield put(fetchVideosListError());
  }
}

function* assignVideoWorker({
  payload,
}: PayloadAction<assignVideoRequestData>) {
  try {
    const response = yield call(
      request.update,
      `${API_ENDPOINT.video}/${payload.id}`,
      payload
    );
    yield put(assignVideoSuccess(response));
  } catch (error) {
    yield put(assignVideoError());
  }
}

function* createVideoWorker({
  payload,
}: PayloadAction<createAndEditVideoRequestData>) {
  try {
    const { thumbnail } = payload;
    if (typeof thumbnail === 'object') {
      payload.thumbnail = yield call(uploadImage, thumbnail);
    }
    const response = yield call(request.post, API_ENDPOINT.video, payload);
    yield put(createVideoSuccess(response));
  } catch (error) {
    yield put(createVideoError());
  }
}

function* editVideoWorker({
  payload,
}: PayloadAction<createAndEditVideoRequestData>) {
  try {
    const { id, ...data } = payload;
    const { thumbnail } = data;
    if (typeof thumbnail === 'object') {
      data.thumbnail = yield call(uploadImage, thumbnail);
    }
    const response = yield call(
      request.put,
      `${API_ENDPOINT.video}/${id}`,
      data
    );
    yield put(editVideoSuccess(response));
  } catch (error) {
    yield put(editVideoError());
  }
}

function* deleteVideoWorker({ payload }: PayloadAction<any>) {
  try {
    yield call(request.delete, `${API_ENDPOINT.video}/${payload}`);
    yield put(deleteVideoSuccess(payload));
  } catch (error) {
    yield put(deleteVideoError());
  }
}

export function* fetchVideosListSaga() {
  yield takeLatest(fetchVideosList.toString(), fetchVideosListWorker);
}

export function* assignVideoSaga() {
  yield takeLatest(assignVideo.toString(), assignVideoWorker);
}

export function* createVideoSaga() {
  yield takeLatest(createVideo.toString(), createVideoWorker);
}

export function* editVideoSaga() {
  yield takeLatest(editVideo.toString(), editVideoWorker);
}

export function* deleteVideoSaga() {
  yield takeLatest(deleteVideo.toString(), deleteVideoWorker);
}

function* homeSaga() {
  yield all([
    fork(fetchVideosListSaga),
    fork(assignVideoSaga),
    fork(createVideoSaga),
    fork(editVideoSaga),
    fork(deleteVideoSaga),
  ]);
}

export default homeSaga;
