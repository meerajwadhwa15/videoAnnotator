export interface ResetState {
  loading: boolean;
  error: string;
}
export interface ResetData {
  new_password: string;
  confirm_password: string;
  token: string | string[] | undefined | null;
}
