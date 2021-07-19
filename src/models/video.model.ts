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
  user: AssignedUser;
}

export interface VideoInfo {
  id: number;
  name: string;
  description: string;
  format: string;
  size: string;
  url: string;
  status: string;
  segments: Segment[];
  assignedUsers: AssignedUser[];
}
