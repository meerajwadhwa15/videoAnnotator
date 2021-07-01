/* eslint jsx-a11y/anchor-is-valid: 0 */
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Card, CardBody, Form, FormGroup, FormInput, FormCheckbox, Button } from 'shards-react';
import AuthLayout from 'components/layouts/AuthLayout';
// import styles from './style.module.scss';

const Login = () => {
  const router = useRouter();
  return (
    <AuthLayout>
      <Card>
        <CardBody>
          {/* Title */}
          <h5 className="auth-form__title text-center mb-4">Login Form</h5>

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
            </FormGroup>
            <FormGroup>
              <label htmlFor="exampleInputPassword1">Password</label>
              <FormInput
                type="password"
                id="exampleInputPassword1"
                placeholder="Password"
                autoComplete="current-password"
              />
            </FormGroup>
            <FormGroup>
              <FormCheckbox id="formCheckBox">Remember me</FormCheckbox>
            </FormGroup>
            <Button
              block
              className="d-table mx-auto"
              type="button"
              onClick={() => router.push('/')}
            >
              Login
            </Button>
          </Form>
        </CardBody>
      </Card>
      <div className="mt-4 text-center">
        <Link href="/forgot-password"> Forgot your password?</Link>
        <span className="ml-2"></span>
        <Link href="/signup">Create a new account?</Link>
      </div>
    </AuthLayout>
  );
};

export default Login;
