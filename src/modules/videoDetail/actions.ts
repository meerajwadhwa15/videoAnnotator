import { createAction } from '@reduxjs/toolkit';
import { VideoInfo } from 'models';
import { DeleteSegmentData, SegmentData } from './types';

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

export const [
  dispatchDeleteAnnotator,
  dispatchDeleteAnnotatorSuccess,
  dispatchDeleteAnnotatorFail,
] = [
  createAction<DeleteSegmentData>(`${name}/dispatchDeleteAnnotator`),
  createAction<VideoInfo>(`${name}/dispatchDeleteAnnotatorSuccess`),
  createAction(`${name}/dispatchDeleteAnnotatorFail`),
];
