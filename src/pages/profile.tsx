import React from 'react';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Profile } from 'modules/admin/profile/Profile';
import { withAuthConsumerPage } from 'utils/hoc';
import ClientLayout from 'components/layouts/ClientLayout';

function Index() {
  const { t } = useTranslation(['profile']);

  return (
    <ClientLayout>
      <Head>
        <title>{t('profile:pageTitle')}</title>
      </Head>
      <div className="my-4 mx-auto" style={{ paddingLeft: '24%' }}>
        <Profile />
      </div>
    </ClientLayout>
  );
}

export const getServerSideProps = withAuthConsumerPage(
  async ({ locale }, user) => {
    if (!user) {
      return {
        redirect: {
          destination: '/',
        },
      };
    }
    return {
      props: {
        ...(await serverSideTranslations(locale || '')),
      },
    };
  }
);

export default Index;
