import { VideoInfo } from 'models';
import { AlertMessage } from 'utils/types';

export interface VideoDetailState {
  videoDetail: VideoInfo;
  loading: boolean;
  addToLoading: boolean;
  ratingVideoLoading: boolean;
  commentLoading: boolean;
  message: AlertMessage;
}

export interface SaveAddToData {
  id: number;
  selected: boolean;
}

export interface LikeVideoData {
  like: boolean;
  dislike: boolean;
}

export interface RatingVideoData {
  point: number;
  content: string;
}
