import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Login from 'modules/admin/login';
import { withNonAuthPage } from 'utils/hoc';

function Index() {
  const { t } = useTranslation(['login']);
  return (
    <React.Fragment>
      <Head>
        <title>{t('login:pageTitle')}</title>
      </Head>
      <Login />
    </React.Fragment>
  );
}

export const getServerSideProps = withNonAuthPage(async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || '', ['common', 'login'])),
    },
  };
});

export default Index;
