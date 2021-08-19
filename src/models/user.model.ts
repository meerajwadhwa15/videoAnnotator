export enum UserRole {
  admin = 'Admin',
  normal = 'Normal',
}

export interface User {
  id: number;
  email: string;
  fullName: string;
  address: string;
  introduction: string;
  phone: string;
  avatar: string;
  roles: UserRole[];
}
