import { Category, VideoInfo } from 'models';

export interface HomeState {
  videosList: VideosList;
  videoDetail: VideoInfo;
  categories: Category[];
  loading: boolean;
  message: Message;
}

export interface VideosList {
  totalPage: number;
  totalRecord: number;
  currentPageNo: number;
  videoList: VideoInfo[];
}

export interface Message {
  type: string;
  text: string;
}
