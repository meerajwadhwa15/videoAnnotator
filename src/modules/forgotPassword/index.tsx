import React from 'react';
import Link from 'next/link';
import { Card, CardBody, Form, FormGroup, FormInput, Button } from 'shards-react';
import AuthLayout from 'components/layouts/AuthLayout';
// import styles from './style.module.scss';

const ForgotPassword = () => (
  <AuthLayout>
    <Card>
      <CardBody>
        {/* Title */}
        <h5 className="auth-form__title text-center mb-4">Reset Password</h5>

        {/* Form Fields */}
        <Form>
          <FormGroup>
            <label htmlFor="exampleInputEmail1">Email address</label>
            <FormInput
              type="email"
              id="exampleInputEmail1"
              placeholder="Enter email"
              autoComplete="email"
            />
            <small className="form-text text-muted text-center">
              You will receive an email with a unique token.
            </small>
          </FormGroup>
          <Button block className="d-table mx-auto" type="submit">
            Reset Password
          </Button>
        </Form>
      </CardBody>
    </Card>

    {/* Meta Details */}
    <div className="mt-4 text-center">
      <Link href="/login">
        <a className="mx-auto">Back to login page.</a>
      </Link>
    </div>
  </AuthLayout>
);

export default ForgotPassword;
