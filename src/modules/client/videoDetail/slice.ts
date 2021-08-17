import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';
import { VideoInfo } from 'models';
import { VideoDetailState } from './types';
import { AlertMessageType } from 'utils/types';
import {
  saveAddTo,
  saveAddToSuccess,
  saveAddToFail,
  likeVideo,
  likeVideoSuccess,
  likeVideoFail,
} from './actions';

const initialState: VideoDetailState = {
  videoDetail: {} as VideoInfo,
  loading: false,
  addToLoading: false,
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
  },
});

export const { fetchVideoDetailSSR, clearMessage } = videoDetailSlice.actions;

export const videoDetailSelector = (state: RootState) =>
  state.clientVideoDetail.videoDetail;
export const loadingSelector = (state: RootState) =>
  state.clientVideoDetail.loading;
export const addToLoadingSelector = (state: RootState) =>
  state.clientVideoDetail.addToLoading;
export const messageSelector = (state: RootState) =>
  state.clientVideoDetail.message;

export default videoDetailSlice.reducer;
