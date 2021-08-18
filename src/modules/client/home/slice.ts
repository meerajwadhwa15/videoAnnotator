import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';
import { VideoInfo, Category } from 'models';
import { HomeState, UpdatePlaylistPayload, VideosList } from './types';
import { AlertMessageType } from 'utils/types';

const initialState: HomeState = {
  videosList: {
    totalPage: 0,
    totalRecord: 0,
    currentPageNo: 0,
    videoList: [],
  },
  videoDetail: {} as VideoInfo,
  categories: [],
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

export const [
  dispatchUpdatePlaylist,
  dispatchUpdatePlaylistSuccess,
  dispatchUpdatePlaylistFail,
] = [
  createAction<UpdatePlaylistPayload>('clientHome/dispatchUpdatePlaylist'),
  createAction<UpdatePlaylistPayload>(
    'clientHome/dispatchUpdatePlaylistSuccess'
  ),
  createAction('clientHome/dispatchUpdatePlaylistFail'),
];

export const clientHomeSlice = createSlice({
  name: 'clientHome',
  initialState,
  reducers: {
    fetchServerSideProps(
      state: HomeState,
      action: PayloadAction<{ videosList: VideosList; categories: Category[] }>
    ) {
      state.videosList = action.payload.videosList;
      state.categories = action.payload.categories;
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
    [dispatchUpdatePlaylistSuccess.type](
      state,
      action: PayloadAction<UpdatePlaylistPayload>
    ) {
      const video = state.videosList.videoList.find(
        (it) => it.id === action.payload.videoId
      );
      if (video) {
        video.playlists = action.payload.data;
      }
    },
  },
});

export const { fetchServerSideProps, clearMessage } = clientHomeSlice.actions;

export const videosListSelector = (state: RootState) =>
  state.clientHome.videosList.videoList;
export const videoDetailSelector = (state: RootState) =>
  state.clientHome.videoDetail;
export const categoriesSelector = (state: RootState) =>
  state.clientHome.categories;
export const videoListPaginationSelector = (state: RootState) => ({
  totalPage: state.clientHome.videosList.totalPage,
  totalRecord: state.clientHome.videosList.totalRecord,
  currentPageNo: state.clientHome.videosList.currentPageNo,
});
export const loadingSelector = (state: RootState) => state.clientHome.loading;
export const messageSelector = (state: RootState) => state.clientHome.message;

export default clientHomeSlice.reducer;
