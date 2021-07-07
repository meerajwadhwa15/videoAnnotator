import React from 'react';
import { NextPageContext } from 'next';
// import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Home from 'modules/home';

function Index() {
  // const { t } = useTranslation(['common', 'about']);

  return (
    <React.Fragment>
      <Head>
        <title>Video Annotator - Dashboard</title>
      </Head>
      <Home />
    </React.Fragment>
  );
}

export const getServerSideProps = async ({ locale }: NextPageContext) => ({
  props: {
    ...(await serverSideTranslations(locale || '', ['common', 'about'])),
  },
});

export default Index;
