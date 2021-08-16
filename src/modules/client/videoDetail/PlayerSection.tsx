import React, { FC } from 'react';
import ReactPlayer from 'react-player/lazy';
import { useTranslation } from 'next-i18next';

import { VideoInfo } from 'models';
import styles from './style.module.scss';

interface Props {
  isLoadingVideo: boolean;
  videoDetail: VideoInfo;
  setRef: (player: any) => void;
  setLoadingVideo: (status: boolean) => void;
  onProgress: (state: any) => void;
  onVideoError: () => void;
  toggleAddToModal: () => void;
  onClickLike: () => void;
  onClickUnlike: () => void;
}

const PlayerSection: FC<Props> = ({
  isLoadingVideo,
  videoDetail,
  setRef,
  setLoadingVideo,
  onProgress,
  onVideoError,
  toggleAddToModal,
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
        onReady={() => setLoadingVideo(false)}
        onProgress={onProgress}
        onError={onVideoError}
      />
      {!isLoadingVideo && (
        <div className={styles.metaInfoWrapper}>
          <div className={styles.metaInfoLeft}>
            <h4 className={styles.vidName}>{videoDetail.name}</h4>
            <p className={styles.vidDes}>{videoDetail.description}</p>
          </div>
          <div className={styles.metainfoRight}>
            <button
              className={styles.btnMeta}
              title={t('likeVideoToolTip')}
              onClick={onClickLike}
            >
              <i className={`material-icons ${styles.iconMeta}`}>thumb_up</i>
              <span className={styles.textNextto}>555</span>
            </button>
            <button
              className={styles.btnMeta}
              title={t('unLikeVideoToolTip')}
              onClick={onClickUnlike}
            >
              <i className={`material-icons ${styles.iconMeta}`}>thumb_down</i>
              <span className={styles.textNextto}>555</span>
            </button>
            <button
              className={styles.btnMeta}
              title={t('unLikeVideoToolTip')}
              onClick={toggleAddToModal}
            >
              <i className={`material-icons ${styles.iconMeta}`}>
                library_books
              </i>
              <span className={styles.textNextto}>{t('addTo')}</span>
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default PlayerSection;
