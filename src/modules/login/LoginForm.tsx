/* eslint jsx-a11y/anchor-is-valid: 0 */
import React, { useEffect } from 'react';
import { CardBody, Form, FormGroup, FormCheckbox, Button } from 'shards-react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { LoginSchema } from 'validations/LoginSchema';
import {
  loadingSelector,
  messageSelector,
  dispatchLogin,
  clearMessage,
} from './slice';
import Input from 'components/elements/Input';
import { useTranslation } from 'next-i18next';

export const LoginForm = () => {
  const loading = useAppSelector(loadingSelector);
  const message = useAppSelector(messageSelector);
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['login']);

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    validationSchema: LoginSchema(t),
    onSubmit: (values) => {
      const { email, password, remember } = values;
      dispatch(dispatchLogin({ email, password, remember }));
    },
  });
  const { values, errors, setFieldValue, handleChange, handleSubmit } =
    loginForm;

  useEffect(() => {
    if (message.type === 'error') {
      toast.error('🚀 Login error!');
    }

    return () => {
      dispatch(clearMessage());
    };
  }, [message, dispatch]);

  return (
    <CardBody>
      <h5 className="auth-form__title text-center mb-4">
        {t('login:loginFormTitle')}
      </h5>
      <Form onSubmit={handleSubmit}>
        <Input
          value={values.email}
          onChange={handleChange}
          errorMessage={errors.email}
          name="email"
          label={t('login:loginFormEmailLabel')}
          placeholder={t('login:loginFormEmailPlaceholder')}
          autoComplete="email"
        />
        <Input
          value={values.password}
          onChange={handleChange}
          errorMessage={errors.password}
          name="password"
          label={t('login:loginFormPasswordTitle')}
          type="password"
          placeholder={t('login:loginFormPasswordPlaceholder')}
          autoComplete="current-password"
        />
        <FormGroup>
          <FormCheckbox
            id="remember_me"
            name="remember"
            checked={values.remember}
            onChange={() => setFieldValue('remember', !values.remember)}
          >
            {t('login:loginFormRememberTitle')}
          </FormCheckbox>
        </FormGroup>
        <Button
          block
          type="submit"
          disabled={loading}
          className="d-table mx-auto"
        >
          {loading
            ? t('login:loadingSigninTitle')
            : t('login:loginFormSubmitButton')}
        </Button>
      </Form>
    </CardBody>
  );
};
