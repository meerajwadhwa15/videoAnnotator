export enum AuthStatus {
  login = 'login',
  signup = 'signup',
  verify = 'verify',
}

export interface ConsumerAuthenState {
  open: boolean;
  loading: boolean;
  status: AuthStatus;
}
