import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';
import { VideoInfo } from 'models';
import {
  assignVideoRequestData,
  createAndEditVideoRequestData,
  HomeState,
} from './types';
import {
  fetchVideosList,
  fetchVideosListError,
  fetchVideosListSuccess,
} from './actions';
import { Category } from 'models/category.modle';

const initialState: HomeState = {
  videosList: [],
  categories: [],
  loading: false,
  assignVideoLoading: false,
  updateVideoLoading: false,
  deleteVideoLoading: false,
  message: {
    type: '',
    text: '',
  },
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    fetchServerSideProps(
      state: HomeState,
      action: PayloadAction<{ videosList: VideoInfo[]; categories: Category[] }>
    ) {
      state.videosList = action.payload.videosList;
      state.categories = action.payload.categories;
    },
    assignVideo(
      state: HomeState,
      action: PayloadAction<assignVideoRequestData>
    ) {
      state.assignVideoLoading = true;
      state.message = {
        type: '',
        text: '',
      };
      console.log('action', action);
    },
    assignVideoSuccess: (state, action: PayloadAction<VideoInfo>) => {
      const videoId = action.payload.id;
      const currentVideoIndex = state.videosList.findIndex(
        (video) => video.id === videoId
      );

      state.videosList[currentVideoIndex] = action.payload;
      state.message.type = 'success';
      state.message.text = 'assign_video_success';
      state.assignVideoLoading = false;
    },
    assignVideoError: (state) => {
      state.message.type = 'error';
      state.message.text = 'assign_video_error';
      state.assignVideoLoading = false;
    },
    createVideo(
      state: HomeState,
      action: PayloadAction<createAndEditVideoRequestData>
    ) {
      state.updateVideoLoading = true;
      state.message = {
        type: '',
        text: '',
      };
      console.log('action', action);
    },
    createVideoSuccess: (state, action: PayloadAction<VideoInfo>) => {
      state.videosList.push(action.payload);
      state.message.type = 'success';
      state.message.text = 'create_video_success';
      state.updateVideoLoading = false;
      console.log('action', action);
    },
    createVideoError: (state) => {
      state.message.type = 'error';
      state.message.text = 'create_video_error';
      state.updateVideoLoading = false;
    },
    editVideo(
      state: HomeState,
      action: PayloadAction<createAndEditVideoRequestData>
    ) {
      state.updateVideoLoading = true;
      state.message = {
        type: '',
        text: '',
      };
      console.log('action', action);
    },
    editVideoSuccess: (state, action: PayloadAction<VideoInfo>) => {
      const videoId = action.payload.id;
      const currentVideoIndex = state.videosList.findIndex(
        (video) => video.id === videoId
      );
      state.videosList[currentVideoIndex] = action.payload;

      state.message.type = 'success';
      state.message.text = 'edit_video_success';
      state.updateVideoLoading = false;
    },
    editVideoError: (state) => {
      state.message.type = 'error';
      state.message.text = 'edit_video_error';
      state.updateVideoLoading = false;
    },
    deleteVideo(state: HomeState, action: PayloadAction<number>) {
      state.deleteVideoLoading = true;
      state.message = {
        type: '',
        text: '',
      };
      console.log('action', action);
    },
    deleteVideoSuccess: (state, action: PayloadAction<any>) => {
      const videoId = action.payload;
      const currentVideoIndex = state.videosList.findIndex(
        (video) => video.id === videoId
      );
      state.videosList.splice(currentVideoIndex, 1);

      state.message.type = 'success';
      state.message.text = 'delete_video_success';
      state.deleteVideoLoading = false;
    },
    deleteVideoError: (state) => {
      state.message.type = 'error';
      state.message.text = 'delete_video_error';
      state.deleteVideoLoading = false;
    },
    clearMessage: (state) => {
      state.message.type = '';
      state.message.text = '';
    },
    clearData: (state) => {
      state.videosList = [];
      state.loading = false;
      state.assignVideoLoading = false;
      state.updateVideoLoading = false;
      state.deleteVideoLoading = false;
      state.message = {
        type: '',
        text: '',
      };
    },
  },
  extraReducers: {
    [fetchVideosList.type](state) {
      state.loading = true;
      state.message = {
        type: '',
        text: '',
      };
    },
    [fetchVideosListSuccess.type](state, action: PayloadAction<VideoInfo[]>) {
      state.videosList = action.payload;
      state.message.type = 'success';
      state.message.text = 'fetch_video_success';
      state.loading = false;
    },
    [fetchVideosListError.type](state) {
      state.message.type = 'error';
      state.message.text = 'fetch_video_error';
      state.loading = false;
    },
  },
});

export const {
  fetchServerSideProps,
  assignVideo,
  assignVideoSuccess,
  assignVideoError,
  createVideo,
  createVideoSuccess,
  createVideoError,
  editVideo,
  editVideoSuccess,
  editVideoError,
  deleteVideo,
  deleteVideoSuccess,
  deleteVideoError,
  clearMessage,
  clearData,
} = homeSlice.actions;

export const videosListSelector = (state: RootState) => state.home.videosList;
export const loadingSelector = (state: RootState) => state.home.loading;
export const assignVideoLoadingSelector = (state: RootState) =>
  state.home.assignVideoLoading;
export const updateVideoLoadingSelector = (state: RootState) =>
  state.home.updateVideoLoading;
export const deleteVideoLoadingSelector = (state: RootState) =>
  state.home.deleteVideoLoading;
export const messageSelector = (state: RootState) => state.home.message;
export const categoriesSelector = (state: RootState) => state.home.categories;

export default homeSlice.reducer;
