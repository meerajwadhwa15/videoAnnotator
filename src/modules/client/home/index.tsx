import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
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
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import { useAppSelector } from 'redux/hooks';
import {
  videosListSelector,
  categoriesSelector,
  videoListPaginationSelector,
} from './slice';
import ClientLayout from 'components/layouts/ClientLayout';
import { Input, Select } from 'components/elements';
import { Pagination } from 'components/elements/Pagination';
import { Category } from 'models';
import { request } from 'utils/apiClient';
import { CLIENT_ROUTING } from 'utils/constants';
import styles from './style.module.scss';

const Home = () => {
  const { pathname, query } = useRouter();
  const router = useRouter();
  const { t } = useTranslation(['client-home']);

  const videosData = useAppSelector(videosListSelector);
  const categories = useAppSelector(categoriesSelector);
  const { totalPage, totalRecord } = useAppSelector(
    videoListPaginationSelector
  );
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

  function clearFormData() {
    if (values.search || values.categoryId || values.subcategoryId) {
      setFieldValue('search', '');
      setFieldValue('categoryId', '');
      setFieldValue('subcategoryId', '');
    }

    if (Object.keys(query).length > 0) {
      router.push(
        {
          pathname: pathname,
          query: {},
        }
        // undefined, { shallow: true }
      );
    }
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
                    <Link
                      href={`${CLIENT_ROUTING.videoDetail}/${data.id}`}
                      locale={router.locale}
                    >
                      <a className={styles.videoItem}>
                        <Card className={styles.card}>
                          <div className={styles.imgWrapper}>
                            <CardImg
                              src={
                                data.thumbnail ||
                                'https://place-hold.it/300x300'
                              }
                            />
                          </div>
                          <CardBody className={styles.cardBody}>
                            <CardTitle>{data.name}</CardTitle>
                            <p
                              title={data.description}
                              className={styles.cardDes}
                            >
                              {data.description}
                            </p>
                          </CardBody>
                        </Card>
                      </a>
                    </Link>
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
    </ClientLayout>
  );
};

export default Home;
