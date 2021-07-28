import { Segment, VideoInfo } from 'models';
import { AlertMessage } from 'utils/types';

export interface videoDetailRequestData {
  id: number;
}

export interface VideoDetailState {
  videoDetail: VideoInfo;
  message: AlertMessage;
  loading: boolean;
  edittingSegment: Segment | null;
  annotateModal: boolean;
}

export interface SegmentData {
  id?: number;
  videoId: string | string[] | undefined;
  startFrame: number;
  endFrame: number;
  thumbnail: string | File;
  label: string;
}

export interface DeleteSegmentData {
  segmentId: number;
  videoId: string | string[] | undefined;
}
