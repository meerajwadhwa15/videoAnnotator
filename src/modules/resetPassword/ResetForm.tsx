/* eslint jsx-a11y/anchor-is-valid: 0 */
import React from 'react';
import { CardBody, Form, Button } from 'shards-react';
import Input from 'components/elements/Input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
// import { useRouter } from 'next/router';
import { loadingSelector, errorSelector, resetPassword } from './slice';
// import styles from './style.module.scss';

export const ResetForm = () => {
  const loading = useAppSelector(loadingSelector);
  const error = useAppSelector(errorSelector);
  const dispatch = useAppDispatch();
  // const router = useRouter();
  const resetForm = useFormik({
    initialValues: {
      new_password: '',
      confirm_password: '',
    },
    validationSchema: Yup.object().shape({
      new_password: Yup.string().required('New password is required.'),
      confirm_password: Yup.string().required('Confirm password is required.'),
    }),
    onSubmit: (values) => {
      const { new_password, confirm_password } = values;
      dispatch(resetPassword({ new_password, confirm_password, token }));
    },
  });
  const token = '123123132';
  // if (!token) {
  //   return <></>;
  // }

  console.log('token', token);

  const { values, handleChange, handleSubmit, errors } = resetForm;

  return (
    <CardBody>
      <h5 className="auth-form__title text-center mb-4">Reset Password</h5>
      <Form onSubmit={handleSubmit}>
        <Input
          value={values.new_password}
          onChange={handleChange}
          errorMessage={errors.new_password}
          name="new_password"
          label="New Password"
          type="password"
          placeholder="Enter new password"
        />
        <Input
          value={values.confirm_password}
          onChange={handleChange}
          errorMessage={errors.confirm_password}
          name="confirm_password"
          label="Confirm Password"
          type="password"
          placeholder="Confirm new password"
        />
        {error && <p className="error-text">{error}</p>}
        <Button
          block
          type="submit"
          disabled={loading}
          className="d-table mx-auto"
        >
          Create new password
        </Button>
      </Form>
    </CardBody>
  );
};
