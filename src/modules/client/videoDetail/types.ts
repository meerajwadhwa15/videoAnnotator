import { VideoInfo } from 'models';
import { AlertMessage } from 'utils/types';

export interface VideoDetailState {
  videoDetail: VideoInfo;
  loading: boolean;
  addToLoading: boolean;
  message: AlertMessage;
}

export interface SaveAddToData {
  id: number;
  selected: boolean;
}

export interface LikeVideoData {
  isLike: boolean;
  isDislike: boolean;
}
