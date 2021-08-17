import React, { useRef, useState, useEffect } from 'react';
import { Col, Row } from 'shards-react';
import { useAppSelector } from 'redux/hooks';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-toastify';

import ClientLayout from 'components/layouts/ClientLayout';
import PlayerSection from './PlayerSection';
import AnnotationSection from './AnnotationSection';
import AddToVideoModal from './AddToVideoModal';
import { VideoInfo } from 'models';
import { videoDetailSelector } from './slice';
import styles from './style.module.scss';

const VideoDetail = () => {
  // const dispatch = useAppDispatch();
  const { t } = useTranslation(['client-video-detail']);

  const videoDetailStore = useAppSelector(videoDetailSelector);

  const [search, setSearch] = useState<string>('');
  const [videoDetail, setVideoDetail] = useState<VideoInfo>(videoDetailStore);
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [isLoadingVideo, setLoadingVideo] = useState<boolean>(true);
  const [isAddToModalOpen, setAddToModal] = useState<boolean>(false);

  const videoRef = useRef<any>();

  useEffect(() => {
    setVideoDetail(videoDetailStore);
    console.log('videoDetailStore', videoDetailStore);
  }, [videoDetailStore]);

  function ref(player) {
    videoRef.current = player;
  }

  function onSeekToSection(id, frame) {
    setActiveSection(id);
    videoRef.current.seekTo(frame, 'seconds');

    const player = videoRef.current.getInternalPlayer();
    if (player.playVideo) {
      player.playVideo();
    } else if (player.play) {
      player.play();
    }
  }

  function onProgress(state) {
    const { playedSeconds } = state;
    const foundSegments = videoDetail.segments.find((segment) => {
      return (
        playedSeconds >= segment.startFrame && playedSeconds < segment.endFrame
      );
    });
    const newActive = foundSegments ? foundSegments.id : null;
    if (newActive !== activeSection) {
      setActiveSection(newActive);
    }
  }

  function onSearchAnnotation(event) {
    setSearch(event.target.value);
    const value = event.target.value.trim().toLowerCase();

    if (!value) {
      setVideoDetail(videoDetailStore);
      return;
    }

    const foundAnnotations = videoDetailStore.segments.filter((segment) => {
      return segment.label.toLowerCase().includes(value);
    });

    setVideoDetail({
      ...videoDetailStore,
      segments: [...foundAnnotations],
    });
  }

  function toggleAddToModal() {
    setAddToModal(!isAddToModalOpen);
  }

  function onVideoError() {
    toast.error(t('videoLoadError'));
    setLoadingVideo(false);
  }

  function onSaveAddTo() {
    console.log('1');
  }

  function onClickLike() {}

  function onClickUnlike() {}

  return (
    <ClientLayout>
      <Col xs="12" className={styles.wrapper}>
        <Row>
          {!isLoadingVideo && (
            <p className={styles.loadingPlaceholder}>{t('loadingVideoText')}</p>
          )}
          <Col lg="8" md="12">
            {/* Player Section */}
            <PlayerSection
              setRef={ref}
              isLoadingVideo={isLoadingVideo}
              setLoadingVideo={setLoadingVideo}
              videoDetail={videoDetail}
              onProgress={onProgress}
              onVideoError={onVideoError}
              toggleAddToModal={toggleAddToModal}
              onClickLike={onClickLike}
              onClickUnlike={onClickUnlike}
            />
          </Col>
          <Col lg="4" md="12">
            {/* Annotation Section */}
            <AnnotationSection
              isLoadingVideo={isLoadingVideo}
              search={search}
              activeSection={activeSection}
              videoDetailStore={videoDetailStore}
              videoDetail={videoDetail}
              onSeekToSection={onSeekToSection}
              onSearchAnnotation={onSearchAnnotation}
            />
          </Col>
          {/* AddToVideoModal */}
          <AddToVideoModal
            isAddToModalOpen={isAddToModalOpen}
            toggleAddToModal={toggleAddToModal}
            onSaveAddTo={onSaveAddTo}
          />
        </Row>
      </Col>
    </ClientLayout>
  );
};

export default VideoDetail;
