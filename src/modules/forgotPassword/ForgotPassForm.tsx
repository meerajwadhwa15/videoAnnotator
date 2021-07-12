import React, { useEffect } from 'react';
import { Form, Button } from 'shards-react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
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
  const dispatch = useAppDispatch();
  const loading = useAppSelector(loadingSelector);
  const message = useAppSelector(messageSelector);

  const form = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: ForgotPassSchema,
    onSubmit: (values) => {
      dispatch(dispatchForgotPassword(values));
    },
  });

  const { values, handleChange, handleSubmit, errors } = form;

  useEffect(() => {
    if (message.type === 'success') {
      form.resetForm();
      toast.success('🚀 Send email successfully!');
    }

    if (message.type === 'error') {
      toast.error('🚀 Send email failed!');
    }

    return () => {
      dispatch(clearMessage());
    };
  }, [message, dispatch, form]);

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        value={values.email}
        onChange={handleChange}
        errorMessage={errors.email}
        placeholder="Enter email"
        autoComplete="email"
        label="Email address"
        name="email"
      />
      <small className="form-text text-muted text-center mb-3">
        You will receive an email with a unique token.
      </small>
      <Button
        disabled={loading}
        block
        className="d-table mx-auto"
        type="submit"
      >
        {loading ? 'Sending email...' : 'Reset Password'}
      </Button>
    </Form>
  );
};

export default ForgotPassForm;
