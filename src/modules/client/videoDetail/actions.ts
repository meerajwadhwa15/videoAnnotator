import { createAction } from '@reduxjs/toolkit';
import { SaveAddToData, LikeVideoData, RatingVideoData } from './types';
import { CommentsList, UserReview } from 'models';

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
  createAction<{ id: number; data: RatingVideoData }>(
    `clientVideoDetail/ratingVideo`
  ),
  createAction<UserReview>(`clientVideoDetail/ratingVideoSuccess`),
  createAction(`clientVideoDetail/ratingVideoFail`),
];

export const [postComment, postCommentSuccess, postCommentFail] = [
  createAction<{ id: number; content: string }>(
    `clientVideoDetail/postComment`
  ),
  createAction<{ numberOfComment: number; commentList: CommentsList[] }>(
    `clientVideoDetail/postCommentSuccess`
  ),
  createAction(`clientVideoDetail/postCommentFail`),
];

export const [editComment, editCommentSuccess, editCommentFail] = [
  createAction<{ id: number; content: string }>(
    `clientVideoDetail/editComment`
  ),
  createAction<{ numberOfComment: number; commentList: CommentsList[] }>(
    `clientVideoDetail/editCommentSuccess`
  ),
  createAction(`clientVideoDetail/editCommentFail`),
];

export const [deleteComment, deleteCommentSuccess, deleteCommentFail] = [
  createAction<number>(`clientVideoDetail/deleteComment`),
  createAction<{ numberOfComment: number; commentList: CommentsList[] }>(
    `clientVideoDetail/deleteCommentSuccess`
  ),
  createAction(`clientVideoDetail/deleteCommentFail`),
];
