import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { Modal, ModalHeader, ModalBody } from 'shards-react';
import { authStatusSelector, isOpenSelector, toggleLoginDialog } from './slice';
import { AuthStatus } from './types';

import style from './style.module.scss';

import { ForgetPassword, Login, Signup, Verify } from './components';
import { useTranslation } from 'next-i18next';
import { ResetPassword } from './components/ResetPassword';

export const AuthenticationModule = ({ isAdmin }: { isAdmin?: boolean }) => {
  const status = useAppSelector(authStatusSelector);
  const dispatch = useAppDispatch();
  const open = useAppSelector(isOpenSelector);
  const { t } = useTranslation();

  const renderBody = () => {
    switch (status) {
      case AuthStatus.login:
        return <Login isAdmin={!!isAdmin} />;
      case AuthStatus.signup:
        return <Signup isAdmin={!!isAdmin} />;
      case AuthStatus.forgotPass:
        return <ForgetPassword />;
      case AuthStatus.resetPass:
        return <ResetPassword />;
      default:
        return <Verify />;
    }
  };

  const renderTitle = () => {
    switch (status) {
      case AuthStatus.login:
        return t('login:loginFormTitle');
      case AuthStatus.signup:
        return t('signup:signupFormTitle');
      case AuthStatus.forgotPass:
        return t('forgot-password:formTitle');
      case AuthStatus.resetPass:
        return t('reset-password:resetPassFormTitle');
      default:
        return t('signup:verifyEmail');
    }
  };

  const onToggle = () => {
    if (!isAdmin) {
      dispatch(toggleLoginDialog());
    }
  };

  return (
    <Modal
      toggle={() => onToggle()}
      className={style.modalDialog}
      open={open || isAdmin}
    >
      <ModalHeader>{renderTitle()}</ModalHeader>
      <ModalBody>{renderBody()}</ModalBody>
    </Modal>
  );
};
