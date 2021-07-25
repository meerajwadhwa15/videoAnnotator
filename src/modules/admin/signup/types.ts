export interface SignupState {
  loading: boolean;
  message: Message;
}

export interface Message {
  type: string;
  text: string;
}
export interface SignupData {
  email: string;
  fullName: string;
  password: string;
  matchingPassword: string;
}
