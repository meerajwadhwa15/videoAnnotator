import React from 'react';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Profile from 'modules/profile';
import { withAuthPage } from 'utils/hoc';

function Index() {
  return (
    <React.Fragment>
      <Head>
        <title>Video Annotator - Profile</title>
      </Head>
      <Profile />
    </React.Fragment>
  );
}

export const getServerSideProps = withAuthPage(async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || '', ['common'])),
    },
  };
});

export default Index;
