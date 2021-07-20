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
} from './actions';
import { SegmentData } from './types';

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

function* videoDetailSaga() {
  yield all([takeLatest(dispatchCreateSegment.type, addNewSegmentWorker)]);
}

export default videoDetailSaga;
