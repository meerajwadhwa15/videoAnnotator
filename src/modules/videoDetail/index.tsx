import React, { useState } from 'react';
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button,
} from 'shards-react';
import ReactPlayer from 'react-player/lazy';
import { useAppSelector } from 'redux/hooks';
import DashboardLayout from 'components/layouts/DashboardLayout';
import PageTitle from 'components/elements/pageTitle';
import { videoDetailSelector } from './slice';
import { displayVideoStatus } from 'utils/helpers';
import styles from './style.module.scss';

const VideoDetail = () => {
  const videoDetail = useAppSelector(videoDetailSelector);
  const [isLoadingVideo, setLoadingVideo] = useState(true);

  return (
    <DashboardLayout>
      {/* Page Title */}
      <PageTitle title="Video Detail" subtitle="Video" />
      {/* Video */}
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
      </Col>
      {/* Video Settings */}
      <Col lg="5" md="12">
        <Card small>
          <CardHeader className={styles.cardHead}>
            <h6 className="m-0">Video Information</h6>
          </CardHeader>
          <CardBody className="p-0">
            {Object.keys(videoDetail).length > 0 && (
              <ListGroup flush>
                <ListGroupItem className="p-3">
                  {/* Id */}
                  <span className="d-flex mb-3">
                    <i className="material-icons mr-2">location_on</i>
                    <strong className="mr-2">Id:</strong> {videoDetail.id}
                    {/* Name */}
                  </span>
                  <span className="d-flex mb-3">
                    <i className="material-icons mr-1">play_circle_outline</i>
                    <strong className="mr-1">Name:</strong> {videoDetail.name}
                  </span>
                  {/* Status */}
                  <span className="d-flex mb-3">
                    <i className="material-icons mr-2">video_library</i>
                    <strong className="mr-2">Status:</strong>{' '}
                    {displayVideoStatus(videoDetail.status)}
                  </span>
                  {/* Format */}
                  <span className="d-flex mb-3">
                    <i className="material-icons mr-2">text_format</i>
                    <strong className="mr-2">Format:</strong>{' '}
                    {videoDetail.format}
                  </span>
                  {/* Size */}
                  <span className="d-flex mb-3">
                    <i className="material-icons mr-2">folder</i>
                    <strong className="mr-2">Size:</strong> {videoDetail.size}
                  </span>
                  {/* Description */}
                  <span className="d-flex mb-3">
                    <i className="material-icons mr-2">description</i>
                    <strong className="mr-2">Description:</strong>{' '}
                    {videoDetail.description}
                  </span>
                </ListGroupItem>
                <ListGroupItem
                  className="d-flex px-3"
                  style={{
                    borderTop: '1px solid #dae9f9',
                    justifyContent: 'space-between',
                  }}
                >
                  <Button
                    size="sm"
                    onClick={() => window.alert('under development')}
                  >
                    <i className="material-icons">save</i> Annotate
                  </Button>
                  <Button
                    outline
                    size="sm"
                    onClick={() => window.alert('under development')}
                  >
                    <i className="material-icons">cancel</i> Cancel
                  </Button>
                </ListGroupItem>
              </ListGroup>
            )}
          </CardBody>
        </Card>
      </Col>
    </DashboardLayout>
  );
};

export default VideoDetail;
