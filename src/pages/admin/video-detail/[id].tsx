import React from 'react';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import VideoDetail from 'modules/admin/videoDetail';
import { withAuthAdminPage } from 'utils/hoc';
import { requestServer } from 'utils/apiClient';
import { API_ENDPOINT } from 'utils/constants';
import { fetchVideoDetailSSR } from 'modules/admin/videoDetail/slice';

function Index({ videoDetail }) {
  return (
    <React.Fragment>
      <Head>
        <title>Video Annotator - {videoDetail.name}</title>
      </Head>
      <VideoDetail />
    </React.Fragment>
  );
}

export const getServerSideProps = withAuthAdminPage(
  async (context, user, store) => {
    const { params, locale } = context;
    const videoDetail: any = await requestServer.get({
      url: `${API_ENDPOINT.video}/${params?.id}`,
      context,
    });
    store?.dispatch(fetchVideoDetailSSR(videoDetail));
    return {
      props: {
        ...(await serverSideTranslations(locale || '')),
        videoDetail,
      },
    };
  }
);

export default Index;
