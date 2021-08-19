import React, { FC } from 'react';
import { useTranslation } from 'next-i18next';
import Rating from 'react-rating';

import { VideoInfo } from 'models';
import styles from './style.module.scss';

interface Props {
  isLoadingVideo: boolean;
  videoDetail: VideoInfo;
}

const ReviewSection: FC<Props> = ({ isLoadingVideo, videoDetail }) => {
  const { t } = useTranslation(['client-video-detail']);

  return (
    <React.Fragment>
      {!isLoadingVideo && Object.keys(videoDetail).length > 0 && (
        <div className={styles.reviewSection}>
          <div className={styles.reviewSectionHeader}>
            {t('reviewSectionText', {
              count: videoDetail.userReview.numberOfReview || 0,
            })}
          </div>
          <div className={styles.reviewSectionContent}>
            {Array.isArray(videoDetail.userReview?.reviews) &&
            videoDetail.userReview?.reviews?.length > 0 ? (
              videoDetail.userReview.reviews.map((review) => (
                <div className={styles.reviewItem} key={review.id}>
                  <div className={styles.avatarWrapper}>
                    <img
                      src={'/images/avatar-default.jpg'}
                      width={40}
                      height={40}
                      alt="User Avatar"
                    />
                  </div>
                  <div className={styles.reviewMetaInfo}>
                    <div className={styles.reviewName}>{review.userName}</div>
                    <div className={styles.reviewPoint}>
                      <Rating
                        readonly={true}
                        initialRating={review.point || 0}
                        emptySymbol={
                          <img
                            src="/images/star-empty-small.png"
                            className="icon"
                            alt="icon"
                          />
                        }
                        fullSymbol={
                          <img
                            src="/images/star-yellow-small.png"
                            className="icon"
                            alt="icon"
                          />
                        }
                      />
                    </div>
                    <div className={styles.reviewContent}>{review.content}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noReview}>{t('noReviewFound')}</div>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ReviewSection;
