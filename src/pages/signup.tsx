import React from 'react';
import Head from 'next/head';
import Signup from 'modules/signup';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

function Index() {
  const { t } = useTranslation(['signup']);
  return (
    <React.Fragment>
      <Head>
        <title>{t('signup:pageTitle')}</title>
      </Head>
      <Signup />
    </React.Fragment>
  );
}

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || '', ['common', 'signup'])),
    },
  };
};

export default Index;
