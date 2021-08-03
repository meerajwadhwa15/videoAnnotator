import { Row, Col, Form } from 'shards-react';
import { IconButton, Input, Select } from 'components/elements';
import { useManageCategory } from './useManageCategory';
import { useAppSelector } from 'redux/hooks';
import { categoriesSelector } from './slice';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import style from './style.module.scss';

export const VideoSearchBar = () => {
  const { pathname, query } = useRouter();
  const categories = useAppSelector(categoriesSelector);
  const { t } = useTranslation(['common', 'home']);

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      search: query.search || '',
      category: query.categoryId || '',
      subCategory: query.subcategoryId || '',
    },
    onSubmit: (values) => {
      const { category, subCategory, search } = values;
      const newQuery: any = {
        ...(search && { search }),
        ...(category && { categoryId: category }),
        ...(subCategory && { subcategoryId: subCategory }),
      };
      const queryString = new URLSearchParams(newQuery).toString();
      window.location.href = `${pathname}${
        queryString ? `?${queryString}` : ''
      }`;
    },
  });

  const clearFormData = () => {
    setFieldValue('search', '');
    setFieldValue('category', '');
    setFieldValue('subCategory', '');
  };

  const category = typeof values.category === 'string' ? values.category : '';
  const { loadingSubs, subs } = useManageCategory({ category });

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col lg="3">
          <Input
            label={t('home:searchForVideosLabel')}
            placeholder={t('home:searchForVideosPlaceholder')}
            name="search"
            value={values.search}
            onChange={handleChange}
          />
        </Col>
        <Col lg="2">
          <Select
            name="category"
            value={values.category}
            label={t('home:searchVideosByCategoryLabel')}
            onChange={handleChange}
            options={categories.map((it) => ({
              value: it.id,
              label: it.name,
            }))}
          />
        </Col>
        <Col lg="2">
          <Select
            onChange={handleChange}
            name="subCategory"
            value={values.subCategory}
            label={t('home:searchVideosBySubCategoryLabel')}
            options={(subs[category] || []).map((it) => ({
              label: it.name,
              value: it.id,
            }))}
          />
        </Col>
        <Col lg="2" className={style.filterBarButtons}>
          <IconButton
            type="submit"
            title="filter"
            iconName="filter_alt"
            onClick={handleSubmit}
            disabled={loadingSubs}
          />
          <IconButton
            title="clear"
            iconName="clear"
            theme="danger"
            onClick={clearFormData}
            disabled={loadingSubs}
          />
        </Col>
      </Row>
    </Form>
  );
};
