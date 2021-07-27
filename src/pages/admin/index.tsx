import React, { useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import Home from 'modules/admin/home';
import { UserRole } from 'models';
import { useAppDispatch } from 'redux/hooks';
import { fetchUsersListSSR } from 'redux/globalSlice';
import { fetchServerSideProps } from 'modules/admin/home/slice';
import { withAuthPage } from 'utils/hoc';
import { requestServer } from 'utils/apiClient';
import { API_ENDPOINT } from 'utils/constants';

function Index({ usersList, videosList, categories }) {
  const { t } = useTranslation(['home']);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsersListSSR(usersList));
    dispatch(fetchServerSideProps({ videosList, categories }));
  }, [usersList, videosList, dispatch, categories]);

  return (
    <React.Fragment>
      <Head>
        <title>{t('home:pageTitle')}</title>
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
  const [videosList, categories] = await Promise.all([
    requestServer.get({
      url: API_ENDPOINT.video,
      context,
    }),
    requestServer.get({
      url: API_ENDPOINT.category,
      context,
    }),
  ]);
  return {
    props: {
      ...(await serverSideTranslations(locale || '', ['common', 'home'])),
      usersList,
      videosList,
      categories,
    },
  };
});

export default Index;