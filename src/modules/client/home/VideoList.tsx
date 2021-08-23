import React, { useMemo } from 'react';
import { Row } from 'shards-react';
import { useTranslation } from 'next-i18next';
import { useAppSelector } from 'redux/hooks';
import { videosListSelector } from './slice';
import styles from './style.module.scss';
import { VideoItem } from './VideoItem';
import { useRouter } from 'next/router';
import toString from 'lodash/toString';

export const VideoList = () => {
  const { t } = useTranslation();
  const {
    query: { playlist },
  } = useRouter();
  const videosData = useAppSelector(videosListSelector);

  const videos = useMemo(() => {
    if (!playlist) {
      return videosData;
    }
    return videosData.filter(
      (video) =>
        !!video.playlists.find(
          (it) => toString(it.id) == playlist && it.selected
        )
    );
  }, [playlist, videosData]);

  return (
    <div className={styles.listWrapper}>
      {!videos.length ? (
        <h5 className="text-center mt-4">{t('client-video-detail:noVideo')}</h5>
      ) : (
        videosData.length && (
          <Row>
            {videos.map((data) => (
              <VideoItem key={data.id} data={data} />
            ))}
          </Row>
        )
      )}
    </div>
  );
};
