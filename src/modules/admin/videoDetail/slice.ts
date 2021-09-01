import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';
import { Segment, VideoInfo } from 'models';
import { VideoDetailState } from './types';
import { AlertMessageType } from 'utils/types';
import {
  name,
  dispatchCreateSegment,
  dispatchCreateSegmentFail,
  dispatchCreateSegmentSuccess,
  dispatchEditSegment,
  dispatchEditSegmentFail,
  dispatchEditSegmentSuccess,
  dispatchDeleteAnnotator,
  dispatchDeleteAnnotatorFail,
  dispatchDeleteAnnotatorSuccess,
} from './actions';
import { HYDRATE } from 'next-redux-wrapper';

const initialState: VideoDetailState = {
  videoDetail: {} as VideoInfo,
  loading: false,
  edittingSegment: null,
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
      if (state.annotateModal) {
        state.edittingSegment = null;
      }
      state.annotateModal = !state.annotateModal;
    },
    onEditSegment(state, action: PayloadAction<Segment>) {
      state.annotateModal = true;
      state.edittingSegment = action.payload;
    },
  },
  extraReducers: {
    [dispatchCreateSegment.type](state) {
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
    [dispatchCreateSegmentFail.type](state) {
      state.loading = false;
      state.annotateModal = false;
    },
    [dispatchEditSegment.type](state) {
      state.loading = true;
    },
    [dispatchEditSegmentSuccess.type](
      state: VideoDetailState,
      action: PayloadAction<VideoInfo>
    ) {
      state.loading = false;
      state.annotateModal = false;
      state.edittingSegment = null;
      state.videoDetail = action.payload;
    },
    [dispatchEditSegmentFail.type](state) {
      state.loading = false;
      state.edittingSegment = null;
      state.annotateModal = false;
    },
    [dispatchDeleteAnnotator.type](state) {
      state.loading = true;
    },
    [dispatchDeleteAnnotatorSuccess.type](state, action) {
      state.loading = false;
      state.videoDetail = action.payload;
    },
    [dispatchDeleteAnnotatorFail.type](state) {
      state.loading = false;
    },
    [HYDRATE](state, { payload }: PayloadAction<any>) {
      return payload[name];
    },
  },
});

export const {
  fetchVideoDetailSSR,
  clearMessage,
  toggleAnnotateModal,
  onEditSegment,
} = videoDetailSlice.actions;

export const videoDetailSelector = (state: RootState) =>
  state.videoDetail.videoDetail;
export const loadingSelector = (state: RootState) => state.videoDetail.loading;
export const messageSelector = (state: RootState) => state.videoDetail.message;
export const annotateModalSelector = (state: RootState) =>
  state.videoDetail.annotateModal;
export const edittingSegmentSelector = (state: RootState) =>
  state.videoDetail.edittingSegment;

export default videoDetailSlice.reducer;
