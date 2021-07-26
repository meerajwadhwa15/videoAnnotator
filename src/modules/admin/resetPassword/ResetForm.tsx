/* eslint jsx-a11y/anchor-is-valid: 0 */
import React, { useEffect } from 'react';
import { CardBody, Form, Button } from 'shards-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Input from 'components/elements/Input';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  resetPassword,
  loadingSelector,
  messageSelector,
  clearMessage,
} from './slice';
import { useTranslation } from 'next-i18next';

export const ResetForm = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(loadingSelector);
  const message = useAppSelector(messageSelector);
  const {
    query: { token },
  } = useRouter();
  const { t } = useTranslation(['reset-password']);

  const form = useFormik({
    initialValues: {
      password: '',
      matchingPassword: '',
    },
    validationSchema: Yup.object().shape({
      password: Yup.string().required(
        t('reset-password:newPasswordRequiredError')
      ),
      matchingPassword: Yup.string().oneOf(
        [Yup.ref('password'), null],
        t('reset-password:passwordsMustMatchError')
      ),
    }),
    onSubmit: (values) => {
      const { password, matchingPassword } = values;
      dispatch(resetPassword({ password, matchingPassword, token }));
    },
  });

  const { values, handleChange, handleSubmit, errors } = form;

  useEffect(() => {
    if (message.type === 'success') {
      toast.success(t('reset-password:createNewPasswordSuccess'));
    }

    if (message.type === 'error') {
      toast.error(t('reset-password:createNewPasswordFail'));
    }

    return () => {
      dispatch(clearMessage());
    };
  }, [message, dispatch, t]);

  return (
    <CardBody>
      <h5 className="auth-form__title text-center mb-4">
        {t('reset-password:resetPassFormTitle')}
      </h5>
      <Form onSubmit={handleSubmit}>
        <Input
          value={values.password}
          onChange={handleChange}
          errorMessage={errors.password}
          name="password"
          label={t('reset-password:passwordInputLabel')}
          type="password"
          placeholder={t('reset-password:passwordInputPlaceholer')}
        />
        <Input
          value={values.matchingPassword}
          onChange={handleChange}
          errorMessage={errors.matchingPassword}
          name="matchingPassword"
          label={t('reset-password:confirmPasswordInputLabel')}
          type="password"
          placeholder={t('reset-password:confirmPasswordInputPlaceholder')}
        />
        <Button
          block
          type="submit"
          disabled={loading}
          className="d-table mx-auto"
        >
          {loading
            ? t('reset-password:createNewPasswordLoadingBtn')
            : t('reset-password:createNewPasswordSubmitBtn')}
        </Button>
      </Form>
    </CardBody>
  );
};
