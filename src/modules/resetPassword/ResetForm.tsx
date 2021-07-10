/* eslint jsx-a11y/anchor-is-valid: 0 */
import React, { useEffect } from 'react';
import { CardBody, Form, Button } from 'shards-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Input from 'components/elements/Input';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  resetPassword,
  loadingSelector,
  messageSelector,
  clearMessage,
} from './slice';

export const ResetForm = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(loadingSelector);
  const message = useAppSelector(messageSelector);
  // const router = useRouter();
  const form = useFormik({
    initialValues: {
      new_password: '',
      confirm_password: '',
    },
    validationSchema: Yup.object().shape({
      new_password: Yup.string().required('New password is required.'),
      confirm_password: Yup.string()
        .required('Confirm password is required.')
        .oneOf([Yup.ref('new_password'), null], 'Password must match'),
    }),
    onSubmit: (values) => {
      const { new_password, confirm_password } = values;
      dispatch(resetPassword({ new_password, confirm_password, token }));
    },
  });

  const { values, handleChange, handleSubmit, errors } = form;

  useEffect(() => {
    if (message.type === 'success') {
      form.resetForm();
      toast.success('🚀 Create new password successfully !');
    }

    if (message.type === 'error') {
      toast.error('🚀 Create new password error !');
    }

    return () => {
      dispatch(clearMessage());
    };
  }, [message, dispatch, form]);

  const token = '123';
  // const { token } = router.query;
  if (!token) {
    return <>Loading...</>;
  }

  return (
    <CardBody>
      <h5 className="auth-form__title text-center mb-4">Create New Password</h5>
      <Form onSubmit={handleSubmit}>
        <Input
          invalid={errors.new_password ? true : false}
          value={values.new_password}
          onChange={handleChange}
          errorMessage={errors.new_password}
          name="new_password"
          label="New Password"
          type="password"
          placeholder="Enter new password"
        />
        <Input
          invalid={errors.confirm_password ? true : false}
          value={values.confirm_password}
          onChange={handleChange}
          errorMessage={errors.confirm_password}
          name="confirm_password"
          label="Confirm Password"
          type="password"
          placeholder="Confirm new password"
        />
        <Button
          block
          type="submit"
          disabled={loading}
          className="d-table mx-auto"
        >
          {loading ? 'Checking...' : 'Create new password'}
        </Button>
      </Form>
    </CardBody>
  );
};
