import { useState } from 'react';
import { Button, FormInput, Row, Col, Collapse } from 'shards-react';
import { Select } from 'components/elements';
import { useManageCategory } from './useManageCategory';
import { useAppSelector } from 'redux/hooks';
import { categoriesSelector } from './slice';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export const VideoSearchBar = () => {
  const { pathname, query } = useRouter();
  const [open, setOpen] = useState<boolean>();
  const toggleOpen = () => setOpen((last) => !last);
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
    <Row className="mt-4 mb-2">
      <Col className="d-flex" lg="6">
        <FormInput
          placeholder={t('home:searchForVideosLabel')}
          name="search"
          value={values.search}
          onChange={handleChange}
        />
        <span className="mr-2" />
        <Button onClick={handleSubmit} style={{ padding: '8px 16px' }}>
          <i className="material-icons">search</i>
        </Button>
        <span className="mr-2" />
        <Button
          style={{ padding: '8px 16px' }}
          onClick={toggleOpen}
          theme={open ? 'link' : 'white'}
          className={open ? 'border-primary' : 'border'}
        >
          <i className="material-icons">menu</i>
        </Button>
      </Col>
      <Col lg="6"></Col>
      <Col lg="12">
        <Collapse className="mt-2 mb-2" open={open}>
          <div className="border p-3 rounded pl-4">
            <Row>
              <Col lg="3">
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
              <Col lg="3">
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
              <div className="d-flex flex-column mr-2">
                <label className="invisible">.</label>
                <Button onClick={handleSubmit} disabled={loadingSubs}>
                  {t('common:applyButton')}
                </Button>
              </div>
              <div className="d-flex flex-column">
                <label className="invisible">.</label>
                <Button
                  className="border"
                  theme="white"
                  onClick={clearFormData}
                >
                  {t('common:clearButton')}
                </Button>
              </div>
            </Row>
          </div>
        </Collapse>
      </Col>
    </Row>
  );
};
