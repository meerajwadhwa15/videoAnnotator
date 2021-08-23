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
  ratingLoading: boolean;
  videoDetail: VideoInfo;
  toggleRatingVideoModal: () => void;
  onRateVideo: (ratingValue: number, ratingComment: string) => void;
}

const RatingVideoModal: FC<props> = ({
  isRatingVideoModalOpen,
  ratingLoading,
  videoDetail,
  toggleRatingVideoModal,
  onRateVideo,
}) => {
  const { t } = useTranslation(['client-video-detail']);
  const [ratingValue, setRatingValue] = useState<number>(0);
  const [ratingComment, setRatingComment] = useState<string>('');
  const [textareaError, setTextareaError] = useState<string>('');

  useEffect(() => {
    setRatingValue(videoDetail?.userReview?.userReviewPoint || 0);
    setRatingComment(videoDetail?.userReview?.content || '');
  }, [videoDetail]);

  useEffect(() => {
    if (!isRatingVideoModalOpen) {
      resetValue();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRatingVideoModalOpen]);

  function onChangeRating(value) {
    if (value === ratingValue) {
      setRatingValue(0);
    } else {
      setRatingValue(value);
    }
  }

  function onChangeComment(event) {
    const { value } = event.target;
    if (value) {
      setTextareaError('');
    } else {
      setTextareaError(t('rateTextAreaError'));
    }

    setRatingComment(event.target.value);
  }

  function onCancel() {
    resetValue();
    toggleRatingVideoModal();
  }

  function onRateCheck() {
    if (!ratingComment) {
      if (!textareaError) {
        setTextareaError(t('rateTextAreaError'));
      }
      return;
    }

    setTimeout(() => {
      toggleRatingVideoModal();
    }, 500);
    onRateVideo(ratingValue, ratingComment);
  }

  function resetValue() {
    setRatingValue(videoDetail?.userReview?.userReviewPoint || 0);
    setRatingComment(videoDetail?.userReview?.content || '');
  }

  return (
    <React.Fragment>
      <Modal
        centered
        size="md"
        open={isRatingVideoModalOpen}
        toggle={toggleRatingVideoModal}
      >
        <ModalHeader>{t('ratingVideoTooltip')}</ModalHeader>
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
              onClick={onChangeRating}
            />
          </div>
          <FormTextarea
            style={{ height: 100, resize: 'none' }}
            name="description"
            placeholder={t('ratingVideoPlaceholder')}
            value={ratingComment}
            onChange={onChangeComment}
            invalid={textareaError || false}
          />
          {textareaError && (
            <p style={{ color: 'red', margin: '0px' }}>{textareaError}</p>
          )}
        </ModalBody>
        <ModalFooter style={{ padding: '10px' }}>
          <Button
            type="button"
            size="sm"
            onClick={onRateCheck}
            disabled={ratingLoading}
          >
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
