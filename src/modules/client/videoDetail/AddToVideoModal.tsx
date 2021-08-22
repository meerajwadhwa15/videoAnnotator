import React, { FC, ChangeEvent } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormCheckbox,
} from 'shards-react';
import { useTranslation } from 'next-i18next';
import { VideoInfo, Playlist } from 'models';
import styles from './style.module.scss';

interface props {
  isAddToModalOpen: boolean;
  addToLoading: boolean;
  videoDetail: VideoInfo;
  toggleAddToModal: () => void;
  onCheckbox: (event: ChangeEvent<HTMLInputElement>, data: Playlist) => void;
  onSaveAddTo: () => void;
}

const AddToVideoModal: FC<props> = ({
  isAddToModalOpen,
  addToLoading,
  videoDetail,
  toggleAddToModal,
  onCheckbox,
  onSaveAddTo,
}) => {
  const { t } = useTranslation(['client-video-detail']);

  function onCheckSaveAddTo() {
    setTimeout(() => {
      toggleAddToModal();
    }, 500);
    onSaveAddTo();
  }

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
          {Array.isArray(videoDetail.playlists) &&
            videoDetail.playlists.length > 0 &&
            videoDetail.playlists.map((data) => (
              <FormCheckbox
                key={data.id}
                className={styles.checkLabel}
                checked={data.selected}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  onCheckbox(event, data)
                }
              >
                <span>
                  {data.id == 1 ? t('saveFavoriteText') : t('watchLaterText')}
                </span>
              </FormCheckbox>
            ))}
        </ModalBody>
        <ModalFooter style={{ padding: '10px' }}>
          <Button
            type="button"
            disabled={addToLoading}
            size="sm"
            onClick={onCheckSaveAddTo}
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
