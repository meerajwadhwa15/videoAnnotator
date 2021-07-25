import React from 'react';
import Head from 'next/head';
import ResetPassword from 'modules/admin/resetPassword';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { requestServer } from 'utils/apiClient';

function Index({ isTokenValid }) {
  const { t } = useTranslation(['reset-password']);
  return (
    <React.Fragment>
      <Head>
        <title>
          {isTokenValid
            ? t('reset-password:pageTitle')
            : t('reset-password:pageTitleFailed')}
        </title>
      </Head>
      <ResetPassword isTokenValid={!!isTokenValid} />
    </React.Fragment>
  );
}

export const getServerSideProps = async (context) => {
  const {
    query: { token },
    locale,
  } = context;
  const result = {
    props: {
      ...(await serverSideTranslations(locale || '', [
        'common',
        'reset-password',
      ])),
      isTokenValid: true,
    },
  };
  try {
    await requestServer.post({
      url: 'user/verifyToken',
      params: { token },
      context,
    });
  } catch {
    result.props.isTokenValid = false;
  } finally {
    return result;
  }
};

export default Index;
