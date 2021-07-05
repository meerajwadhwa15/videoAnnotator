/* eslint jsx-a11y/anchor-is-valid: 0 */
import React, { useState } from 'react';
import { CardBody, Form, FormGroup, FormCheckbox, Button } from 'shards-react';
import Input from 'components/elements/Input';
import { useFormik } from 'formik';
import { LoginSchema } from 'validations/LoginSchema';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { loadingSelector, loginErrorSelector } from './slice';
import { dispatchLogin } from './actions';
// import styles from './style.module.scss';

export const LoginForm = () => {
  const [remember, setRemember] = useState<boolean>(false);
  const loading = useAppSelector(loadingSelector);
  const error = useAppSelector(loginErrorSelector);
  const dispatch = useAppDispatch();

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      const { email, password } = values;
      dispatch(dispatchLogin({ email, password, remember }));
    },
  });

  return (
    <CardBody>
      <h5 className="auth-form__title text-center mb-4">Login Form</h5>
      <Form onSubmit={loginForm.handleSubmit}>
        <Input
          value={loginForm.values.email}
          onChange={loginForm.handleChange}
          errorMessage={loginForm.errors.email}
          name="email"
          label="Email address"
          placeholder="Enter email"
          autoComplete="email"
        />
        <Input
          value={loginForm.values.password}
          onChange={loginForm.handleChange}
          errorMessage={loginForm.errors.password}
          name="password"
          label="Password"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
        />
        <FormGroup>
          <FormCheckbox
            checked={remember}
            onChange={() => setRemember(!remember)}
            id="formCheckBox"
          >
            Remember me
          </FormCheckbox>
        </FormGroup>
        {error && <p className="error-text">{error}</p>}
        <Button
          disabled={loading}
          block
          className="d-table mx-auto"
          type="submit"
        >
          Login
        </Button>
      </Form>
    </CardBody>
  );
};
