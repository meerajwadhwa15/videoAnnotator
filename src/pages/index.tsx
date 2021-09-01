import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import Home from 'modules/client/home';
import { fetchServerSideProps } from 'modules/client/home/slice';
import { requestServer } from 'utils/apiClient';
import { API_ENDPOINT } from 'utils/constants';
import { fetchVideoList } from 'services';
import { withAuthConsumerPage } from 'utils/hoc/withAuthConsumerPage';

function Index() {
  const { t } = useTranslation(['client-home']);

  return (
    <>
      <Head>
        <title>{t('client-home:home')}</title>
        <meta name="description" content={t('client-home:description')} />
      </Head>
      <Home />
    </>
  );
}

export const getServerSideProps = withAuthConsumerPage(
  async (context, store, user) => {
    const { locale, query } = context;
    if (!user && query.playlist) {
      return {
        redirect: {
          destination: '/',
        },
      };
    }

    const videosList: any = await fetchVideoList({ context }, true);
    const categories: any = await requestServer.get({
      url: API_ENDPOINT.category,
      context,
    });

    store?.dispatch(fetchServerSideProps({ videosList, categories }));

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
