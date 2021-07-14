export interface ResetState {
  loading: boolean;
  message: Message;
}

export interface Message {
  type: string;
  text: string;
}
export interface ResetData {
  password: string;
  matchingPassword: string;
  token: string | undefined | string[];
}
