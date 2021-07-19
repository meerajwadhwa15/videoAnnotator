import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';
import { VideoInfo } from 'models';
import { VideoDetailState } from './types';
import { AlertMessageType } from 'utils/types';

const name = 'videoDetail';

export const [
  dispatchCreateSegment,
  dispatchCreateSegmentSuccess,
  dispatchCreateSegmentFail,
] = [
  createAction(`${name}/dispatchCreateSegment`),
  createAction(`${name}/dispatchCreateSegmentSuccess`),
  createAction(`${name}/dispatchCreateSegmentFail`),
];

const initialState: VideoDetailState = {
  videoDetail: {} as VideoInfo,
  loading: false,
  message: {
    type: AlertMessageType.default,
    text: '',
  },
};

export const videoDetailSlice = createSlice({
  name,
  initialState,
  reducers: {
    fetchVideoDetailSSR(
      state: VideoDetailState,
      action: PayloadAction<VideoInfo>
    ) {
      state.videoDetail = action.payload;
    },
    clearMessage: (state) => {
      state.message.type = AlertMessageType.default;
      state.message.text = '';
    },
  },
  extraReducers: {
    [dispatchCreateSegment.type](state: VideoDetailState) {
      state.loading = true;
    },
  },
});

export const { fetchVideoDetailSSR, clearMessage } = videoDetailSlice.actions;

export const videoDetailSelector = (state: RootState) =>
  state.videoDetail.videoDetail;
export const loadingSelector = (state: RootState) => state.videoDetail.loading;
export const messageSelector = (state: RootState) => state.videoDetail.message;

export default videoDetailSlice.reducer;
