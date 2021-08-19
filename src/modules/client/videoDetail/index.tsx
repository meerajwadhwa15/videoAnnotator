import React, { useRef, useState, useEffect, ChangeEvent } from 'react';
import { Col, Row } from 'shards-react';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import ClientLayout from 'components/layouts/ClientLayout';
import PlayerSection from './PlayerSection';
import AnnotationSection from './AnnotationSection';
import AddToVideoModal from './AddToVideoModal';
import RatingVideoModal from './RatingVIdeoModal';
import { VideoInfo, Playlist, UserLike } from 'models';
import { userDataSelector } from 'redux/globalSlice';
import { toggleLoginDialog } from 'modules/authentication/slice';
import { videoDetailSelector, addToLoadingSelector } from './slice';
import {
  saveAddTo,
  likeVideo,
  // ratingVideo,
  // postComment
} from './actions';
import BackButton from 'components/elements/BackButton';
import styles from './style.module.scss';

const VideoDetail = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['client-video-detail']);

  const videoDetailStore = useAppSelector(videoDetailSelector);
  const addToLoading = useAppSelector(addToLoadingSelector);
  const user = useAppSelector(userDataSelector);

  const [search, setSearch] = useState<string>('');
  const [videoDetail, setVideoDetail] = useState<VideoInfo>(videoDetailStore);
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [isLoadingVideo, setLoadingVideo] = useState<boolean>(true);
  const [isAddToModalOpen, setAddToModal] = useState<boolean>(false);
  const [isRatingVideoModalOpen, setRatingVideoModal] =
    useState<boolean>(false);

  const videoRef = useRef<any>();
  useEffect(() => {
    setVideoDetail(videoDetailStore);
    console.log('videoDetailStore', videoDetailStore);
  }, [videoDetailStore]);

  function ref(player) {
    videoRef.current = player;
  }

  function onSeekToSection(id: number, frame: number) {
    setActiveSection(id);
    videoRef.current.seekTo(frame, 'seconds');

    const player = videoRef.current.getInternalPlayer();
    if (player.playVideo) {
      player.playVideo();
    } else if (player.play) {
      player.play();
    }
  }

  function onProgress(state: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  }) {
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

  function onSearchAnnotation(event: ChangeEvent<HTMLInputElement>) {
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
    if (!user.email && !isAddToModalOpen) {
      return dispatch(toggleLoginDialog());
    }

    setAddToModal(!isAddToModalOpen);
  }

  function toggleRatingVideoModal() {
    if (!user.email && !isAddToModalOpen) {
      return dispatch(toggleLoginDialog());
    }

    setRatingVideoModal(!isRatingVideoModalOpen);
  }

  function onVideoError() {
    toast.error(t('videoLoadError'));
    setLoadingVideo(false);
  }

  function onClickLike(likeData: UserLike) {
    if (!user.email) {
      return dispatch(toggleLoginDialog());
    }

    const data = {
      isLike: !likeData.liked,
      isDislike: false,
    };
    dispatch(likeVideo({ id: videoDetail.id, data }));
  }

  function onClickUnlike(likeData: UserLike) {
    if (!user.email) {
      return dispatch(toggleLoginDialog());
    }

    const data = {
      isLike: false,
      isDislike: !likeData.disliked,
    };
    dispatch(likeVideo({ id: videoDetail.id, data }));
  }

  function onCheckbox(event: ChangeEvent<HTMLInputElement>, data: Playlist) {
    const videoDetailTemp = JSON.parse(JSON.stringify(videoDetail));
    const index = videoDetailTemp.playlists.findIndex(
      (item) => item.id === data.id
    );
    videoDetailTemp.playlists[index].selected = event.target.checked;
    setVideoDetail(videoDetailTemp);
  }

  function onSaveAddTo() {
    const data = videoDetail.playlists.map((item) => {
      return {
        id: item.id,
        selected: item.selected,
      };
    });
    dispatch(saveAddTo({ id: videoDetail.id, data }));
  }

  function onRateVideo() {
    console.log('rate');
  }

  return (
    <ClientLayout>
      <Col xs="12" className={styles.wrapper}>
        <div className={styles.backBtnWrapper}>
          <BackButton />
        </div>
        {isLoadingVideo && (
          <p className={styles.loadingPlaceholder}>{t('loadingVideoText')}</p>
        )}
        <Row>
          <Col lg="8" md="12">
            {/* Player Section */}
            <PlayerSection
              setRef={ref}
              isLoadingVideo={isLoadingVideo}
              setLoadingVideo={() => {
                setLoadingVideo(false);
              }}
              videoDetail={videoDetail}
              onProgress={onProgress}
              onVideoError={onVideoError}
              toggleAddToModal={toggleAddToModal}
              toggleRatingVideoModal={toggleRatingVideoModal}
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
            addToLoading={addToLoading}
            videoDetail={videoDetail}
            toggleAddToModal={toggleAddToModal}
            onSaveAddTo={onSaveAddTo}
            onCheckbox={onCheckbox}
          />
          {/* RatingVideoModal */}
          <RatingVideoModal
            isRatingVideoModalOpen={isRatingVideoModalOpen}
            videoDetail={videoDetail}
            toggleRatingVideoModal={toggleRatingVideoModal}
            onRateVideo={onRateVideo}
          />
        </Row>
      </Col>
    </ClientLayout>
  );
};

export default VideoDetail;
