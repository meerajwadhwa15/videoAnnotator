import React from 'react';
import { Row } from 'shards-react';
import { useTranslation } from 'next-i18next';
import { useAppSelector } from 'redux/hooks';
import { videosListSelector } from './slice';
import styles from './style.module.scss';
import { VideoItem } from './VideoItem';

export const VideoList = () => {
  const { t } = useTranslation();
  const videosData = useAppSelector(videosListSelector);

  return (
    <div className={styles.listWrapper}>
      {!videosData ||
        (Array.isArray(videosData) && videosData.length == 0 && (
          <h5 className="text-center mt-4">
            {t('client-video-detail:noVideo')}
          </h5>
        ))}
      {Array.isArray(videosData) && videosData.length > 0 && (
        <Row>
          {videosData.map((data) => (
            <VideoItem key={data.id} data={data} />
          ))}
        </Row>
      )}
    </div>
  );
};
