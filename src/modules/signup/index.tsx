/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from 'react';
import { Card, CardBody, Form, FormGroup, FormInput, FormCheckbox, Button } from 'shards-react';
import Link from 'next/link';
import AuthLayout from 'components/layouts/AuthLayout';
// import styles from './style.module.scss';

const Signup = () => (
  <AuthLayout>
    <Card>
      <CardBody>
        {/* Title */}
        <h5 className="auth-form__title text-center mb-4">Create New Account</h5>

        {/* Form Fields */}
        <Form>
          <FormGroup>
            <label htmlFor="exampleInputEmail1">Email Address</label>
            <FormInput
              type="email"
              id="exampleInputEmail1"
              placeholder="Enter email"
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="exampleInputUsername">User Name</label>
            <FormInput
              type="text"
              id="exampleInputUsername"
              placeholder="Enter user name"
              autoComplete="email"
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="exampleInputPassword1">Password</label>
            <FormInput
              type="password"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="exampleInputPassword2">Repeat Password</label>
            <FormInput
              type="password"
              id="exampleInputPassword2"
              placeholder="Confirm Password"
            />
          </FormGroup>
          <FormGroup>
            <FormCheckbox id="checkbox">
              I agree with the <a href="#">Terms & Conditions</a>.
            </FormCheckbox>
          </FormGroup>
          <Button block className="d-table mx-auto" type="submit">
            Create Account
          </Button>
        </Form>
      </CardBody>
    </Card>

    {/* Meta Details */}
    <div className="mt-4 text-center">
      <Link href="/forgot-password">Forgot your password?</Link>
      <Link href="/login">
        <a className="ml-2">Sign In?</a>
      </Link>
    </div>
  </AuthLayout>
);

export default Signup;
