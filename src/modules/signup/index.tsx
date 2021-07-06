/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from 'react';
import { Card, CardBody } from 'shards-react';
import Link from 'next/link';
import AuthLayout from 'components/layouts/AuthLayout';
import SignupForm from './SignupForm';
// import styles from './style.module.scss';

const Signup = () => {
  return (
    <AuthLayout>
      <Card>
        <CardBody>
          <h5 className="auth-form__title text-center mb-4">
            Create New Account
          </h5>
          <SignupForm />
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
};

export default Signup;
