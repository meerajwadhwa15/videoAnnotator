import React, { useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Home from 'modules/home';
import { withAuthPage } from 'utils/hoc';
import { UserRole } from 'models';
import { requestServer } from 'utils/apiClient';
import { API_ENDPOINT } from 'utils/constants';
import { useAppDispatch } from 'redux/hooks';
import { fetchUsersListSSR } from 'redux/globalSlice';
import { fetchVideosListSSR } from 'modules/home/slice';

function Index({ usersList, videosList }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsersListSSR(usersList));
    dispatch(fetchVideosListSSR(videosList));
  }, [usersList, videosList, dispatch]);

  return (
    <React.Fragment>
      <Head>
        <title>Video Annotator - Dashboard</title>
      </Head>
      <Home />
    </React.Fragment>
  );
}

export const getServerSideProps = withAuthPage(async (context, user) => {
  let usersList: any = null;
  const { locale } = context;
  if (Array.isArray(user['roles']) && user['roles'].includes(UserRole.admin)) {
    usersList = await requestServer.get({
      url: API_ENDPOINT.usersList,
      context,
    });
  }

  const videosList = await requestServer.get({
    url: API_ENDPOINT.videosList,
    context,
  });
  return {
    props: {
      ...(await serverSideTranslations(locale || '', ['common', 'about'])),
      usersList,
      videosList,
    },
  };
});

export default Index;
