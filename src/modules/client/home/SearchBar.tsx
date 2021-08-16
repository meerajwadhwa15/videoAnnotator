import React from 'react';
import { useRouter } from 'next/router';
import { Row, Col, Form, Button } from 'shards-react';
import { useTranslation } from 'next-i18next';
import { Input } from 'components/elements';
import styles from './style.module.scss';
import { useFormik } from 'formik';

export const SearchBar = () => {
  const { t } = useTranslation(['client-home']);
  const { query, pathname, push } = useRouter();

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      search: query.search || '',
    },
    onSubmit: (values) => {
      const { search } = values;
      const newQuery: any = {
        ...(search && { search }),
      };
      push(
        {
          pathname: pathname,
          query: newQuery,
        }
        // undefined, { shallow: true }
      );
    },
  });

  return (
    <div className={styles.searchWrapper}>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg="6">
            <Input
              name="search"
              value={values.search}
              placeholder={t('videoSearchPlaceHolder')}
              onChange={handleChange}
            />
          </Col>
          <div>
            <Button
              style={{ height: '40px' }}
              type="submit"
              theme="white"
              className="border p-0 px-3"
            >
              <i className="material-icons">search</i>
            </Button>
          </div>
        </Row>
      </Form>
    </div>
  );
};
