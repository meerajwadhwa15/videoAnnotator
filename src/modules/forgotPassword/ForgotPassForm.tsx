import React from 'react';
import { Form, Button } from 'shards-react';
import { useFormik } from 'formik';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import Input from 'components/elements/Input';
import { ForgotPassSchema } from 'validations/ForgotPassSchema';
import Alert, { AlertType } from 'components/elements/Alert';
import {
  alertSelector,
  dispatchForgotPassword,
  errorSelector,
  loadingSelector,
  toggleAlert,
} from './slice';

// import styles from './style.module.scss';

const ForgotPassForm = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(loadingSelector);
  const error = useAppSelector(errorSelector);
  const showAlert = useAppSelector(alertSelector);

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: ForgotPassSchema,
    onSubmit: (values) => {
      dispatch(dispatchForgotPassword(values));
    },
  });

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
      {error && <p className="error-text">{error}</p>}
      <Button
        disabled={loading}
        block
        className="d-table mx-auto"
        type="submit"
      >
        Reset Password
      </Button>
      <Alert
        type={AlertType.success}
        visible={showAlert}
        dismiss={() => dispatch(toggleAlert())}
      >
        request success, please check your email to reset your password
      </Alert>
    </Form>
  );
};

export default ForgotPassForm;
