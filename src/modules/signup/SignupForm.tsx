/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from 'react';
import { useFormik } from 'formik';
import Input from 'components/elements/Input';
import { Form, FormGroup, FormCheckbox, Button } from 'shards-react';
import { SignupSchema } from 'validations/SignupSchema';

const SignupForm = () => {
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
      console.log('values', values);
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
        placeholder="Password"
      />
      <Input
        value={values.matchingPassword}
        errorMessage={errors.matchingPassword}
        onChange={handleChange}
        name="matchingPassword"
        label="Repeat Password"
        type="password"
        placeholder="Password"
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
      <Button block className="d-table mx-auto" type="submit">
        Create Account
      </Button>
    </Form>
  );
};

export default SignupForm;
