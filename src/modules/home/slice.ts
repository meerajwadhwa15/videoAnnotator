import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';
import { VideoInfo } from 'models';
import {
  assignVideoRequestData,
  createAndEditVideoRequestData,
  Message,
} from './types';

interface homeState {
  videosList: VideoInfo[];
  loading: boolean;
  assignVideoLoading: boolean;
  createVideoLoading: boolean;
  editVideoLoading: boolean;
  deleteVideoLoading: boolean;
  message: Message;
}

const initialState: homeState = {
  videosList: [],
  loading: false,
  assignVideoLoading: false,
  createVideoLoading: false,
  editVideoLoading: false,
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
    fetchVideosListSSR(state: homeState, action: PayloadAction<VideoInfo[]>) {
      state.videosList = action.payload;
    },
    fetchVideosList(state: homeState) {
      state.loading = true;
      state.message = {
        type: '',
        text: '',
      };
    },
    fetchVideosListSuccess: (state, action: PayloadAction<VideoInfo[]>) => {
      state.videosList = action.payload;
      state.message.type = 'success';
      state.message.text = 'fetch_video_success';
      state.loading = false;
    },
    fetchVideosListError: (state) => {
      state.message.type = 'error';
      state.message.text = 'fetch_video_error';
      state.loading = false;
    },
    assignVideo(
      state: homeState,
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
      state: homeState,
      action: PayloadAction<createAndEditVideoRequestData>
    ) {
      state.createVideoLoading = true;
      state.message = {
        type: '',
        text: '',
      };
      console.log('action', action);
    },
    createVideoSuccess: (state, action: PayloadAction) => {
      state.message.type = 'success';
      state.message.text = 'create_video_success';
      state.createVideoLoading = false;
      console.log('action', action);
    },
    createVideoError: (state) => {
      state.message.type = 'error';
      state.message.text = 'create_video_error';
      state.createVideoLoading = false;
    },
    editVideo(
      state: homeState,
      action: PayloadAction<createAndEditVideoRequestData>
    ) {
      state.editVideoLoading = true;
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
      state.createVideoLoading = false;
    },
    editVideoError: (state) => {
      state.message.type = 'error';
      state.message.text = 'edit_video_error';
      state.loading = false;
    },
    deleteVideo(state: homeState, action: PayloadAction<number>) {
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
  },
});

export const {
  fetchVideosListSSR,
  fetchVideosList,
  fetchVideosListSuccess,
  fetchVideosListError,
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
} = homeSlice.actions;

export const videosListSelector = (state: RootState) => state.home.videosList;
export const loadingSelector = (state: RootState) => state.home.loading;
export const assignVideoLoadingSelector = (state: RootState) =>
  state.home.assignVideoLoading;
export const createVideoLoadingSelector = (state: RootState) =>
  state.home.createVideoLoading;
export const editVideoLoadingSelector = (state: RootState) =>
  state.home.editVideoLoading;
export const deleteVideoLoadingSelector = (state: RootState) =>
  state.home.deleteVideoLoading;
export const messageSelector = (state: RootState) => state.home.message;

export default homeSlice.reducer;
