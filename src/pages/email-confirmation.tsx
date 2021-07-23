import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import EmailConfirmation from 'modules/emailConfirmation';
import { withNonAuthPage } from 'utils/hoc';

function EmailConfirmationPage() {
  const { t } = useTranslation(['home']);

  return (
    <React.Fragment>
      <Head>
        <title>{t('home:pageTitle')}</title>
      </Head>
      <EmailConfirmation />
    </React.Fragment>
  );
}

export const getServerSideProps = withNonAuthPage(async (context) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale || '', [
        'common',
        'email-confirmation',
      ])),
    },
  };
});

export default EmailConfirmationPage;
