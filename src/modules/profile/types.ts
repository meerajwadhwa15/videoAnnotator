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
