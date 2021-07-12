/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { Form, FormGroup, FormCheckbox, Button } from 'shards-react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { SignupSchema } from 'validations/SignupSchema';
import Input from 'components/elements/Input';
import {
  dispatchSignup,
  loadingSelector,
  messageSelector,
  clearMessage,
} from './slice';

const SignupForm = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(loadingSelector);
  const message = useAppSelector(messageSelector);

  const signUpForm = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      matchingPassword: '',
      policyChecked: false,
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      if (values.policyChecked) {
        dispatch(dispatchSignup(values));
      } else {
        toast.info('You must agree Terms & Conditions.');
      }
    },
  });

  const { values, handleChange, handleSubmit, errors, setFieldValue } =
    signUpForm;

  useEffect(() => {
    if (message.type === 'success') {
      signUpForm.resetForm();
      toast.success('🚀 Signup successfully!');
    }

    if (message.type === 'error') {
      toast.error('🚀 Signup error!');
    }

    return () => {
      dispatch(clearMessage());
    };
  }, [message, dispatch, signUpForm]);

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
        value={values.fullName}
        errorMessage={errors.fullName}
        onChange={handleChange}
        name="fullName"
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
          id="checkbox"
          required
          checked={values.policyChecked}
          onChange={() => setFieldValue('policyChecked', !values.policyChecked)}
        >
          I agree with the <a href="#">Terms & Conditions</a>.
        </FormCheckbox>
      </FormGroup>
      <Button
        block
        type="submit"
        disabled={loading}
        className="d-table mx-auto"
      >
        {loading ? 'Checking...' : 'Create Account'}
      </Button>
    </Form>
  );
};

export default SignupForm;
