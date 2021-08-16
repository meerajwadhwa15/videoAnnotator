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
