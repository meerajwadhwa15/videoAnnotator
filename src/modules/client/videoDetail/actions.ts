import { createAction } from '@reduxjs/toolkit';
import { SaveAddToData, LikeVideoData } from './types';

export const [saveAddTo, saveAddToSuccess, saveAddToFail] = [
  createAction<{ id: number; data: SaveAddToData[] }>(
    `clientVideoDetail/saveAddTo`
  ),
  createAction(`clientVideoDetail/saveAddToSuccess`),
  createAction(`clientVideoDetail/saveAddToFail`),
];

export const [likeVideo, likeVideoSuccess, likeVideoFail] = [
  createAction<{ id: number; data: LikeVideoData }>(
    `clientVideoDetail/likeVideo`
  ),
  createAction<string>(`clientVideoDetail/likeVideoSuccess`),
  createAction(`clientVideoDetail/likeVideoFail`),
];

export const [ratingVideo, ratingVideoSuccess, ratingVideoFail] = [
  createAction<any>(`clientVideoDetail/ratingVideo`),
  createAction(`clientVideoDetail/ratingVideoSuccess`),
  createAction(`clientVideoDetail/ratingVideoFail`),
];

export const [postComment, postCommentSuccess, postCommentFail] = [
  createAction<any>(`clientVideoDetail/postComment`),
  createAction(`clientVideoDetail/postCommentSuccess`),
  createAction(`clientVideoDetail/postCommentFail`),
];
