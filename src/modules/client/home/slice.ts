import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';
import { VideoInfo } from 'models';
import { HomeState } from './types';
import { AlertMessageType } from 'utils/types';

const initialState: HomeState = {
  videosList: [],
  videoDetail: {} as VideoInfo,
  loading: false,
  message: {
    type: '',
    text: '',
  },
};

export const [getVideoDetail, getVideoDetailSuccess, getVideoDetailError] = [
  createAction<number>('clientHome/getVideoDetail'),
  createAction<VideoInfo>('clientHome/getVideoDetailSuccess'),
  createAction('clientHome/getVideoDetailError'),
];

export const clientHomeSlice = createSlice({
  name: 'clientHome',
  initialState,
  reducers: {
    fetchVideosListSSR(state: HomeState, action: PayloadAction<VideoInfo[]>) {
      state.videosList = action.payload;
    },
    clearMessage(state) {
      state.message.type = AlertMessageType.default;
      state.message.text = '';
    },
  },
  extraReducers: {
    [getVideoDetail.type](state: HomeState) {
      state.loading = true;
      state.message.type = '';
      state.message.text = '';
    },
    [getVideoDetailSuccess.type](
      state: HomeState,
      action: PayloadAction<VideoInfo>
    ) {
      state.videoDetail = action.payload;
      state.loading = false;
      state.message.type = 'success';
      state.message.text = 'get_video_detail_success';
    },
    [getVideoDetailError.type](state: HomeState) {
      state.loading = false;
      state.message.type = 'error';
      state.message.text = 'get_video_detail_error';
    },
  },
});

export const { fetchVideosListSSR, clearMessage } = clientHomeSlice.actions;

export const videosListSelector = (state: RootState) =>
  state.clientHome.videosList;
export const videoDetailSelector = (state: RootState) =>
  state.clientHome.videoDetail;
export const loadingSelector = (state: RootState) => state.clientHome.loading;
export const messageSelector = (state: RootState) => state.clientHome.message;

export default clientHomeSlice.reducer;
