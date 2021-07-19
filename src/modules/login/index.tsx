/* eslint jsx-a11y/anchor-is-valid: 0 */
import React from 'react';
import Link from 'next/link';
import { Card } from 'shards-react';
import { useTranslation } from 'next-i18next';
import AuthLayout from 'components/layouts/AuthLayout';
import { LoginForm } from './LoginForm';

const Login = () => {
  const { t } = useTranslation(['login']);
  return (
    <AuthLayout>
      <Card>
        <LoginForm />
      </Card>
      <div className="mt-4 text-center">
        <Link href="/forgot-password">{t('login:toForgotPassword')}</Link>
        <span className="ml-2"></span>
        <Link href="/signup">{t('login:toSignup')}</Link>
      </div>
    </AuthLayout>
  );
};

export default Login;
