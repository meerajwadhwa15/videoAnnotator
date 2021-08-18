import { Category, Playlist, VideoInfo } from 'models';

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

export enum PlaylistId {
  all = 0,
  favorite = 1,
  watchLater = 2,
}

export interface UpdatePlaylistPayload {
  videoId: number;
  data: Playlist[];
}
