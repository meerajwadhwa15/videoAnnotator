import React, { useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { useAppDispatch } from 'redux/hooks';
import { fetchVideosListSSR } from 'modules/client/home/slice';
import { requestServer } from 'utils/apiClient';
import { API_ENDPOINT } from 'utils/constants';
import Home from 'modules/client/home';

function Index({ videosList }) {
  const { t } = useTranslation(['client-home']);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchVideosListSSR(videosList));
  }, [videosList, dispatch]);

  return (
    <React.Fragment>
      <Head>
        <title>{t('client-home:home')}</title>
      </Head>
      <Home />
    </React.Fragment>
  );
}

export const getServerSideProps = async (context) => {
  const { locale } = context;

  const videosList = await requestServer.get({
    url: API_ENDPOINT.clientVideoList,
    context,
  });

  return {
    props: {
      ...(await serverSideTranslations(locale || '', [
        'common',
        'client-home',
      ])),
      videosList,
    },
  };
};

export default Index;
