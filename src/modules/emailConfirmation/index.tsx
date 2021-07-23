import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import AuthLayout from 'components/layouts/AuthLayout';
import { request } from 'utils/apiClient';
import { API_ENDPOINT } from 'utils/constants';

const ForgotPassword = () => {
  const router = useRouter();
  const { t } = useTranslation(['email-confirmation']);

  useEffect(() => {
    const { query } = router;

    if (!query?.token) {
      router.push('/login');
    } else {
      request.post(API_ENDPOINT.confirmEmail, { token: query.token });
    }
  }, []);

  return (
    <AuthLayout>
      <h5 className="auth-form__title text-center mb-4">
        {t('email-confirmation:successfullMessage')}
      </h5>

      {/* Meta Details */}
      <div className="mt-4 text-center">
        <Link href="/login">
          <a className="mx-auto">{t('email-confirmation:toLoginLink')}</a>
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
