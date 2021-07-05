export interface LoginState {
  loading: boolean;
  error: string;
}
export interface LoginData {
  email: string;
  password: string;
  remember: boolean;
}
