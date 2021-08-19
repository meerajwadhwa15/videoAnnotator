import React, { FC, useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormTextarea,
} from 'shards-react';
import Rating from 'react-rating';
import { useTranslation } from 'next-i18next';
import { VideoInfo } from 'models';
import styles from './style.module.scss';

interface props {
  isRatingVideoModalOpen: boolean;
  videoDetail: VideoInfo;
  toggleRatingVideoModal: () => void;
  onRateVideo: () => void;
}

const RatingVideoModal: FC<props> = ({
  isRatingVideoModalOpen,
  videoDetail,
  toggleRatingVideoModal,
  onRateVideo,
}) => {
  const { t } = useTranslation(['client-video-detail']);
  const [ratingValue, setRatingValue] = useState<number>(0);
  const [ratingComment, setRatingComment] = useState<string>('');

  useEffect(() => {
    setRatingValue(videoDetail?.userReview?.userReviewPoint || 0);
    setRatingComment(videoDetail?.userReview?.content || '');
  }, [videoDetail]);

  function onChangeRating(value) {
    setRatingValue(value);
  }

  function onChangeComment(event) {
    setRatingComment(event.target.value);
  }

  function onCancel() {
    setRatingValue(videoDetail?.userReview?.userReviewPoint || 0);
    setRatingComment(videoDetail?.userReview?.content || '');
    toggleRatingVideoModal();
  }

  return (
    <React.Fragment>
      <Modal
        centered
        size="md"
        open={isRatingVideoModalOpen}
        toggle={toggleRatingVideoModal}
      >
        <ModalHeader>{t('ratingVideoToolTip')}</ModalHeader>
        <ModalBody style={{ padding: '20px' }}>
          <div className={styles.ratingModalWrapper}>
            <span className={styles.vidEval}>{t('vidEval')}:</span>
            <Rating
              initialRating={ratingValue}
              emptySymbol={
                <img src="/images/star-empty.png" className="icon" alt="icon" />
              }
              fullSymbol={
                <img
                  src="/images/star-yellow.png"
                  className="icon"
                  alt="icon"
                />
              }
              onChange={onChangeRating}
            />
          </div>
          <FormTextarea
            style={{ height: 100, resize: 'none' }}
            name="description"
            placeholder={t('ratingVideoPlaceholder')}
            value={ratingComment}
            onChange={onChangeComment}
          />
        </ModalBody>
        <ModalFooter style={{ padding: '10px' }}>
          <Button type="button" size="sm" onClick={onRateVideo}>
            {t('addToSubmitBtn')}
          </Button>
          <Button type="button" theme="outline" size="sm" onClick={onCancel}>
            {t('addToCancelBtn')}
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default RatingVideoModal;
