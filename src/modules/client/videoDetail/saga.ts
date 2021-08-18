import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { i18n } from 'next-i18next';
import { toast } from 'react-toastify';
import { request } from 'utils/apiClient';
import { API_ENDPOINT } from 'utils/constants';
import { SaveAddToData, LikeVideoData } from './types';
import {
  saveAddTo,
  saveAddToSuccess,
  saveAddToFail,
  likeVideo,
  likeVideoSuccess,
  likeVideoFail,
  // ratingVideo,
  // ratingVideoSuccess,
  // ratingVideoFail,
  // postComment,
  // postCommentSuccess,
  // postCommentFail
} from './actions';

function* saveAddToWorker({
  payload,
}: PayloadAction<{ id: number; data: SaveAddToData[] }>) {
  try {
    yield call(
      request.post,
      `${API_ENDPOINT.clientAddToPlayList}/${payload.id}`,
      payload.data
    );
    yield put(saveAddToSuccess());
    yield call(toast.success, i18n?.t('client-video-detail:saveAddToSuccess'));
  } catch (error) {
    yield put(saveAddToFail());
    yield call(toast.error, i18n?.t('client-video-detail:saveAddToFail'));
  }
}

function* likeVideoWorker({
  payload,
}: PayloadAction<{ id: number; data: LikeVideoData }>) {
  try {
    const { id, data } = payload;
    yield call(
      request.post,
      `${API_ENDPOINT.clientVideoLike}/${id}`,
      {},
      { params: data }
    );
    let type = 'none';
    let transMsg = '';

    if (data.isLike && !data.isDislike) {
      type = 'like';
      transMsg = 'client-video-detail:likeVideoSuccess';
    } else if (!data.isLike && data.isDislike) {
      type = 'dislike';
      transMsg = 'client-video-detail:unlikeVideoSuccess';
    }

    yield put(likeVideoSuccess(type));
    if (transMsg) {
      yield call(toast.info, i18n?.t(transMsg));
    }
  } catch (error) {
    yield put(likeVideoFail());
    yield call(toast.error, i18n?.t('client-video-detail:likeVideoFail'));
  }
}

// function* ratingVideoWorker({payload}: PayloadAction<{id: number, data: LikeVideoData}>) {
//   try {
//     yield call(request.post, `${API_ENDPOINT.clientVideoRating}/${payload.id}`, payload.data);
//     yield put(ratingVideoSuccess());
// 		yield call(
// 			toast.success,
// 			i18n?.t('client-video-detail:saveAddToSuccess')
// 		);
//   } catch (error) {
//     yield put(ratingVideoFail());
// 		yield call(
// 			toast.success,
// 			i18n?.t('client-video-detail:saveAddToFail')
// 		);
//   }
// }

// function* postCommentWorker({payload}: PayloadAction<{id: number, data: LikeVideoData}>) {
//   try {
//     yield call(request.post, `${API_ENDPOINT.clientVideoComment}/${payload.id}`, payload.data);
//     yield put(postCommentSuccess());
// 		yield call(
// 			toast.success,
// 			i18n?.t('client-video-detail:postCommentSuccess')
// 		);
//   } catch (error) {
//     yield put(postCommentFail());
// 		yield call(
// 			toast.success,
// 			i18n?.t('client-video-detail:postCommentFail')
// 		);
//   }
// }

function* videoDetailSaga() {
  yield all([
    takeLatest(saveAddTo.type, saveAddToWorker),
    takeLatest(likeVideo.type, likeVideoWorker),
    // takeLatest(ratingVideo.type, ratingVideoWorker),
    // takeLatest(postComment.type, postCommentWorker),
  ]);
}

export default videoDetailSaga;
