import React, { FC, ChangeEvent } from 'react';
import { Row, Col, FormInput } from 'shards-react';
import { useTranslation } from 'next-i18next';

import { convertSecondsToTimeString } from 'utils/helpers';
import { VideoInfo } from 'models';
import styles from './style.module.scss';

interface Props {
  isLoadingVideo: boolean;
  search: string;
  activeSection: number | null;
  videoDetail: VideoInfo;
  videoDetailStore: VideoInfo;
  onSeekToSection: (id: number, frame: number) => void;
  onSearchAnnotation: (e: ChangeEvent<HTMLInputElement>) => void;
}

const AnnotationSection: FC<Props> = ({
  isLoadingVideo,
  search,
  activeSection,
  videoDetail,
  videoDetailStore,
  onSeekToSection,
  onSearchAnnotation,
}) => {
  const { t } = useTranslation(['client-video-detail']);

  return (
    <React.Fragment>
      {!isLoadingVideo && (
        <div className={styles.videoSection}>
          <div className={styles.sectionHeader}>{t('videoSectionText')}</div>
          <div className={styles.sectionContent}>
            {Array.isArray(videoDetailStore?.segments) &&
              videoDetailStore.segments.length > 4 && (
                <FormInput
                  value={search}
                  onChange={onSearchAnnotation}
                  className={styles.searchAnnoInput}
                  placeholder={t('searchAnnotation')}
                />
              )}
            {Array.isArray(videoDetail.segments) &&
            videoDetail.segments.length > 0 ? (
              videoDetail.segments.map((item) => (
                <div
                  key={item.id}
                  className={`${styles.sectionItem} ${
                    activeSection == item.id ? styles.sectionItemActive : ''
                  }`}
                  onClick={() => {
                    onSeekToSection(item.id, item.startFrame);
                  }}
                >
                  <Row>
                    <Col xs="3">
                      <div className={styles.thumbnailWrapper}>
                        <img
                          className={styles.thumbnailImg}
                          src={
                            item.thumbnail
                              ? item.thumbnail
                              : 'https://place-hold.it/150x150'
                          }
                          alt="thumbnail"
                        />
                      </div>
                    </Col>
                    <Col xs="9">
                      <div className={styles.sectionLabel}>{item.label}</div>
                      <div className={styles.sectionTime}>
                        {convertSecondsToTimeString(item.startFrame)} -{' '}
                        {convertSecondsToTimeString(item.endFrame)}
                      </div>
                    </Col>
                  </Row>
                </div>
              ))
            ) : (
              <div className={styles.noSection}>{t('noVideoSection')}</div>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default AnnotationSection;
