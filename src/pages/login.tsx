import React from 'react';
import Login from 'modules/login';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

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

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || '', ['common', 'login'])),
  },
});

export default Index;
