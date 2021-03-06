import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import Home from 'modules/admin/home';
import { UserRole } from 'models';
import { fetchUsersListSSR } from 'redux/globalSlice';
import { fetchServerSideProps } from 'modules/admin/home/slice';
import { withAuthAdminPage } from 'utils/hoc';
import { requestServer } from 'utils/apiClient';
import { API_ENDPOINT } from 'utils/constants';
import { fetchVideoList } from 'services';

function Index() {
  const { t } = useTranslation(['home']);

  return (
    <React.Fragment>
      <Head>
        <title>{t('home:pageTitle')}</title>
      </Head>
      <Home />
    </React.Fragment>
  );
}

export const getServerSideProps = withAuthAdminPage(
  async (context, user, store) => {
    let usersList: any = [];
    let categories: any = [];
    const { locale } = context;
    if (
      Array.isArray(user['roles']) &&
      user['roles'].includes(UserRole.admin)
    ) {
      [usersList, categories] = await Promise.all([
        requestServer.get({
          url: API_ENDPOINT.usersList,
          context,
        }),
        requestServer.get({
          url: API_ENDPOINT.category,
          context,
        }),
      ]);
    }

    const result: any = await fetchVideoList({ context });
    store?.dispatch(fetchUsersListSSR(usersList));
    store?.dispatch(fetchServerSideProps({ videosList: result, categories }));

    return {
      props: {
        ...(await serverSideTranslations(locale || '', ['common', 'home'])),
      },
    };
  }
);

export default Index;
