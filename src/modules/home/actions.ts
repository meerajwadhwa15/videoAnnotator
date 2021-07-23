import { createAction } from '@reduxjs/toolkit';
import { VideoInfo } from 'models';

const prefix = 'home';

export const [fetchVideosList, fetchVideosListSuccess, fetchVideosListError] = [
  createAction(`${prefix}/fetchVideosList`),
  createAction<VideoInfo[]>(`${prefix}/fetchVideosListSuccess`),
  createAction(`${prefix}/fetchVideosListError`),
];
