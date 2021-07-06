import React from 'react';
import { Form, Button } from 'shards-react';
import { useFormik } from 'formik';
import Input from 'components/elements/Input';
import { ForgotPassSchema } from 'validations/ForgotPassSchema';

// import styles from './style.module.scss';

const ForgotPassForm = () => {
  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: ForgotPassSchema,
    onSubmit: (values) => {
      console.log('value', values);
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
      <Button block className="d-table mx-auto" type="submit">
        Reset Password
      </Button>
    </Form>
  );
};

export default ForgotPassForm;
