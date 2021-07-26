/* eslint jsx-a11y/anchor-is-valid: 0 */
import React from 'react';
import Link from 'next/link';
import { Card } from 'shards-react';
import { useTranslation } from 'next-i18next';
import AuthLayout from 'components/layouts/AuthLayout';
import { LoginForm } from './LoginForm';
import { ADMIN_ROUTING } from 'utils/constants';

const Login = () => {
  const { t } = useTranslation(['login']);
  return (
    <AuthLayout>
      <Card>
        <LoginForm />
      </Card>
      <div className="mt-4 text-center">
        <Link href={ADMIN_ROUTING.forgotPassword}>
          {t('login:toForgotPassword')}
        </Link>
        <span className="ml-2"></span>
        <Link href={ADMIN_ROUTING.signup}>{t('login:toSignup')}</Link>
      </div>
    </AuthLayout>
  );
};

export default Login;
