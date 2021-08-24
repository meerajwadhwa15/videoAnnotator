import React, { useEffect } from 'react';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useAppDispatch } from 'redux/hooks';
import VideoDetail from 'modules/client/videoDetail';
import { requestServer } from 'utils/apiClient';
import { API_ENDPOINT } from 'utils/constants';
import { fetchVideoDetailSSR } from 'modules/client/videoDetail/slice';
import { withAuthConsumerPage } from 'utils/hoc/withAuthConsumerPage';

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

export const getServerSideProps = withAuthConsumerPage(async (context) => {
  const { params, locale } = context;
  const videoDetail: any = await requestServer.get({
    url: `${API_ENDPOINT.clientVideoList}/${params?.id}`,
    context,
  });

  if (
    videoDetail &&
    Array.isArray(videoDetail.userComment?.commentList) &&
    videoDetail.userComment?.commentList.length > 0
  ) {
    videoDetail.userComment.commentList.sort((a, b) => {
      return b.id - a.id;
    });
  }

  return {
    props: {
      ...(await serverSideTranslations(locale || '')),
      videoDetail,
    },
  };
});

export default Index;