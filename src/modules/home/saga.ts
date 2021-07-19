import { all, takeLatest, fork, put, call } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { request } from 'utils/apiClient';
import {
  fetchVideosList,
  fetchVideosListSuccess,
  fetchVideosListError,
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

function* fetchVideosListWorker() {
  try {
    const response = yield call(request.get, API_ENDPOINT.videosList);
    yield put(fetchVideosListSuccess(response));
  } catch (error) {
    yield put(fetchVideosListError());
  }
}

function* assignVideoWorker(action: PayloadAction<assignVideoRequestData>) {
  try {
    const response = yield call(
      request.update,
      API_ENDPOINT.assignVideo,
      action.payload
    );
    yield put(assignVideoSuccess(response));
  } catch (error) {
    yield put(assignVideoError());
  }
}

function* createVideoWorker(
  action: PayloadAction<createAndEditVideoRequestData>
) {
  try {
    yield call(request.post, API_ENDPOINT.createVideo, action.payload);
    yield put(createVideoSuccess());
  } catch (error) {
    yield put(createVideoError());
  }
}

function* editVideoWorker(
  action: PayloadAction<createAndEditVideoRequestData>
) {
  try {
    const { id, name, url, description } = action.payload;
    const response = yield call(
      request.put,
      `${API_ENDPOINT.editVideo}/${id}`,
      { name, url, description }
    );
    yield put(editVideoSuccess(response));
  } catch (error) {
    yield put(editVideoError());
  }
}

function* deleteVideoWorker(action: PayloadAction<any>) {
  try {
    yield call(
      request.delete,
      `${API_ENDPOINT.deleteVideo}/${action.payload}`,
      action.payload
    );
    yield put(deleteVideoSuccess(action.payload));
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
