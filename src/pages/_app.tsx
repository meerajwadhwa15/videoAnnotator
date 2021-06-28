import { FC } from "react";
import { AppProps } from 'next/app';

import 'styles/globals.scss';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;