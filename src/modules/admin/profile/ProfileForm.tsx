import { Row, Col, Button, Form, FormTextarea, FormGroup } from 'shards-react';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import Input from 'components/elements/Input';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { userDataSelector } from 'redux/globalSlice';
import { UserProfileSchema } from 'validations/UserProfileSchema';
import { loadingSelector, updateUserProfile } from './slice';
import { Avatar } from './Avatar';

export const ProfileForm = () => {
  const userData = useAppSelector(userDataSelector);
  const loading = useAppSelector(loadingSelector);
  const dispatch = useAppDispatch();
  const { email, fullName, address, introduction, phone, avatar } = userData;
  const { t } = useTranslation(['profile']);

  const { values, handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      fullName: fullName,
      address: address,
      phone: phone || '',
      introduction: introduction,
    },
    validationSchema: UserProfileSchema(t),
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(updateUserProfile({ ...values, avatar }));
    },
  });

  return (
    <Form className="py-4" onSubmit={handleSubmit}>
      <Row form className="mx-4">
        <Col className="mb-3">
          <h6 className="form-text m-0">{t('profileText1')}</h6>
          <p className="form-text text-muted m-0">{t('profileText2')}</p>
        </Col>
      </Row>
      <Row form className="mx-4">
        <Col lg="8">
          <Row form>
            <Col md="6" className="form-group">
              <Input
                label={t('emailLabel')}
                disabled
                name="email"
                value={email}
                prefix={<i className="material-icons">&#xE0BE;</i>}
              />
            </Col>
            <Col md="6" className="form-group">
              <Input
                label={t('nameLabel')}
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                errorMessage={errors.fullName}
                prefix={<i className="material-icons">&#xE0C8;</i>}
              />
            </Col>
            <Col md="6" className="form-group">
              <Input
                label={t('addressLabel')}
                name="address"
                value={values.address}
                onChange={handleChange}
                errorMessage={errors.address}
                prefix={<i className="material-icons">&#xE0C8;</i>}
              />
            </Col>
            <Col md="6" className="form-group">
              <Input
                label={t('phoneLabel')}
                name="phone"
                value={values.phone}
                onChange={handleChange}
                errorMessage={errors.phone}
                prefix={<i className="material-icons">&#xE0CD;</i>}
              />
            </Col>
            <Col md="12">
              <FormGroup>
                <label>{t('introLabel')}</label>
                <FormTextarea
                  style={{ height: 80 }}
                  name="introduction"
                  value={values.introduction}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
        </Col>
        <Avatar />
        <Col>
          <Button
            type="submit"
            disabled={loading.profile}
            block
            className="d-table mr-3"
          >
            {loading.profile ? t('saveProfileBtnLoading') : t('saveProfileBtn')}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
