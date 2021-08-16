import React, { FC } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormCheckbox,
} from 'shards-react';
// import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
// import { useAppDispatch, useAppSelector } from 'redux/hooks';
// import {
//   messageSelector,
// } from './slice';
import styles from './style.module.scss';

interface props {
  isAddToModalOpen: boolean;
  toggleAddToModal: () => void;
  onSaveAddTo: () => void;
}

const AddToVideoModal: FC<props> = ({
  isAddToModalOpen,
  toggleAddToModal,
  onSaveAddTo,
}) => {
  // const dispatch = useAppDispatch();
  const { t } = useTranslation(['client-video-detail']);

  // useEffect(() => {
  //   if (message.type === 'success' && message.text === 'delete_video_success') {
  //     toast.success(t('deleteSuccessMsg'));
  //     toggleDeleteModal();
  //     clearSearchKeyword();
  //   }

  //   if (message.type === 'error' && message.text === 'delete_video_error') {
  //     toast.error(t('deleteErrorMsg'));
  //     toggleDeleteModal();
  //     clearSearchKeyword();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [message]);

  return (
    <React.Fragment>
      <Modal
        centered
        size="sm"
        open={isAddToModalOpen}
        toggle={toggleAddToModal}
      >
        <ModalHeader>{t('addToModalHeaderText')}</ModalHeader>
        <ModalBody style={{ padding: '20px' }}>
          <FormCheckbox
            className={styles.checkLabel}
            checked={true}
            // onChange={(event: ChangeEvent<HTMLInputElement>) =>
            //   onCheckbox(event, user)
            // }
          >
            <span>{t('watchLaterText')} </span>
          </FormCheckbox>
          <FormCheckbox
            className={styles.checkLabel}
            checked={true}
            // onChange={(event: ChangeEvent<HTMLInputElement>) =>
            //   onCheckbox(event, user)
            // }
          >
            <span>{t('saveFavoriteText')}</span>
          </FormCheckbox>
        </ModalBody>
        <ModalFooter style={{ padding: '10px' }}>
          <Button
            type="button"
            // disabled={loading}
            size="sm"
            onClick={onSaveAddTo}
          >
            {t('addToSubmitBtn')}
          </Button>
          <Button
            type="button"
            theme="outline"
            size="sm"
            onClick={toggleAddToModal}
          >
            {t('addToCancelBtn')}
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default AddToVideoModal;
