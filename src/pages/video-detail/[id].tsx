import React from 'react';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import VideoDetail from 'modules/videoDetail';
import { withAuthPage } from 'utils/hoc';

function Index() {
  return (
    <React.Fragment>
      <Head>
        <title>Video Annotator - Video Detail</title>
      </Head>
      <VideoDetail />
    </React.Fragment>
  );
}

export const getServerSideProps = withAuthPage(async (props) => {
  return {
    props: {
      ...(await serverSideTranslations(props.locale || '', ['common'])),
    },
  };
});

export default Index;
