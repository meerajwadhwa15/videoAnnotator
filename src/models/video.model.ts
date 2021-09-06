import { Category } from './category.model';

export interface AssignedUser {
  id: number;
  email: string;
  fullName: string;
}

export interface Segment {
  id: number;
  label: string;
  startFrame: number;
  endFrame: number;
  thumbnail: string;
  user: AssignedUser;
}

export interface Playlist {
  id: number;
  name: string;
  selected: boolean;
}

export interface CommentsList {
  id: number;
  userName: string;
  canEdit: boolean;
  content: string;
  avatar: string;
  createTime: string;
}

export interface UserLike {
  liked: boolean | undefined;
  disliked: boolean | undefined;
  numberOfDislike: number;
  numberOfLike: number;
}

export interface Reviews {
  id: number;
  point: number;
  userName: string;
  content: string;
  avatar: string;
  createTime: string;
}

export interface UserReview {
  averagePoint: number;
  userReviewPoint: number;
  numberOfReview: number;
  content: string;
  reviews: Reviews;
}

export interface VideoInfo {
  id: number;
  name: string;
  description: string;
  format: string;
  size: string;
  url: string;
  status: string;
  thumbnail?: string;
  subCategory?: {
    id: number;
    name: string;
    description: string;
    category: Category;
  };
  segments: Segment[];
  assignedUsers: AssignedUser[];
  playlists: Playlist[];
  userComment: {
    numberOfComment: number;
    commentList: CommentsList[];
  };
  userLike: UserLike;
  userReview: UserReview;
}
