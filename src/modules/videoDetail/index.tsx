import React, { useRef, useState } from 'react';
import { Col, Row } from 'shards-react';
import ReactPlayer from 'react-player/lazy';
import { useAppSelector } from 'redux/hooks';
import DashboardLayout from 'components/layouts/DashboardLayout';
import PageTitle from 'components/elements/pageTitle';
import { videoDetailSelector } from './slice';

import { AnnotatorList } from './AnnotatorList';
import { AnnotatorForm } from './AnnotatorForm';

import styles from './style.module.scss';
import { Segment } from 'models';

const VideoDetail = () => {
  const videoDetail = useAppSelector(videoDetailSelector);
  const [isLoadingVideo, setLoadingVideo] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [activeSegment, setActiveSegment] = useState<number | null>(null);

  const videoRef = useRef<any>();

  const toggleModal = () => {
    setOpen((open) => !open);
  };

  const onAnnotate = () => {
    toggleModal();
  };

  const onSeekToSegment = ({ startFrame, id }: Segment) => {
    setActiveSegment(id);
    videoRef.current.seekTo(startFrame, 'seconds');
    // on works for youtube player
    videoRef.current.getInternalPlayer().playVideo();
  };

  const ref = (player) => {
    videoRef.current = player;
  };

  const onProgress = (state: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  }) => {
    const { playedSeconds } = state;
    const foundSegments = videoDetail.segments.find((segment) => {
      return (
        playedSeconds >= segment.startFrame && playedSeconds < segment.endFrame
      );
    });
    const newActive = foundSegments ? foundSegments.id : null;
    if (newActive !== activeSegment) {
      setActiveSegment(newActive);
    }
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
              onProgress={onProgress}
              ref={ref}
              width="100%"
              height="100%"
              className={styles.playerWrapper}
              url={videoDetail.url}
              onReady={() => setLoadingVideo(false)}
            />
            <p className="mt-3">{videoDetail.description}</p>
          </Col>
          <Col lg="5" md="12">
            <AnnotatorList
              activeSegment={activeSegment}
              onSeekToSegment={onSeekToSegment}
              segments={videoDetail.segments || []}
              onAnnotate={onAnnotate}
            />
          </Col>
        </Row>
        <AnnotatorForm open={open} toggleModal={toggleModal} />
      </Col>
    </DashboardLayout>
  );
};

export default VideoDetail;
