export enum AlertMessageType {
  success = 'success',
  error = 'error',
}

export interface AlertMessage {
  type: AlertMessageType | '';
  text: string;
}
