/* eslint jsx-a11y/anchor-is-valid: 0 */
import { FC } from 'react';
import Link from 'next/link';
import { Card, CardBody } from 'shards-react';
import AuthLayout from 'components/layouts/AuthLayout';
import { ResetForm } from './ResetForm';
import { useTranslation } from 'next-i18next';

const ResetPassword: FC<{ isTokenValid: boolean }> = ({ isTokenValid }) => {
  const { t } = useTranslation(['reset-password']);

  const renderContent = () => {
    if (isTokenValid) {
      return (
        <Card>
          <ResetForm />
        </Card>
      );
    }
    return (
      <Card>
        <CardBody>
          <h4>{t('reset-password:failToVerifyTokenTitle')}</h4>
          <p>{t('reset-password:failToVerifyTokenDescription')}</p>
        </CardBody>
      </Card>
    );
  };

  return (
    <AuthLayout>
      {renderContent()}
      <div className="mt-4 text-center">
        <Link href="/login">
          <a className="mx-auto">{t('toLoginLink')}</a>
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
