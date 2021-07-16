import React, { useState } from 'react';
import { Col, Row } from 'shards-react';
import ReactPlayer from 'react-player/lazy';
import { useAppSelector } from 'redux/hooks';
import DashboardLayout from 'components/layouts/DashboardLayout';
import PageTitle from 'components/elements/pageTitle';
import { videoDetailSelector } from './slice';

import { AnnotatorList } from './AnnotatorList';
import { AnnotatorForm } from './AnnotatorForm';

import styles from './style.module.scss';

const VideoDetail = () => {
  const videoDetail = useAppSelector(videoDetailSelector);
  const [isLoadingVideo, setLoadingVideo] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setOpen((open) => !open);
  };

  const onAnnotate = () => {
    toggleModal();
  };

  return (
    <DashboardLayout>
      <PageTitle title={videoDetail.name} subtitle="Video infomation" />
      <Col lg="12" md="12">
        <Row
          style={{
            backgroundColor: '#ececec',
            padding: '8px 0',
            borderRadius: 4,
          }}
        >
          <Col lg="7" md="12" className={styles.col}>
            {isLoadingVideo && (
              <div className={styles.videoPlaceHoldler}>Loading Video...</div>
            )}
            <ReactPlayer
              controls
              pip
              width="100%"
              height="100%"
              className={styles.playerWrapper}
              url={videoDetail.url}
              onReady={() => setLoadingVideo(false)}
            />
            <p className="mt-3">{videoDetail.description}</p>
          </Col>
          <Col lg="5" md="12">
            <AnnotatorList onAnnotate={onAnnotate} />
          </Col>
        </Row>
        <AnnotatorForm open={open} toggleModal={toggleModal} />
      </Col>
    </DashboardLayout>
  );
};

export default VideoDetail;
