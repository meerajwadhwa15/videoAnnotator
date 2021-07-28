import { PayloadAction } from '@reduxjs/toolkit';
import { VideoInfo } from 'models';
import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/apiClient';
import { API_ENDPOINT } from 'utils/constants';
import _get from 'lodash/get';
import {
  dispatchCreateSegment,
  dispatchCreateSegmentFail,
  dispatchCreateSegmentSuccess,
  dispatchDeleteAnnotator,
  dispatchDeleteAnnotatorFail,
  dispatchDeleteAnnotatorSuccess,
  dispatchEditSegment,
  dispatchEditSegmentFail,
  dispatchEditSegmentSuccess,
} from './actions';
import { DeleteSegmentData, SegmentData } from './types';
import { i18n } from 'next-i18next';
import { uploadImage } from 'utils/helpers';

function* addNewSegmentWorker({ payload }: PayloadAction<SegmentData>) {
  try {
    const { videoId, ...data } = payload;
    const { thumbnail } = data;
    if (typeof thumbnail === 'object') {
      data.thumbnail = yield call(uploadImage, thumbnail);
    }
    const result: VideoInfo = yield call(
      request.post,
      `${API_ENDPOINT.videoSegment({ videoId })}`,
      data
    );
    yield put(dispatchCreateSegmentSuccess(result));
    yield call(
      toast.success,
      i18n?.t('video-detail:createNewAnnotationSuccess')
    );
  } catch (error) {
    const errorMessage = _get(
      error,
      'response.data.message',
      i18n?.t('video-detail:createNewAnnotationFail')
    );
    yield call(toast.error, errorMessage);
    yield put(dispatchCreateSegmentFail());
  }
}

function* editSegmentWorkder({ payload }: PayloadAction<SegmentData>) {
  try {
    const { videoId, ...data } = payload;
    const { thumbnail } = data;
    if (typeof thumbnail === 'object') {
      data.thumbnail = yield call(uploadImage, thumbnail);
    }
    const result: VideoInfo = yield call(
      request.put,
      `${API_ENDPOINT.videoSegment({ videoId })}/${data.id}`,
      data
    );
    yield put(dispatchEditSegmentSuccess(result));
    yield call(toast.success, i18n?.t('video-detail:updateAnnotationSuccess'));
  } catch (error) {
    const errorMessage = _get(
      error,
      'response.data.message',
      i18n?.t('video-detail:updateAnnotationFail')
    );
    yield call(toast.error, errorMessage);
    yield put(dispatchEditSegmentFail());
  }
}

function* deleteSegmentWorkder({ payload }: PayloadAction<DeleteSegmentData>) {
  try {
    const { videoId, segmentId } = payload;
    const result: VideoInfo = yield call(
      request.delete,
      `${API_ENDPOINT.videoSegment({ videoId })}/${segmentId}`,
      { segmentId }
    );
    yield put(dispatchDeleteAnnotatorSuccess(result));
    yield call(toast.success, i18n?.t('video-detail:deleteAnnotationSuccess'));
  } catch (error) {
    const errorMessage = _get(
      error,
      'response.data.message',
      i18n?.t('video-detail:deleteAnnotationFail')
    );
    yield call(toast.error, errorMessage);
    yield put(dispatchDeleteAnnotatorFail());
  }
}

function* videoDetailSaga() {
  yield all([
    takeLatest(dispatchCreateSegment.type, addNewSegmentWorker),
    takeLatest(dispatchEditSegment.type, editSegmentWorkder),
    takeLatest(dispatchDeleteAnnotator.type, deleteSegmentWorkder),
  ]);
}

export default videoDetailSaga;
