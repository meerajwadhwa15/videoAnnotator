import { createAction } from '@reduxjs/toolkit';
import { VideoInfo } from 'models';
import { SegmentData } from './types';

export const name = 'videoDetail';

export const [
  dispatchCreateSegment,
  dispatchCreateSegmentSuccess,
  dispatchCreateSegmentFail,
] = [
  createAction<SegmentData>(`${name}/dispatchCreateSegment`),
  createAction<VideoInfo>(`${name}/dispatchCreateSegmentSuccess`),
  createAction(`${name}/dispatchCreateSegmentFail`),
];

export const [
  dispatchEditSegment,
  dispatchEditSegmentSuccess,
  dispatchEditSegmentFail,
] = [
  createAction<SegmentData>(`${name}/dispatchEditSegment`),
  createAction<VideoInfo>(`${name}/dispatchEditSegmentSuccess`),
  createAction(`${name}/dispatchEditSegmentFail`),
];
