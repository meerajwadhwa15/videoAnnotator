import { FC, useEffect, useRef } from 'react';
import { Alert } from 'shards-react';
import style from './style.module.scss';

export enum AlertType {
  success = 'success',
  error = 'danger',
  warning = 'warning',
}

const ALERT_LIFE_TIME = 3000; // 3s

interface AlertProps {
  visible: boolean;
  dismiss: () => void;
  type: AlertType;
}

const AlertCustom: FC<AlertProps> = ({ type, visible, dismiss, children }) => {
  const ref = useRef<any>();
  useEffect(() => {
    if (visible) {
      clearTimeout(ref.current);
      ref.current = setTimeout(() => {
        dismiss();
      }, ALERT_LIFE_TIME);
    }
  }, [visible, dismiss]);

  return (
    <Alert
      className={style.Alert}
      theme={type}
      open={visible}
      dismissible={dismiss}
    >
      {children}
    </Alert>
  );
};

export default AlertCustom;
