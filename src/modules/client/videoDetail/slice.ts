import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';
import { VideoInfo } from 'models';
import { RatingVideoData, VideoDetailState } from './types';
import { CommentsList } from 'models';
import { AlertMessageType } from 'utils/types';
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

const initialState: VideoDetailState = {
  videoDetail: {} as VideoInfo,
  loading: false,
  addToLoading: false,
  ratingVideoLoading: false,
  commentLoading: false,
  message: {
    type: AlertMessageType.default,
    text: '',
  },
};

export const videoDetailSlice = createSlice({
  name: 'clientVideoDetail',
  initialState,
  reducers: {
    fetchVideoDetailSSR(
      state: VideoDetailState,
      action: PayloadAction<VideoInfo>
    ) {
      state.videoDetail = action.payload;
    },
    clearMessage(state) {
      state.message.type = AlertMessageType.default;
      state.message.text = '';
    },
  },
  extraReducers: {
    [saveAddTo.type](state: VideoDetailState) {
      state.addToLoading = true;
    },
    [saveAddToSuccess.type](state: VideoDetailState) {
      state.addToLoading = false;
    },
    [saveAddToFail.type](state) {
      state.addToLoading = false;
    },
    [likeVideo.type](state: VideoDetailState) {
      state.loading = true;
    },
    [likeVideoSuccess.type](
      state: VideoDetailState,
      action: PayloadAction<string>
    ) {
      if (action.payload === 'like') {
        state.videoDetail.userLike.liked = true;
        state.videoDetail.userLike.numberOfLike += 1;
        if (state.videoDetail.userLike.disliked) {
          state.videoDetail.userLike.numberOfDislike -= 1;
        }
        state.videoDetail.userLike.disliked = false;
      } else if (action.payload == 'dislike') {
        state.videoDetail.userLike.disliked = true;
        state.videoDetail.userLike.numberOfDislike += 1;
        if (state.videoDetail.userLike.liked) {
          state.videoDetail.userLike.numberOfLike -= 1;
        }
        state.videoDetail.userLike.liked = false;
      } else {
        if (state.videoDetail.userLike.liked) {
          state.videoDetail.userLike.numberOfLike -= 1;
        }
        if (state.videoDetail.userLike.disliked) {
          state.videoDetail.userLike.numberOfDislike -= 1;
        }
        state.videoDetail.userLike.liked = false;
        state.videoDetail.userLike.disliked = false;
      }
      state.loading = false;
    },
    [likeVideoFail.type](state) {
      state.loading = false;
    },
    [ratingVideo.type](state: VideoDetailState) {
      state.ratingVideoLoading = true;
    },
    [ratingVideoSuccess.type](
      state: VideoDetailState,
      action: PayloadAction<RatingVideoData>
    ) {
      state.videoDetail.userReview.userReviewPoint = action.payload.point;
      state.videoDetail.userReview.content = action.payload.content;
      state.ratingVideoLoading = false;
    },
    [ratingVideoFail.type](state) {
      state.ratingVideoLoading = false;
    },
    [postComment.type](state: VideoDetailState) {
      state.commentLoading = true;
    },
    [postCommentSuccess.type](
      state: VideoDetailState,
      action: PayloadAction<{
        numberOfComment: number;
        commentList: CommentsList[];
      }>
    ) {
      state.videoDetail.userComment.numberOfComment =
        action.payload.numberOfComment;
      state.videoDetail.userComment.commentList = action.payload.commentList;
      state.commentLoading = false;
    },
    [postCommentFail.type](state) {
      state.commentLoading = false;
    },
    [editComment.type](state: VideoDetailState) {
      state.commentLoading = true;
    },
    [editCommentSuccess.type](
      state: VideoDetailState,
      action: PayloadAction<{
        numberOfComment: number;
        commentList: CommentsList[];
      }>
    ) {
      state.videoDetail.userComment.numberOfComment =
        action.payload.numberOfComment;
      state.videoDetail.userComment.commentList = action.payload.commentList;
      state.commentLoading = false;
    },
    [editCommentFail.type](state) {
      state.commentLoading = false;
    },

    [deleteComment.type](state: VideoDetailState) {
      state.commentLoading = true;
    },
    [deleteCommentSuccess.type](
      state: VideoDetailState,
      action: PayloadAction<{
        numberOfComment: number;
        commentList: CommentsList[];
      }>
    ) {
      state.videoDetail.userComment.numberOfComment =
        action.payload.numberOfComment;
      state.videoDetail.userComment.commentList = action.payload.commentList;
      state.commentLoading = false;
    },
    [deleteCommentFail.type](state) {
      state.commentLoading = false;
    },
  },
});

export const { fetchVideoDetailSSR, clearMessage } = videoDetailSlice.actions;

export const videoDetailSelector = (state: RootState) =>
  state.clientVideoDetail.videoDetail;
export const loadingSelector = (state: RootState) =>
  state.clientVideoDetail.loading;
export const addToLoadingSelector = (state: RootState) =>
  state.clientVideoDetail.addToLoading;
export const ratingLoadingSelector = (state: RootState) =>
  state.clientVideoDetail.ratingVideoLoading;
export const commentLoadingSelector = (state: RootState) =>
  state.clientVideoDetail.commentLoading;
export const messageSelector = (state: RootState) =>
  state.clientVideoDetail.message;

export default videoDetailSlice.reducer;
