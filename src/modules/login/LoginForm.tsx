/* eslint jsx-a11y/anchor-is-valid: 0 */
import React from 'react';
import { CardBody, Form, FormGroup, FormCheckbox, Button } from 'shards-react';
import Input from 'components/elements/Input';
import { useFormik } from 'formik';
import { LoginSchema } from 'validations/LoginSchema';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { loadingSelector, loginErrorSelector, dispatchLogin } from './slice';
// import styles from './style.module.scss';

export const LoginForm = () => {
  const loading = useAppSelector(loadingSelector);
  const error = useAppSelector(loginErrorSelector);
  const dispatch = useAppDispatch();

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      const { email, password, remember } = values;
      dispatch(dispatchLogin({ email, password, remember }));
    },
  });

  const { values, handleChange, handleSubmit, errors, setFieldValue } =
    loginForm;

  return (
    <CardBody>
      <h5 className="auth-form__title text-center mb-4">Login Form</h5>
      <Form onSubmit={handleSubmit}>
        <Input
          value={values.email}
          onChange={handleChange}
          errorMessage={errors.email}
          name="email"
          label="Email address"
          placeholder="Enter email"
          autoComplete="email"
        />
        <Input
          value={values.password}
          onChange={handleChange}
          errorMessage={errors.password}
          name="password"
          label="Password"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
        />
        <FormGroup>
          <FormCheckbox
            id="remember_me"
            name="remember"
            checked={values.remember}
            onChange={() => setFieldValue('remember', !values.remember)}
          >
            Remember me
          </FormCheckbox>
        </FormGroup>
        {error && <p className="error-text">{error}</p>}
        <Button
          block
          type="submit"
          disabled={loading}
          className="d-table mx-auto"
        >
          Login
        </Button>
      </Form>
    </CardBody>
  );
};
