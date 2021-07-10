export interface ResetState {
  loading: boolean;
  message: Message;
}

export interface Message {
  type: string;
  text: string;
}
export interface ResetData {
  new_password: string;
  confirm_password: string;
  token: string | string[] | undefined | null;
}
