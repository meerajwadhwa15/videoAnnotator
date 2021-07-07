/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from 'react';
import { useFormik } from 'formik';
import Input from 'components/elements/Input';
import { Form, FormGroup, FormCheckbox, Button } from 'shards-react';
import { SignupSchema } from 'validations/SignupSchema';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  alertSelector,
  dispatchSignup,
  loadingSelector,
  signupErrorSelector,
  toggleAlert,
} from './slice';
import Alert, { AlertType } from 'components/elements/Alert';

const SignupForm = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(loadingSelector);
  const error = useAppSelector(signupErrorSelector);
  const showAlert = useAppSelector(alertSelector);

  const signUpForm = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      password: '',
      matchingPassword: '',
      policyChecked: false,
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      dispatch(dispatchSignup(values));
    },
  });

  const { values, handleChange, handleSubmit, errors, setFieldValue } =
    signUpForm;

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        name="email"
        value={values.email}
        onChange={handleChange}
        errorMessage={errors.email}
        label="Email Address"
        placeholder="Enter email"
      />
      <Input
        label="User Name"
        value={values.fullname}
        errorMessage={errors.fullname}
        onChange={handleChange}
        name="fullname"
        placeholder="Enter user name"
      />
      <Input
        value={values.password}
        errorMessage={errors.password}
        onChange={handleChange}
        name="password"
        label="Password"
        type="password"
        placeholder="Enter password"
      />
      <Input
        value={values.matchingPassword}
        errorMessage={errors.matchingPassword}
        onChange={handleChange}
        name="matchingPassword"
        label="Repeat Password"
        type="password"
        placeholder="Confirm password"
      />
      <FormGroup>
        <FormCheckbox
          required
          checked={values.policyChecked}
          onChange={() => setFieldValue('policyChecked', !values.policyChecked)}
        >
          I agree with the <a href="#">Terms & Conditions</a>.
        </FormCheckbox>
      </FormGroup>
      {error && <p className="error-text">{error}</p>}
      <Button
        block
        type="submit"
        disabled={loading}
        className="d-table mx-auto"
      >
        Create Account
      </Button>
      <Alert
        type={AlertType.success}
        visible={showAlert}
        dismiss={() => dispatch(toggleAlert())}
      >
        Create new account successful
      </Alert>
    </Form>
  );
};

export default SignupForm;
