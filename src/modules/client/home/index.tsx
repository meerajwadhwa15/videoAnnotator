import React, { useState, useRef } from 'react';
import {
  Row,
  Col,
  Form,
  FormInput,
  Card,
  CardTitle,
  CardImg,
  CardBody,
} from 'shards-react';
import ReactPlayer from 'react-player/lazy';
import ClientLayout from 'components/layouts/ClientLayout';
import styles from './style.module.scss';
import { sampleData } from './sampleData';

const Home = () => {
  const [search, setSearch] = useState('');
  const [videoData, setVideoData] = useState(sampleData);
  const [watchVideoModal, setWatchVideoModal] = useState(false);
  const [isLoadingVideo, setLoadingVideo] = useState<boolean>(true);
  const videoRef = useRef<any>();

  function ref(player) {
    videoRef.current = player;
  }

  function onChange(event) {
    const name = event.target.value;
    if (name) {
      const temp = sampleData.filter((data) => {
        if (data.name.includes(name)) {
          return data;
        }
      });
      setVideoData(temp);
    } else {
      setVideoData(sampleData);
    }
    setSearch(event.target.value);
  }

  function onOpenModal() {
    if (!isLoadingVideo) {
      setWatchVideoModal(true);
    }
  }

  function onCloseModal() {
    setWatchVideoModal(false);
  }

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
              <Col xl="2" lg="2" md="3" sm="4" xs="12" key={data.id}>
                <a href="#" onClick={onOpenModal} className={styles.videoItem}>
                  <Card>
                    <CardImg src={data.thumbnail} />
                    <CardBody>
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
            <div className={styles.modalTitle}>Pip | Short Animated Film</div>
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
            {isLoadingVideo && (
              <div className={styles.videoPlaceHoldler}>Loading video...</div>
            )}
            <ReactPlayer
              controls
              pip
              ref={ref}
              width="60%"
              height="500px"
              className={styles.playerWrapper}
              url="https://youtube.com/watch?v=07d2dXHYb94"
              onReady={() => setLoadingVideo(false)}
            />
            <div
              style={{
                textAlign: 'center',
                marginTop: '30px',
                fontSize: '30px',
              }}
            >
              Annotation goes here.
            </div>
          </div>
        </div>
      }
    </ClientLayout>
  );
};

export default Home;
