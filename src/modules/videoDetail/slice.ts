import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';
import { VideoInfo } from 'models';
import { VideoDetailState } from './types';
import { AlertMessageType } from 'utils/types';
import {
  name,
  dispatchCreateSegment,
  dispatchCreateSegmentFail,
  dispatchCreateSegmentSuccess,
} from './actions';

const initialState: VideoDetailState = {
  videoDetail: {} as VideoInfo,
  loading: false,
  annotateModal: false,
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
    clearMessage(state) {
      state.message.type = AlertMessageType.default;
      state.message.text = '';
    },
    toggleAnnotateModal(state) {
      state.annotateModal = !state.annotateModal;
    },
  },
  extraReducers: {
    [dispatchCreateSegment.type](state: VideoDetailState) {
      state.loading = true;
    },
    [dispatchCreateSegmentSuccess.type](
      state: VideoDetailState,
      action: PayloadAction<VideoInfo>
    ) {
      state.loading = false;
      state.annotateModal = false;
      state.videoDetail = action.payload;
    },
    [dispatchCreateSegmentFail.type](state: VideoDetailState) {
      state.loading = false;
      state.annotateModal = false;
    },
  },
});

export const { fetchVideoDetailSSR, clearMessage, toggleAnnotateModal } =
  videoDetailSlice.actions;

export const videoDetailSelector = (state: RootState) =>
  state.videoDetail.videoDetail;
export const loadingSelector = (state: RootState) => state.videoDetail.loading;
export const messageSelector = (state: RootState) => state.videoDetail.message;
export const annotateModalSelector = (state: RootState) =>
  state.videoDetail.annotateModal;

export default videoDetailSlice.reducer;
