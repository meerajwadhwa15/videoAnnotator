import React from 'react';
import Link from 'next/link';
import { Card, CardBody } from 'shards-react';
import { useTranslation } from 'next-i18next';
import AuthLayout from 'components/layouts/AuthLayout';
import ForgotPassForm from './ForgotPassForm';
import { ADMIN_ROUTING } from 'utils/constants';

const ForgotPassword = () => {
  const { t } = useTranslation(['forgot-password']);

  return (
    <AuthLayout>
      <Card>
        <CardBody>
          {/* Title */}
          <h5 className="auth-form__title text-center mb-4">
            {t('forgot-password:formTitle')}
          </h5>
          {/* Form Fields */}
          <ForgotPassForm />
        </CardBody>
      </Card>

      {/* Meta Details */}
      <div className="mt-4 text-center">
        <Link href={ADMIN_ROUTING.login}>
          <a className="mx-auto">{t('forgot-password:toLogin')}</a>
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
