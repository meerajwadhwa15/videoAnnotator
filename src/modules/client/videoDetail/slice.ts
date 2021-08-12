import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';
import { VideoInfo } from 'models';
import { VideoDetailState } from './types';
import { AlertMessageType } from 'utils/types';

const initialState: VideoDetailState = {
  videoDetail: {} as VideoInfo,
  loading: false,
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
  extraReducers: {},
});

export const { fetchVideoDetailSSR, clearMessage } = videoDetailSlice.actions;

export const videoDetailSelector = (state: RootState) =>
  state.clientVideoDetail.videoDetail;
export const loadingSelector = (state: RootState) =>
  state.clientVideoDetail.loading;
export const messageSelector = (state: RootState) =>
  state.clientVideoDetail.message;

export default videoDetailSlice.reducer;
