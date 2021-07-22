import { Row, Col, Button, Form } from 'shards-react';
import { useTranslation } from 'next-i18next';
import Input from 'components/elements/Input';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { changeUserPassword, loadingSelector } from './slice';
import { ChangePasswordSchema } from 'validations/UserProfileSchema';

export const ChangePasswordForm = () => {
  const loading = useAppSelector(loadingSelector);
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['profile']);

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      oldPassword: '',
      password: '',
      matchingPassword: '',
    },
    validationSchema: ChangePasswordSchema(t),
    onSubmit: (values) => {
      dispatch(changeUserPassword(values));
    },
  });

  return (
    <Form onSubmit={handleSubmit}>
      <Row form className="mx-4">
        <Col className="mb-3">
          <h6 className="form-text m-0">{t('passwordText1')}</h6>
          <p className="form-text text-muted m-0">{t('passwordText2')}</p>
        </Col>
      </Row>
      <Row form className="mx-4">
        <Col md="4" className="form-group">
          <Input
            label={t('oldPwLabel')}
            name="oldPassword"
            type="password"
            errorMessage={errors.oldPassword}
            value={values.oldPassword}
            onChange={handleChange}
          />
        </Col>
        <Col md="4" className="form-group">
          <Input
            label={t('newPwLabel')}
            name="password"
            type="password"
            errorMessage={errors.password}
            value={values.password}
            onChange={handleChange}
          />
        </Col>
        <Col md="4" className="form-group">
          <Input
            label={t('confirmPwLabel')}
            name="matchingPassword"
            type="password"
            errorMessage={errors.matchingPassword}
            value={values.matchingPassword}
            onChange={handleChange}
          />
        </Col>
        <Col xs="12" className="form-group">
          <Button
            type="submit"
            disabled={loading.password}
            block
            className="d-table mr-3"
          >
            {loading.password
              ? t('changePasswordBtnLoading')
              : t('changePasswordBtn')}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
