import { all, takeLatest, put, call } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { request } from 'utils/apiClient';
import {
  getVideoDetail,
  getVideoDetailSuccess,
  getVideoDetailError,
  dispatchUpdatePlaylist,
  dispatchUpdatePlaylistSuccess,
  dispatchUpdatePlaylistFail,
} from './slice';
import { API_ENDPOINT } from 'utils/constants';
import { UpdatePlaylistPayload } from './types';
import { toast } from 'react-toastify';
import { i18n } from 'next-i18next';

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

function* togglePlaylistWorker({
  payload,
}: PayloadAction<UpdatePlaylistPayload>) {
  try {
    yield call(
      request.post,
      `${API_ENDPOINT.clientAddToPlayList}/${payload.videoId}`,
      payload.data
    );
    toast.success(i18n?.t('client-home:updatePlaylistSuccess'));
    yield put(dispatchUpdatePlaylistSuccess(payload));
  } catch (error) {
    toast.error(i18n?.t('client-home:updatePlaylistFail'));
    yield put(dispatchUpdatePlaylistFail());
  }
}

function* clientHomeSaga() {
  yield all([
    takeLatest(getVideoDetail.toString(), fetchVideoDetailWorker),
    takeLatest(dispatchUpdatePlaylist, togglePlaylistWorker),
  ]);
}

export default clientHomeSaga;
