import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';

import EmailConfirmation from 'modules/emailConfirmation';
import { requestServer } from 'utils/apiClient';
import { API_ENDPOINT } from 'utils/constants';

function EmailConfirmationPage({ isTokenValid }) {
  const { t } = useTranslation(['email-confirmation']);

  return (
    <React.Fragment>
      <Head>
        <title>{t('email-confirmation:pageTitle')}</title>
      </Head>
      <EmailConfirmation isTokenValid={isTokenValid} />
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
        'email-confirmation',
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

    await requestServer.post({
      url: API_ENDPOINT.confirmEmail,
      data: { token },
      context,
    });
  } catch {
    result.props.isTokenValid = false;
  } finally {
    return result;
  }
};

export default EmailConfirmationPage;
