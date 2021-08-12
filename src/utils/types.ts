export enum AlertMessageType {
  success = 'success',
  error = 'error',
  default = '',
}

export interface AlertMessage {
  type: AlertMessageType;
  text: string;
}

export enum UserType {
  admin = 1,
  normal = 2,
  consumer = 3,
}
