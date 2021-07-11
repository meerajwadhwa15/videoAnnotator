export interface assignedUsers {
  id: number;
  email: string;
  fullName: string;
}

export interface VideoInfo {
  id: number;
  name: string;
  description: string;
  format: string;
  size: string;
  url: string;
  status: string;
  assignedUsers: assignedUsers[];
}
