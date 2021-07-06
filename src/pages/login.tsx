import Login from 'modules/login';
import { NextPageContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

function Index() {
  const { t } = useTranslation(['login']);
  return (
    <>
      <Head>
        <title>{t('login:pageTitle')}</title>
      </Head>
      <Login />
    </>
  );
}

export const getStaticProps = async ({ locale }: NextPageContext) => ({
  props: {
    ...(await serverSideTranslations(locale || '', ['common', 'login'])),
  },
});

export default Index;
