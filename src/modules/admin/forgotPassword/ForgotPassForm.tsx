import React, { useEffect } from 'react';
import { Form, Button } from 'shards-react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import Input from 'components/elements/Input';
import { ForgotPassSchema } from 'validations/ForgotPassSchema';
import {
  dispatchForgotPassword,
  loadingSelector,
  messageSelector,
  clearMessage,
} from './slice';

const ForgotPassForm = () => {
  const { t } = useTranslation(['forgot-password']);

  const dispatch = useAppDispatch();
  const loading = useAppSelector(loadingSelector);
  const message = useAppSelector(messageSelector);

  const form = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: ForgotPassSchema(t),
    onSubmit: (values) => {
      dispatch(dispatchForgotPassword(values));
    },
  });

  const { values, handleChange, handleSubmit, errors } = form;

  useEffect(() => {
    if (message.type === 'success') {
      form.resetForm();
      toast.success(t('forgot-password:sendSuccess'));
    }

    if (message.type === 'error') {
      toast.error(t('forgot-password:sendError'));
    }

    return () => {
      dispatch(clearMessage());
    };
  }, [message, dispatch, form, t]);

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        value={values.email}
        onChange={handleChange}
        errorMessage={errors.email}
        placeholder={t('forgot-password:formEmailPlaceholder')}
        autoComplete="email"
        label={t('forgot-password:formEmailLabel')}
        name="email"
      />
      <small className="form-text text-muted text-center mb-3">
        {t('forgot-password:textNoti')}
      </small>
      <Button
        disabled={loading}
        block
        className="d-table mx-auto"
        type="submit"
      >
        {loading
          ? t('forgot-password:loadingSubmit')
          : t('forgot-password:formSubmitButton')}
      </Button>
    </Form>
  );
};

export default ForgotPassForm;
