import React, { useEffect } from 'react';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import VideoDetail from 'modules/videoDetail';
import { withAuthPage } from 'utils/hoc';
import { requestServer } from 'utils/apiClient';
import { API_ENDPOINT } from 'utils/constants';
import { useAppDispatch } from 'redux/hooks';
import { fetchVideoDetailSSR } from 'modules/videoDetail/slice';

function Index({ videoDetail }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchVideoDetailSSR(videoDetail));
  }, [dispatch, videoDetail]);

  return (
    <React.Fragment>
      <Head>
        <title>Video Annotator - {videoDetail.name}</title>
      </Head>
      <VideoDetail />
    </React.Fragment>
  );
}

export const getServerSideProps = withAuthPage(async (context) => {
  const { params, locale } = context;
  const videoDetail = await requestServer.get({
    url: `${API_ENDPOINT.video}/${params?.id}`,
    context,
  });
  return {
    props: {
      ...(await serverSideTranslations(locale || '', ['common'])),
      videoDetail,
    },
  };
});

export default Index;
