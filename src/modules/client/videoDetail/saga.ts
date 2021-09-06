import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { i18n } from 'next-i18next';
import { toast } from 'react-toastify';
import { request } from 'utils/apiClient';
import { API_ENDPOINT } from 'utils/constants';
import { SaveAddToData, LikeVideoData, RatingVideoData } from './types';
import {
  saveAddTo,
  saveAddToSuccess,
  saveAddToFail,
  likeVideo,
  likeVideoSuccess,
  likeVideoFail,
  ratingVideo,
  ratingVideoSuccess,
  ratingVideoFail,
  postComment,
  postCommentSuccess,
  postCommentFail,
  editComment,
  editCommentSuccess,
  editCommentFail,
  deleteComment,
  deleteCommentSuccess,
  deleteCommentFail,
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
    yield call(request.post, `${API_ENDPOINT.clientVideoLike}/${id}`, data);
    let type = 'none';
    let transMsg = '';

    if (data.like && !data.dislike) {
      type = 'like';
      transMsg = 'client-video-detail:likeVideoSuccess';
    } else if (!data.like && data.dislike) {
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

function* ratingVideoWorker({
  payload,
}: PayloadAction<{ id: number; data: RatingVideoData }>) {
  try {
    const response = yield call(
      request.post,
      `${API_ENDPOINT.clientVideoRating}/${payload.id}`,
      payload.data
    );
    yield put(ratingVideoSuccess(response));
    yield call(toast.success, i18n?.t('client-video-detail:updateSuccess'));
  } catch (error) {
    yield put(ratingVideoFail());
    yield call(toast.error, i18n?.t('client-video-detail:ratingVideoFail'));
  }
}

function* postCommentWorker({
  payload,
}: PayloadAction<{ id: number; content: string }>) {
  try {
    const response = yield call(
      request.post,
      `${API_ENDPOINT.clientVideoComment}/${payload.id}`,
      {
        content: payload.content,
      }
    );
    yield put(postCommentSuccess(response));
  } catch (error) {
    yield put(postCommentFail());
    yield call(toast.error, i18n?.t('client-video-detail:updateError'));
  }
}

function* editCommentWorker({
  payload,
}: PayloadAction<{ id: number; content: string }>) {
  try {
    const response = yield call(
      request.put,
      `${API_ENDPOINT.clientVideoComment}/${payload.id}`,
      { content: payload.content }
    );

    yield put(editCommentSuccess(response));
    yield call(
      toast.success,
      i18n?.t('client-video-detail:editCommentSuccess')
    );
  } catch (error) {
    yield put(editCommentFail());
    yield call(toast.error, i18n?.t('client-video-detail:updateError'));
  }
}

function* deleteCommentWorker({ payload }: PayloadAction<number>) {
  try {
    const response = yield call(
      request.delete,
      `${API_ENDPOINT.clientVideoComment}/${payload}`
    );
    // if (
    //   Array.isArray(response.commentList) &&
    //   response.commentList.length > 0
    // ) {
    //   response.commentList.sort((a, b) => {
    //     return b.id - a.id;
    //   });
    // }

    yield put(deleteCommentSuccess(response));
    yield call(
      toast.success,
      i18n?.t('client-video-detail:deleteCommentSuccess')
    );
  } catch (error) {
    yield put(deleteCommentFail());
    yield call(toast.error, i18n?.t('client-video-detail:updateError'));
  }
}

function* videoDetailSaga() {
  yield all([
    takeLatest(saveAddTo.type, saveAddToWorker),
    takeLatest(likeVideo.type, likeVideoWorker),
    takeLatest(ratingVideo.type, ratingVideoWorker),
    takeLatest(postComment.type, postCommentWorker),
    takeLatest(editComment.type, editCommentWorker),
    takeLatest(deleteComment.type, deleteCommentWorker),
  ]);
}

export default videoDetailSaga;
