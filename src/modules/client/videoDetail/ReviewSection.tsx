import React, { FC } from 'react';
import { useTranslation } from 'next-i18next';

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
        <div className={styles.commentWrapper}>review section</div>
      )}
    </React.Fragment>
  );
};

export default ReviewSection;
