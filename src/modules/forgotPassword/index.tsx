import React from 'react';
import Link from 'next/link';
import { Card, CardBody } from 'shards-react';
import AuthLayout from 'components/layouts/AuthLayout';
import ForgotPassForm from './ForgotPassForm';
// import styles from './style.module.scss';

const ForgotPassword = () => (
  <AuthLayout>
    <Card>
      <CardBody>
        {/* Title */}
        <h5 className="auth-form__title text-center mb-4">Reset Password</h5>
        {/* Form Fields */}
        <ForgotPassForm />
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
