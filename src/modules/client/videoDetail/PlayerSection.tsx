import React, { FC } from 'react';
import ReactPlayer from 'react-player/lazy';
import Rating from 'react-rating';
import { useTranslation } from 'next-i18next';

import { VideoInfo, UserLike } from 'models';
import styles from './style.module.scss';

interface Props {
  isLoadingVideo: boolean;
  videoDetail: VideoInfo;
  setRef: (player: any) => void;
  setLoadingVideo: () => void;
  onProgress: (state: any) => void;
  onVideoError: () => void;
  toggleAddToModal: () => void;
  toggleRatingVideoModal: () => void;
  onClickLike: (likeData: UserLike) => void;
  onClickUnlike: (likeData: UserLike) => void;
}

const PlayerSection: FC<Props> = ({
  isLoadingVideo,
  videoDetail,
  setRef,
  setLoadingVideo,
  onProgress,
  onVideoError,
  toggleAddToModal,
  toggleRatingVideoModal,
  onClickLike,
  onClickUnlike,
}) => {
  const { t } = useTranslation(['client-video-detail']);

  return (
    <React.Fragment>
      <ReactPlayer
        controls
        pip
        ref={setRef}
        width="100%"
        height="600px"
        className={styles.playerWrapper}
        url={videoDetail.url}
        onReady={setLoadingVideo}
        onProgress={onProgress}
        onError={onVideoError}
      />
      {!isLoadingVideo && Object.keys(videoDetail).length > 0 && (
        <div className={styles.metaInfoWrapper}>
          <div className={styles.metaInfoLeft}>
            <h4 className={styles.vidName}>{videoDetail.name}</h4>
            <p className={styles.vidDes}>{videoDetail.description}</p>
          </div>
          <div className={styles.metainfoRight}>
            <div className={styles.btnGroup}>
              <button
                className={`${styles.btnMeta}${
                  videoDetail?.userLike?.liked ? ` ${styles.active}` : ''
                }`}
                title={
                  videoDetail?.userLike?.liked
                    ? t('likeVideoTooltip')
                    : t('clickToLikeTooltip')
                }
                onClick={() => onClickLike(videoDetail.userLike as UserLike)}
              >
                <i className={`material-icons ${styles.iconMeta}`}>thumb_up</i>
                <span className={styles.textNextto}>
                  {videoDetail?.userLike?.numberOfLike}
                </span>
              </button>
              <button
                className={`${styles.btnMeta}${
                  videoDetail?.userLike?.disliked ? ` ${styles.active}` : ''
                }`}
                title={
                  videoDetail?.userLike?.disliked
                    ? t('unLikeVideoTooltip')
                    : t('clickToUnlikeTooltip')
                }
                onClick={() => onClickUnlike(videoDetail.userLike as UserLike)}
              >
                <i className={`material-icons ${styles.iconMeta}`}>
                  thumb_down
                </i>
                <span className={styles.textNextto}>
                  {videoDetail?.userLike?.numberOfDislike}
                </span>
              </button>
              <button
                className={styles.btnMeta}
                title={t('addToVideoToolTip')}
                onClick={toggleAddToModal}
              >
                <i className={`material-icons ${styles.iconMeta}`}>
                  library_books
                </i>
                <span className={styles.textNextto}>{t('addTo')}</span>
              </button>
              <button
                className={styles.btnMeta}
                title={t('ratingVideoToolTip')}
                onClick={toggleRatingVideoModal}
              >
                <i
                  className={`material-icons ${styles.iconMeta} ${styles.iconRate}`}
                >
                  star_rate
                </i>
                <span className={styles.textNextto}>{t('ratingVideo')}</span>
              </button>
            </div>
            {/* Rating */}
            <div className={styles.ratingWrapper}>
              <span className={styles.baseRatingText}>
                {t('baseRatingText', {
                  count: videoDetail?.userReview?.numberOfReview,
                })}
                :
              </span>
              <Rating
                readonly={true}
                initialRating={videoDetail?.userReview?.averagePoint || 0}
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
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default PlayerSection;
