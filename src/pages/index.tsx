import Test from '../features/test';
import { NextPageContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import style from "styles/home.module.scss";

function HomePage() {
  const { t } = useTranslation(["common", "about"]);

  return (
    <main className={style.container}>
      <h1>Hello World!</h1>
      <h2>{t("common:greeting")}</h2>
      <h3>{t("about:welcome")}</h3>
      <Test />
    </main>
  );
}

export const getServerSideProps = async ({ locale }: NextPageContext) => ({
  props: {
    ...(await serverSideTranslations(locale || '', ["common", "about"])),
  },
});

export default HomePage;
