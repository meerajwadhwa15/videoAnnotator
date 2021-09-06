import React from 'react';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import VideoDetail from 'modules/client/videoDetail';
import { requestServer } from 'utils/apiClient';
import { API_ENDPOINT } from 'utils/constants';
import { fetchVideoDetailSSR } from 'modules/client/videoDetail/slice';
import { withAuthConsumerPage } from 'utils/hoc/withAuthConsumerPage';
import { useTranslation } from 'react-i18next';

function Index({ videoDetail }) {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Head>
        <title>Video Annotator - {videoDetail.name}</title>
        <meta
          name="description"
          content={`${videoDetail.description} - ${t(
            'client-home:description'
          )}`}
        />
      </Head>
      <VideoDetail />
    </React.Fragment>
  );
}

export const getServerSideProps = withAuthConsumerPage(
  async (context, store) => {
    try {
      const { params, locale } = context;

      const videoDetail: any = await requestServer.get({
        url: `${API_ENDPOINT.clientVideoList}/${params?.id}`,
        context,
      });
      store?.dispatch(fetchVideoDetailSSR(videoDetail));

      return {
        props: {
          ...(await serverSideTranslations(locale || '')),
          videoDetail,
        },
      };
    } catch {
      return {
        redirect: {
          destination: '/',
        },
      };
    }
  }
);

export default Index;
