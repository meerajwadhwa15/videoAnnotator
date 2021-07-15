export enum AlertMessageType {
  success = 'success',
  error = 'error',
  default = '',
}

export interface AlertMessage {
  type: AlertMessageType;
  text: string;
}
