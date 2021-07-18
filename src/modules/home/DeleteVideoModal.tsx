import React, { FC, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'shards-react';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  deleteVideoLoadingSelector,
  messageSelector,
  deleteVideo,
  clearMessage,
} from './slice';

interface props {
  isOpen: boolean;
  videoId: number;
  toggleDeleteModal: () => void;
}

const EditVideoModal: FC<props> = ({ isOpen, videoId, toggleDeleteModal }) => {
  const message = useAppSelector(messageSelector);
  const loading = useAppSelector(deleteVideoLoadingSelector);

  const dispatch = useAppDispatch();
  const { t } = useTranslation(['home']);

  useEffect(() => {
    if (!isOpen && message.type) {
      dispatch(clearMessage());
    }
  }, [isOpen, dispatch, message]);

  useEffect(() => {
    if (message.type === 'success' && message.text === 'delete_video_success') {
      toast.success(t('deleteSuccessMsg'));
      toggleDeleteModal();
    }

    if (message.type === 'error' && message.text === 'delete_video_error') {
      toast.error(t('deleteErrorMsg'));
      toggleDeleteModal();
    }
  }, [message, t, toggleDeleteModal]);

  function onDeleteVideo() {
    dispatch(deleteVideo(videoId));
  }

  return (
    <React.Fragment>
      <Modal
        centered
        size="md"
        open={isOpen}
        toggle={() => toggleDeleteModal()}
      >
        <ModalHeader>{t('deleteModalHeaderText')}</ModalHeader>
        <ModalBody style={{ textAlign: 'right' }}>
          <p style={{ textAlign: 'center' }}>{t('deleteConfirmText')}</p>
          <Button
            type="button"
            disabled={loading}
            onClick={() => {
              onDeleteVideo();
            }}
          >
            {t('deleteSubmitBtn')}
          </Button>
          <Button
            type="button"
            theme="outline"
            onClick={() => {
              toggleDeleteModal();
            }}
          >
            {t('deleteCancelBtn')}
          </Button>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default EditVideoModal;
