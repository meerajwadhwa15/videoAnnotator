import React, { useState, useRef, useEffect } from 'react';
import {
  Row,
  Col,
  Form,
  Card,
  CardTitle,
  CardImg,
  CardBody,
  Button,
} from 'shards-react';
import ReactPlayer from 'react-player/lazy';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
// import { useTranslation } from 'next-i18next';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  getVideoDetail,
  videosListSelector,
  videoDetailSelector,
  categoriesSelector,
  videoListPaginationSelector,
  loadingSelector,
} from './slice';
import ClientLayout from 'components/layouts/ClientLayout';
import { Input, Select } from 'components/elements';
import { Pagination } from 'components/elements/Pagination';
import { Category } from 'models';
import { request } from 'utils/apiClient';
import { convertSecondsToTimeString } from 'utils/helpers';
import styles from './style.module.scss';

const Home = () => {
  const dispatch = useAppDispatch();
  const { pathname, query } = useRouter();
  const router = useRouter();
  // const { t } = useTranslation(['common', 'client-home']);
  const videoRef = useRef<any>();

  const videosData = useAppSelector(videosListSelector);
  const videoDetail = useAppSelector(videoDetailSelector);
  const categories = useAppSelector(categoriesSelector);
  const { totalPage, totalRecord } = useAppSelector(
    videoListPaginationSelector
  );
  const isLoading = useAppSelector(loadingSelector);

  const [watchVideoModal, setWatchVideoModal] = useState(false);
  const [isLoadingVideo, setLoadingVideo] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [subCategory, setSubcategory] = useState<Record<string, Category[]>>(
    {}
  );
  const [loadingCat, setLoadingCat] = useState<boolean>(false);

  const form = useFormik({
    initialValues: {
      search: query.search || '',
      categoryId: query.categoryId || '',
      subcategoryId: query.subcategoryId || '',
    },
    onSubmit: (values) => {
      const { search, categoryId, subcategoryId } = values;
      const newQuery: any = {
        ...(search && { search }),
        ...(categoryId && { categoryId }),
        ...(subcategoryId && { subcategoryId }),
      };

      if (Object.keys(newQuery).length == 0) {
        return;
      }

      router.push(
        {
          pathname: pathname,
          query: newQuery,
        }
        // undefined, { shallow: true }
      );
    },
  });

  const { values, handleChange, setFieldValue, handleSubmit } = form;
  const categoryId =
    typeof values.categoryId === 'string' ? values.categoryId : '';

  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        setLoadingCat(true);
        const result: any = await request.get(`category/${categoryId}/sub`);
        setSubcategory({ ...subCategory, [categoryId]: result });
      } catch (error) {
        setSubcategory(subCategory);
      } finally {
        setLoadingCat(false);
      }
    };
    if (categoryId && !subCategory[categoryId]) {
      fetchSubCategory();
    }
  }, [categoryId, subCategory]);

  function ref(player) {
    videoRef.current = player;
  }

  function clearFormData() {
    if (Object.keys(query).length == 0) {
      return;
    }

    setFieldValue('search', '');
    setFieldValue('categoryId', '');
    setFieldValue('subcategoryId', '');
    router.push(
      {
        pathname: pathname,
        query: {},
      }
      // undefined, { shallow: true }
    );
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

  function onVideoError() {
    toast.error('Loading video error.');
    setLoadingVideo(false);
  }

  return (
    <ClientLayout>
      <div className={styles.homeWrapper}>
        {/* Video search bar */}
        <div className={styles.searchWrapper}>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col lg="3">
                <Input
                  label="Search video"
                  name="search"
                  value={values.search}
                  placeholder="Search video by name or description..."
                  onChange={handleChange}
                />
              </Col>
              <Col lg="3">
                <Select
                  label="Category"
                  name="categoryId"
                  value={values.categoryId}
                  options={categories.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                  onChange={handleChange}
                />
              </Col>
              <Col lg="3">
                <Select
                  label="Sub category"
                  name="subcategoryId"
                  value={values.subcategoryId}
                  options={(subCategory[categoryId] || []).map((it) => ({
                    label: it.name,
                    value: it.id,
                  }))}
                  onChange={handleChange}
                />
              </Col>
              <Col lg="3" className={styles.searchBtnWrapper}>
                <Button type="submit" disabled={loadingCat}>
                  Search
                </Button>
                <Button
                  outline
                  type="button"
                  disabled={loadingCat}
                  onClick={clearFormData}
                >
                  Clear
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
        {/* Video card list */}
        <div className={styles.listWrapper}>
          {!videosData ||
            (Array.isArray(videosData) && videosData.length == 0 && (
              <h5 className="text-center mt-4">No videos found.</h5>
            ))}
          {Array.isArray(videosData) && videosData.length > 0 && (
            <React.Fragment>
              <Pagination
                unit="videos"
                totalPage={totalPage}
                totalRecord={totalRecord}
              />
              <Row>
                {videosData.map((data) => (
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
                            src={
                              data.thumbnail || 'https://place-hold.it/300x300'
                            }
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
              <Pagination
                unit="videos"
                totalPage={totalPage}
                totalRecord={totalRecord}
                showTotalRecords={false}
              />
            </React.Fragment>
          )}
        </div>
      </div>
      {/* Watch Video Modal */}
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
                    onError={onVideoError}
                  />
                </Col>
                {!isLoadingVideo && (
                  <Col lg="4" sm="6" xs="12">
                    <div className={styles.videoSection}>
                      <div className={styles.sectionHeader}>Video Section</div>
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
                                {convertSecondsToTimeString(item.startFrame)} -{' '}
                                {convertSecondsToTimeString(item.endFrame)}
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
    </ClientLayout>
  );
};

export default Home;
