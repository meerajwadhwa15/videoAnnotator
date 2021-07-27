import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import Home from 'modules/client/home';
import { ADMIN_ROUTING } from 'utils/constants';

function Index() {
  const { t } = useTranslation(['client-home']);

  return (
    <React.Fragment>
      <Head>
        <title>{t('client-home:home')}</title>
      </Head>
      <Home />
    </React.Fragment>
  );
}

export const getServerSideProps = async (context) => {
  const { locale } = context;

  return {
    redirect: {
      destination: ADMIN_ROUTING.home,
    },
    props: {
      ...(await serverSideTranslations(locale || '', [
        'common',
        'client-home',
      ])),
    },
  };
};

export default Index;
