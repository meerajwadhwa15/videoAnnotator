export enum UserRole {
  admin = 'Admin',
  normal = 'Normal',
}

export interface User {
  email: string;
  fullName: string;
  roles: UserRole[];
}
