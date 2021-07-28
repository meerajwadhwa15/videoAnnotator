import React, { useState, useRef, useEffect } from 'react';
import {
  Row,
  Col,
  Form,
  FormInput,
  Card,
  CardTitle,
  CardImg,
  CardBody,
  Button,
} from 'shards-react';
import ReactPlayer from 'react-player/lazy';
import ClientLayout from 'components/layouts/ClientLayout';
import {
  getVideoDetail,
  videosListSelector,
  videoDetailSelector,
  loadingSelector,
} from './slice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { convertSecondsToTimeString } from 'utils/helpers';
import styles from './style.module.scss';

const Home = () => {
  const dispatch = useAppDispatch();

  const videosListStore = useAppSelector(videosListSelector);
  const videoDetail = useAppSelector(videoDetailSelector);
  const isLoading = useAppSelector(loadingSelector);

  const [videoData, setVideoData] = useState(videosListStore);
  const [search, setSearch] = useState('');
  const [watchVideoModal, setWatchVideoModal] = useState(false);
  const [isLoadingVideo, setLoadingVideo] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const videoRef = useRef<any>();

  useEffect(() => {
    setVideoData(videosListStore);
  }, [videosListStore]);

  function ref(player) {
    videoRef.current = player;
  }

  function onChange(event) {
    const name = event.target.value;
    if (name) {
      const temp = videosListStore.filter((data) => {
        if (data.name.toLowerCase().includes(name.toLowerCase())) {
          return data;
        }
      });
      setVideoData(temp);
    } else {
      setVideoData(videosListStore);
    }
    setSearch(event.target.value);
  }

  function onOpenModal(videoId) {
    setWatchVideoModal(true);
    setLoadingVideo(true);
    dispatch(getVideoDetail(videoId));
  }

  function onCloseModal() {
    const player = videoRef.current.getInternalPlayer();
    if (player && player.stopVideo) {
      player.stopVideo();
    }

    setActiveSection(null);
    setWatchVideoModal(false);
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

  const onProgress = (state) => {
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
  };

  return (
    <ClientLayout>
      <div className={styles.homeWrapper}>
        <div className={styles.searchWrapper}>
          <Form>
            <FormInput
              value={search}
              onChange={onChange}
              name="search"
              placeholder="Search..."
            />
          </Form>
        </div>
        <div className={styles.listWrapper}>
          <Row>
            {videoData.map((data) => (
              <Col xl="2" lg="3" sm="4" xs="12" key={data.id}>
                <a
                  href="#"
                  onClick={() => {
                    onOpenModal(data.id);
                  }}
                  className={styles.videoItem}
                >
                  <Card className={styles.card}>
                    <div className={styles.imgWrapper}>
                      <CardImg
                        src={data.thumbnail || 'https://place-hold.it/300x300'}
                      />
                    </div>
                    <CardBody className={styles.cardBody}>
                      <CardTitle>{data.name}</CardTitle>
                      <p>{data.description}</p>
                    </CardBody>
                  </Card>
                </a>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      {/* Watch Video Modal */}
      {
        <div
          className={`${styles.watchVMWrapper} ${
            watchVideoModal ? styles.watchVMWrapperOpen : ''
          }`}
        >
          <div className={styles.modalHeader}>
            <div className={styles.modalTitle}>
              {!isLoading && !isLoadingVideo ? videoDetail.name : ''}
            </div>
            <div>
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={onCloseModal}
              >
                <i className="material-icons">close</i>
              </button>
            </div>
          </div>
          <div className={styles.modalContent}>
            {isLoading ? (
              <p className={styles.loadingPlaceholder}>Loading video...</p>
            ) : (
              <React.Fragment>
                {isLoadingVideo && (
                  <p className={styles.loadingPlaceholder}>Loading video...</p>
                )}
                <Row>
                  <Col lg="8" sm="6" xs="12">
                    <ReactPlayer
                      controls
                      pip
                      ref={ref}
                      width="100%"
                      height="500px"
                      className={styles.playerWrapper}
                      url={videoDetail.url}
                      onReady={() => setLoadingVideo(false)}
                      onProgress={onProgress}
                    />
                  </Col>
                  {!isLoadingVideo && (
                    <Col lg="4" sm="6" xs="12">
                      <div className={styles.videoSection}>
                        <div className={styles.sectionHeader}>
                          Video Section
                        </div>
                        <div className={styles.sectionContent}>
                          {Array.isArray(videoDetail.segments) &&
                          videoDetail.segments.length > 0 ? (
                            videoDetail.segments.map((item) => (
                              <div
                                key={item.id}
                                className={`${styles.sectionItem} ${
                                  activeSection == item.id
                                    ? styles.sectionItemActive
                                    : ''
                                }`}
                                onClick={() => {
                                  onSeekToSection(item.id, item.startFrame);
                                }}
                              >
                                <div className={styles.sectionLabel}>
                                  {item.label}
                                </div>
                                <div className={styles.sectionTime}>
                                  {convertSecondsToTimeString(item.startFrame)}{' '}
                                  - {convertSecondsToTimeString(item.endFrame)}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className={styles.noSection}>
                              No video section found.
                            </div>
                          )}
                        </div>
                      </div>
                    </Col>
                  )}
                </Row>
                {!isLoadingVideo && (
                  <div className={styles.videoInforWrapper}>
                    <div>
                      <span>Video name:</span> {videoDetail.name}
                    </div>
                    <div>
                      <span>Category:</span> {videoDetail.subCategory?.name}
                    </div>
                    <div>
                      <span>Sub-category:</span>{' '}
                      {videoDetail.subCategory?.category?.name}
                    </div>
                    <div>
                      <Button type="button" onClick={onCloseModal}>
                        Close
                      </Button>
                    </div>
                  </div>
                )}
              </React.Fragment>
            )}
          </div>
        </div>
      }
    </ClientLayout>
  );
};

export default Home;
