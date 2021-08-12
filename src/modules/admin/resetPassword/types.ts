export interface ResetState {
  loading: boolean;
  message: Message;
}

export interface Message {
  type: string;
  text: string;
}
export interface ResetPassData {
  password: string;
  matchingPassword: string;
  token: string | undefined | string[];
}
