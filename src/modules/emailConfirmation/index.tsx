import { FC } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import AuthLayout from 'components/layouts/AuthLayout';
import { ADMIN_ROUTING } from 'utils/constants';

const ForgotPassword: FC<{ isTokenValid: boolean }> = ({ isTokenValid }) => {
  const { t } = useTranslation(['email-confirmation']);

  return (
    <AuthLayout>
      <h5 className="auth-form__title text-center mb-4">
        {isTokenValid
          ? t('email-confirmation:successfullMessage')
          : t('email-confirmation:failedMessage')}
      </h5>

      {/* Meta Details */}
      <div className="mt-4 text-center">
        <Link href={ADMIN_ROUTING.login}>
          <a className="mx-auto">{t('email-confirmation:toLoginLink')}</a>
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
