import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Home from 'modules/home';

function Index() {
  return (
    <React.Fragment>
      <Head>
        <title>Video Annotator - Dashboard</title>
      </Head>
      <Home />
    </React.Fragment>
  );
}

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'about'])),
    },
  };
};

export default Index;
