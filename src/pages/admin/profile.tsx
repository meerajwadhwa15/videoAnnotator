import React from 'react';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Profile from 'modules/admin/profile';
import { withAuthAdminPage } from 'utils/hoc';

function Index() {
  const { t } = useTranslation(['profile']);

  return (
    <>
      <Head>
        <title>{t('profile:pageTitle')}</title>
      </Head>
      <Profile />
    </>
  );
}

export const getServerSideProps = withAuthAdminPage(async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || '')),
    },
  };
});

export default Index;
