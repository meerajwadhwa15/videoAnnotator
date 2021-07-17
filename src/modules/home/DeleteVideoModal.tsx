import React, { FC, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'shards-react';
import { toast } from 'react-toastify';
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

  useEffect(() => {
    if (!isOpen && message.type) {
      dispatch(clearMessage());
    }
  }, [isOpen]);

  useEffect(() => {
    if (message.type === 'success' && message.text === 'delete_video_success') {
      toast.success('Delete video successfully!');
      toggleDeleteModal();
    }

    if (message.type === 'error' && message.text === 'delete_video_error') {
      toast.error('Delete video error!');
      toggleDeleteModal();
    }
  }, [message, dispatch]);

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
        <ModalHeader>Delete Video Confirmation</ModalHeader>
        <ModalBody style={{ textAlign: 'right' }}>
          <Button
            type="button"
            disabled={loading}
            onClick={() => {
              onDeleteVideo();
            }}
          >
            {loading ? 'Deleting...' : 'Confirm'}
          </Button>
          <Button
            type="button"
            theme="outline"
            onClick={() => {
              toggleDeleteModal();
            }}
          >
            Cancel
          </Button>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default EditVideoModal;
