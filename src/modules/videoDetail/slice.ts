import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';
import { VideoInfo } from 'models';
import { Message } from './types';

interface State {
  videoDetail: VideoInfo;
  message: Message;
  loading: boolean;
}

const initialState: State = {
  videoDetail: {} as VideoInfo,
  loading: false,
  message: {
    type: '',
    text: '',
  },
};

export const videoDetailSlice = createSlice({
  name: 'videoDetail',
  initialState,
  reducers: {
    fetchVideoDetailSSR(state: State, action: PayloadAction<VideoInfo>) {
      state.videoDetail = action.payload;
    },
    clearMessage: (state) => {
      state.message.type = '';
      state.message.text = '';
    },
  },
});

export const { fetchVideoDetailSSR, clearMessage } = videoDetailSlice.actions;

export const videoDetailSelector = (state: RootState) =>
  state.videoDetail.videoDetail;
export const loadingSelector = (state: RootState) => state.videoDetail.loading;
export const messageSelector = (state: RootState) => state.videoDetail.message;

export default videoDetailSlice.reducer;
