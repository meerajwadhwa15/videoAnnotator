import { VideoInfo } from 'models';
import { Category } from 'models/category.model';

export interface assignVideoRequestData {
  id: number;
  userId: number[];
}

export interface createAndEditVideoRequestData {
  id?: number;
  name: string;
  url: string;
  thumbnail: string;
  subcategoryId: number | string;
  description?: string;
}

export interface Message {
  type: string;
  text: string;
}

export interface HomeState {
  videosList: VideoInfo[];
  categories: Category[];
  loading: boolean;
  assignVideoLoading: boolean;
  updateVideoLoading: boolean;
  deleteVideoLoading: boolean;
  message: Message;
}
