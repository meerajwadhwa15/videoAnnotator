import { AlertMessage } from 'utils/types';

export interface ProfileUpdateData {
  fullName: string;
  address: string;
  phone: string;
  introduction: string;
}

export interface ProfileState {
  loading: boolean;
  message: AlertMessage;
}

export interface ChangePasswordData {
  oldPassword: string;
  password: string;
  matchingPassword: string;
}
