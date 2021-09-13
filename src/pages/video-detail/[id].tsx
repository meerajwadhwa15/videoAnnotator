import React from 'react';
import { NextSeo } from 'next-seo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import VideoDetail from 'modules/client/videoDetail';
import { requestServer } from 'utils/apiClient';
import { API_ENDPOINT } from 'utils/constants';
import { fetchVideoDetailSSR } from 'modules/client/videoDetail/slice';
import { withAuthConsumerPage } from 'utils/hoc/withAuthConsumerPage';
import { useTranslation } from 'react-i18next';

function Index({ videoDetail, url }) {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <NextSeo
        title={`Video Annotator - ${videoDetail.name}`}
        description={`${videoDetail.description} - ${t(
          'client-home:description'
        )}`}
        canonical="https://www.canonical.ie/"
        openGraph={{
          title: t(`Video Annotator - ${videoDetail.name}`),
          description: `${videoDetail.description} - ${t(
            'client-home:description'
          )}`,
          url,
          site_name: 'videoDetail',
          images: [
            {
              url: videoDetail.thumbnail || '',
              width: 300,
              height: 300,
              alt: 'Video Detail thumbnail',
            },
          ],
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
      <VideoDetail />
    </React.Fragment>
  );
}

export const getServerSideProps = withAuthConsumerPage(
  async (context, store) => {
    try {
      const { req, params, locale } = context;
      const videoDetail: any = await requestServer.get({
        url: `${API_ENDPOINT.clientVideoList}/${params?.id}`,
        context,
      });
      const protocol = req?.headers?.referer?.split('://')[0];
      const url = `${protocol}://${req.headers.host}${req.url}`;

      store?.dispatch(fetchVideoDetailSSR(videoDetail));

      return {
        props: {
          ...(await serverSideTranslations(locale || '')),
          videoDetail,
          url,
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
