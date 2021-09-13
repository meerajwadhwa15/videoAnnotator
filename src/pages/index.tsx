import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';
import Home from 'modules/client/home';
import { fetchServerSideProps } from 'modules/client/home/slice';
import { requestServer } from 'utils/apiClient';
import { API_ENDPOINT } from 'utils/constants';
import { fetchVideoList } from 'services';
import { withAuthConsumerPage } from 'utils/hoc/withAuthConsumerPage';

function Index({ url }) {
  const { t } = useTranslation(['client-home']);

  return (
    <>
      <NextSeo
        title={t('client-home:home')}
        description={t('client-home:description')}
        canonical="https://www.canonical.ie/"
        openGraph={{
          title: t('client-home:home'),
          description: t('client-home:description'),
          url,
          site_name: 'homepage',
          images: [
            {
              url: '/images/logo.png',
              width: 400,
              height: 60,
              alt: 'Video Annotator logo',
            },
            { url: '/images/favicon.png' },
          ],
        }}
        robotsProps={{
          nosnippet: true,
          notranslate: true,
          noimageindex: true,
          noarchive: true,
          maxSnippet: -1,
          maxImagePreview: 'none',
          maxVideoPreview: -1,
        }}
      />
      <Home />
    </>
  );
}

export const getServerSideProps = withAuthConsumerPage(
  async (context, store, user) => {
    const { req, locale, query } = context;

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
    const protocol = req?.headers?.referer?.split('://')[0];
    const url = `${protocol}://${req.headers.host}${req.url}`;

    store?.dispatch(fetchServerSideProps({ videosList, categories }));

    return {
      props: {
        ...(await serverSideTranslations(locale || '')),
        videosList,
        categories,
        url,
      },
    };
  }
);

export default Index;
