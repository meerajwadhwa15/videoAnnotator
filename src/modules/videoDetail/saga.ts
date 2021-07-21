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

function* addNewSegmentWorker({ payload }: PayloadAction<SegmentData>) {
  try {
    const { videoId, ...data } = payload;
    const result: VideoInfo = yield call(
      request.post,
      `${API_ENDPOINT.addSegment}/${videoId}`,
      data
    );
    yield put(dispatchCreateSegmentSuccess(result));
    yield call(toast.success, '🚀 Create new segment success!');
  } catch (error) {
    const errorMessage = _get(
      error,
      'response.data.message',
      '🚀 Create new segment failed!'
    );
    yield call(toast.error, errorMessage);
    yield put(dispatchCreateSegmentFail());
  }
}

function* editSegmentWorkder({ payload }: PayloadAction<SegmentData>) {
  try {
    const { videoId, ...data } = payload;
    const result: VideoInfo = yield call(
      request.put,
      `${API_ENDPOINT.editSegment}/${videoId}`,
      data
    );
    yield put(dispatchEditSegmentSuccess(result));
    yield call(toast.success, '🚀 Update segment success!');
  } catch (error) {
    const errorMessage = _get(
      error,
      'response.data.message',
      '🚀 Update segment failed!'
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
      `${API_ENDPOINT.deleteSegment}/${videoId}`,
      { segmentId }
    );
    yield put(dispatchDeleteAnnotatorSuccess(result));
    yield call(toast.success, '🚀 Delete segment success!');
  } catch (error) {
    const errorMessage = _get(
      error,
      'response.data.message',
      '🚀 Delete segment failed!'
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
