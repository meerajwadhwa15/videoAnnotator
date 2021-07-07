export interface SignupState {
  loading: boolean;
  error: string;
  alert: boolean;
}

export interface SignupData {
  email: string;
  fullName: string;
  password: string;
  matchingPassword: string;
}
