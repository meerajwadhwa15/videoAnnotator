import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ForgotPassword from 'modules/admin/forgotPassword';
import { withNonAuthPage } from 'utils/hoc';

function Index() {
  const { t } = useTranslation(['forgot-password']);
  return (
    <React.Fragment>
      <Head>
        <title>{t('forgot-password:pageTitle')}</title>
      </Head>
      <ForgotPassword />
    </React.Fragment>
  );
}

export const getServerSideProps = withNonAuthPage(async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || '', [
        'common',
        'forgot-password',
      ])),
    },
  };
});

export default Index;
