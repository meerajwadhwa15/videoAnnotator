import React, { useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { useAppDispatch } from 'redux/hooks';
import Home from 'modules/client/home';
import { fetchServerSideProps } from 'modules/client/home/slice';
import { requestServer } from 'utils/apiClient';
import { API_ENDPOINT } from 'utils/constants';
import { fetchVideoList } from 'services';
import { withAuthConsumerPage } from 'utils/hoc/withAuthConsumerPage';

function Index({ videosList, categories }) {
  const { t } = useTranslation(['client-home']);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchServerSideProps({ videosList, categories }));
  }, [videosList, categories, dispatch]);

  return (
    <React.Fragment>
      <Head>
        <title>{t('client-home:home')}</title>
      </Head>
      <Home />
    </React.Fragment>
  );
}

export const getServerSideProps = withAuthConsumerPage(
  async (context, user) => {
    const { locale, query } = context;
    if (!user && query.playlist) {
      return {
        redirect: {
          destination: '/',
        },
      };
    }

    const videosList = await fetchVideoList({ context }, true);
    const categories = await requestServer.get({
      url: API_ENDPOINT.category,
      context,
    });

    return {
      props: {
        ...(await serverSideTranslations(locale || '')),
        videosList,
        categories,
      },
    };
  }
);

export default Index;
