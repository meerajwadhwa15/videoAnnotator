/* eslint jsx-a11y/anchor-is-valid: 0 */
import React from 'react';
import Link from 'next/link';
import { Card } from 'shards-react';
import AuthLayout from 'components/layouts/AuthLayout';
import { ResetForm } from './ResetForm';
// import { useTranslation } from 'next-i18next';
// import styles from './style.module.scss';

const ResetPassword = () => {
  // const { t } = useTranslation(['login']);
  return (
    <AuthLayout>
      <Card>
        <ResetForm />
      </Card>
      <div className="mt-4 text-center">
        <Link href="/login">
          <a className="mx-auto">Back to login page.</a>
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
