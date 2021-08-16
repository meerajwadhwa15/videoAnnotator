export enum AuthStatus {
  login = 'login',
  signup = 'signup',
  verify = 'verify',
  forgotPass = 'forgot_password',
  resetPass = 'reset_password',
}

export interface ConsumerAuthenState {
  open: boolean;
  loading: boolean;
  confirmEmail: string;
  status: AuthStatus;
}

export interface LoginData {
  email: string;
  password: string;
  remember: boolean;
  isAdmin: boolean;
}

export interface SignupData {
  isAdmin: boolean;
  email: string;
  fullName: string;
  password: string;
  matchingPassword: string;
}

export interface ResetPassData {
  password: string;
  matchingPassword: string;
  token: string | undefined | string[];
}
