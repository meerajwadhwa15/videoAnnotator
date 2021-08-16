import { VideoInfo } from 'models';
import { AlertMessage } from 'utils/types';

export interface VideoDetailState {
  videoDetail: VideoInfo;
  message: AlertMessage;
  loading: boolean;
}
