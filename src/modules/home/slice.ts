import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';
import { VideosList } from 'models';
import { assignVideoRequestData, Message } from './types';

interface homeState {
  videosList: VideosList[];
  loading: boolean;
  message: Message;
}

const initialState: homeState = {
  videosList: [],
  loading: false,
  message: {
    type: '',
    text: '',
  },
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    fetchVideosListSSR(state: homeState, action: PayloadAction<VideosList[]>) {
      state.videosList = action.payload;
    },
    assignVideo(
      state: homeState,
      action: PayloadAction<assignVideoRequestData>
    ) {
      state.loading = true;
      state.message = {
        type: '',
        text: '',
      };
      console.log('action', action);
    },
    assignVideoSuccess: (state, action: PayloadAction<VideosList>) => {
      const videoId = action.payload.id;
      const currentVideoIndex = state.videosList.findIndex(
        (video) => video.id === videoId
      );

      state.videosList[currentVideoIndex] = action.payload;
      state.message.type = 'success';
      state.message.text = 'update_assign_success';
      state.loading = false;
    },
    assignVideoError: (state) => {
      state.message.type = 'error';
      state.message.text = 'update_assign_error';
      state.loading = false;
    },
    clearMessage: (state) => {
      state.message.type = '';
      state.message.text = '';
    },
  },
});

export const {
  fetchVideosListSSR,
  assignVideo,
  assignVideoSuccess,
  assignVideoError,
  clearMessage,
} = homeSlice.actions;

export const videoListsSelector = (state: RootState) => state.home.videosList;
export const loadingSelector = (state: RootState) => state.home.loading;
export const messageSelector = (state: RootState) => state.home.message;

export default homeSlice.reducer;
