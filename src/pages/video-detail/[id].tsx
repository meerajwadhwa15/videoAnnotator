import React, { useEffect } from 'react';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useAppDispatch } from 'redux/hooks';
import VideoDetail from 'modules/client/videoDetail';
import { requestServer } from 'utils/apiClient';
import { API_ENDPOINT } from 'utils/constants';
import { fetchVideoDetailSSR } from 'modules/client/videoDetail/slice';

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

export const getServerSideProps = async (context) => {
  const { params, locale } = context;
  const videoDetail = await requestServer.get({
    url: `${API_ENDPOINT.clientVideoList}/${params?.id}`,
    context,
  });

  return {
    props: {
      ...(await serverSideTranslations(locale || '')),
      videoDetail,
    },
  };
};

export default Index;
