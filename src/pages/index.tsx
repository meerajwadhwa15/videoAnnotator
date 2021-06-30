import { NextPageContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Home from '../modules/home';

function HomePage() {
  const { t } = useTranslation(['common', 'about']);

  return (
    <main>
      <h1 data-testid="helloworld">Hello World!</h1>
      <h2 data-testid="greeting">{t('common:greeting')}</h2>
      <h3>{t('about:welcome')}</h3>
      <Home />
    </main>
  );
}

export const getServerSideProps = async ({ locale }: NextPageContext) => ({
  props: {
    ...(await serverSideTranslations(locale || '', ['common', 'about'])),
  },
});

export default HomePage;
