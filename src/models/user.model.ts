export enum UserRole {
  admin = 'Admin',
  normal = 'Normal',
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  address: string;
  introduction: string;
  phone: string;
  roles: UserRole[];
}
