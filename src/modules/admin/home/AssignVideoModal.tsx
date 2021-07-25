import React, { ChangeEvent, FC, useEffect } from 'react';
import {
  FormCheckbox,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'shards-react';
import Image from 'next/image';
import styles from './style.module.scss';
import { useTranslation } from 'next-i18next';
import { useAppSelector } from 'redux/hooks';
import { usersListDataSelector } from 'redux/globalSlice';
import { User } from 'models';
import { assignVideoLoadingSelector, messageSelector } from './slice';
import { toast } from 'react-toastify';

interface Props {
  open: boolean;
  toggleModal: () => void;
  calculateChecked: (user: User) => boolean;
  onUpdate: () => void;
  onCancel: () => void;
  onCheckbox: (event: ChangeEvent<HTMLInputElement>, user: User) => void;
}

export const AssignVideoModal: FC<Props> = ({
  open,
  toggleModal,
  calculateChecked,
  onCheckbox,
  onUpdate,
  onCancel,
}) => {
  const { t } = useTranslation(['home']);
  const usersList = useAppSelector(usersListDataSelector);
  const loading = useAppSelector(assignVideoLoadingSelector);
  const message = useAppSelector(messageSelector);

  useEffect(() => {
    if (message.type === 'success') {
      if (message.text === 'assign_video_success') {
        toast.success(t('assignSuccessMsg'));
      }
    }

    if (message.type === 'error') {
      if (message.text === 'assign_video_error') {
        toast.error(t('assignErrorMsg'));
      }
    }
  }, [message, t]);

  return (
    <Modal centered size="md" open={open} toggle={toggleModal}>
      <ModalHeader>{t('assignModalHeaderText')}</ModalHeader>
      <ModalBody>
        <div className="content-wrapper">
          {Array.isArray(usersList) && usersList.length > 0 ? (
            usersList.map((user) => (
              <div key={user.id} className={styles.modalCheckbox}>
                <FormCheckbox
                  className={styles.checkLabel}
                  checked={calculateChecked(user)}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    onCheckbox(event, user)
                  }
                >
                  <Image
                    className="user-avatar rounded-circle"
                    src="/images/avatar-default.jpg"
                    width={45}
                    height={45}
                    alt="Avatar"
                  />
                  <span>{`${user.fullName} - ${user.email}`}</span>
                </FormCheckbox>
              </div>
            ))
          ) : (
            <p className={styles.notFoundUsers}>{t('noUserFound')}</p>
          )}
        </div>
      </ModalBody>
      <ModalFooter>
        {
          <Button disabled={loading} onClick={onUpdate}>
            {loading ? t('assignSubmitBtnLoading') : t('assignSubmitBtn')}
          </Button>
        }
        <Button theme="white" onClick={onCancel}>
          {t('assignCancelBtn')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
