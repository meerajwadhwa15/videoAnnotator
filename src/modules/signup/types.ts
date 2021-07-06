export interface SignupState {
  loading: boolean;
  error: string;
  alert: boolean;
}

export interface SignupData {
  email: string;
  fullname: string;
  password: string;
  matchingPassword: string;
}
