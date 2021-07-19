import { VideoInfo } from 'models';
import { AlertMessage } from 'utils/types';

export interface videoDetailRequestData {
  id: number;
}

export interface VideoDetailState {
  videoDetail: VideoInfo;
  message: AlertMessage;
  loading: boolean;
}
