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
  FormInput,
} from 'shards-react';
import ReactPlayer from 'react-player/lazy';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
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
import classNames from 'classnames';

const Home = () => {
  const dispatch = useAppDispatch();
  const { pathname, query } = useRouter();
  const router = useRouter();
  const { t } = useTranslation(['client-home']);
  const videoRef = useRef<any>();

  const videosData = useAppSelector(videosListSelector);
  const videoDetailStore = useAppSelector(videoDetailSelector);
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
  const [search, setSearch] = useState<string>('');
  const [loadingCat, setLoadingCat] = useState<boolean>(false);
  const [videoDetail, setVideoDetail] = useState(videoDetailStore);

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

  useEffect(() => {
    setVideoDetail(videoDetailStore);
  }, [videoDetailStore]);

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
    toast.error(t('videoLoadError'));
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
                  label={t('videoSearchLabel')}
                  name="search"
                  value={values.search}
                  placeholder={t('videoSearchPlaceHolder')}
                  onChange={handleChange}
                />
              </Col>
              <Col lg="3">
                <Select
                  label={t('videoCategoryLabel')}
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
                  label={t('videoSubCategoryLabel')}
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
                  {t('videoSearchBtn')}
                </Button>
                <Button
                  outline
                  type="button"
                  disabled={loadingCat}
                  onClick={clearFormData}
                >
                  {t('videoClearBtn')}
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
        {/* Video card list */}
        <div className={styles.listWrapper}>
          {!videosData ||
            (Array.isArray(videosData) && videosData.length == 0 && (
              <h5 className="text-center mt-4">{t('noVideo')}</h5>
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
            <p className={styles.loadingPlaceholder}>{t('loadingVideoText')}</p>
          ) : (
            <React.Fragment>
              {isLoadingVideo && (
                <p className={styles.loadingPlaceholder}>
                  {t('loadingVideoText')}
                </p>
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
                      <div className={styles.sectionHeader}>
                        {t('videoSectionText')}
                      </div>
                      <div className={styles.sectionContent}>
                        {Array.isArray(videoDetailStore?.segments) &&
                          videoDetailStore.segments.length > 4 && (
                            <FormInput
                              value={search}
                              onChange={onSearchAnnotation}
                              className="border-bottom rounded-0"
                              placeholder={t('searchAnnotation')}
                            />
                          )}
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
                              <Row>
                                <Col lg="3">
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
                                <Col lg="9">
                                  <div className={styles.sectionLabel}>
                                    {item.label}
                                  </div>
                                  <div className={styles.sectionTime}>
                                    {convertSecondsToTimeString(
                                      item.startFrame
                                    )}{' '}
                                    -{' '}
                                    {convertSecondsToTimeString(item.endFrame)}
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          ))
                        ) : (
                          <div className={styles.noSection}>
                            {t('noVideoSection')}
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
                    <span className={styles.subLabel}>
                      {t('videoNameLabel')}:
                    </span>
                    <span className={styles.subValue}>{videoDetail.name}</span>
                  </div>
                  <div>
                    <span className={styles.subLabel}>
                      {t('videoCategoryLabel')}:
                    </span>
                    <span className={styles.subValue}>
                      {videoDetail.subCategory?.name}
                    </span>
                  </div>
                  <div>
                    <span className={styles.subLabel}>
                      {t('videoSubCategoryLabel')}:
                    </span>
                    <span className={styles.subValue}>
                      {videoDetail.subCategory?.category?.name}
                    </span>
                  </div>
                  <div>
                    <Button block type="button" onClick={onCloseModal}>
                      {t('videoCLoseBtn')}
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
