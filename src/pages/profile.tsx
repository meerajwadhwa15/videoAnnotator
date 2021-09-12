import React from 'react';
import { NextSeo } from 'next-seo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Profile } from 'modules/admin/profile/Profile';
import { withAuthConsumerPage } from 'utils/hoc';
import ClientLayout from 'components/layouts/ClientLayout';

function Index({ url }) {
  const { t } = useTranslation(['profile']);

  return (
    <ClientLayout>
      <NextSeo
        title={t('profile:pageTitle')}
        description={t('profile:description')}
        canonical="https://www.canonical.ie/"
        openGraph={{
          url,
          title: t('profile:pageTitle'),
          description: t('profile:description'),
          site_name: 'profile',
        }}
        robotsProps={{
          nosnippet: true,
          notranslate: true,
          noimageindex: true,
          noarchive: true,
          maxSnippet: -1,
          maxImagePreview: 'none',
          maxVideoPreview: -1,
        }}
      />
      <div className="my-4 mx-auto" style={{ paddingLeft: '24%' }}>
        <Profile />
      </div>
    </ClientLayout>
  );
}

export const getServerSideProps = withAuthConsumerPage(
  async ({ locale, req }, store, user) => {
    if (!user) {
      return {
        redirect: {
          destination: '/',
        },
      };
    }

    const protocol = req?.headers?.referer?.split('://')[0];
    const url = `${protocol}://${req.headers.host}${req.url}`;

    return {
      props: {
        ...(await serverSideTranslations(locale || '')),
        url,
      },
    };
  }
);

export default Index;
