import { VideoInfo } from 'models';
import { AlertMessage } from 'utils/types';

export interface videoDetailRequestData {
  id: number;
}

export interface VideoDetailState {
  videoDetail: VideoInfo;
  message: AlertMessage;
  loading: boolean;
  annotateModal: boolean;
}

export interface SegmentData {
  videoId: string | string[] | undefined;
  startFrame: number;
  endFrame: number;
  label: string;
}
