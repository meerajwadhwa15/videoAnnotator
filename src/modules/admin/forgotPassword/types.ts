export interface ForgotPassState {
  loading: boolean;
  message: Message;
}

export interface Message {
  type: string;
  text: string;
}

export interface ForgotPassData {
  email: string;
}
