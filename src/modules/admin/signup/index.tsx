/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from 'react';
import { Card, CardBody } from 'shards-react';
import Link from 'next/link';
import AuthLayout from 'components/layouts/AuthLayout';
import SignupForm from './SignupForm';
import { useTranslation } from 'next-i18next';
import { ADMIN_ROUTING } from 'utils/constants';

const Signup = () => {
  const { t } = useTranslation(['signup']);
  return (
    <AuthLayout>
      <Card>
        <CardBody>
          <h5 className="auth-form__title text-center mb-4">
            {t('signup:signupFormTitle')}
          </h5>
          <SignupForm />
        </CardBody>
      </Card>

      {/* Meta Details */}
      <div className="mt-4 text-center">
        <Link href={ADMIN_ROUTING.forgotPassword}>
          {t('signup:forgotPasswordLink')}
        </Link>
        <Link href={ADMIN_ROUTING.login}>
          <a className="ml-2">{t('signup:toSigninLink')}</a>
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Signup;
