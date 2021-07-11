export interface LoginState {
  loading: boolean;
  message: Message;
}
export interface LoginData {
  email: string;
  password: string;
  remember: boolean;
}
export interface Message {
  type: string;
  text: string;
}
