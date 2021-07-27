import { VideoInfo } from 'models';

export interface HomeState {
  videosList: VideoInfo[];
  videoDetail: VideoInfo;
  loading: boolean;
  message: Message;
}

export interface Message {
  type: string;
  text: string;
}
