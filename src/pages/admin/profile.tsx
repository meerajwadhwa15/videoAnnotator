import React from 'react';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Profile from 'modules/admin/profile';
import { withAuthPage } from 'utils/hoc';

function Index() {
  const { t } = useTranslation(['profile']);

  return (
    <React.Fragment>
      <Head>
        <title>{t('profile:pageTitle')}</title>
      </Head>
      <Profile />
    </React.Fragment>
  );
}

export const getServerSideProps = withAuthPage(async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || '', ['common', 'profile'])),
    },
  };
});

export default Index;
