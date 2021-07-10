export interface assignedUsers {
  id: number;
  email: string;
  fullName: string;
}

export interface VideosList {
  id: number;
  name: string;
  description: string;
  format: string;
  size: string;
  url: string;
  assignedUsers: assignedUsers[];
}
