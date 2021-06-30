import { FC } from "react";
import { Provider } from 'react-redux';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import { store } from '../redux/store';

import 'styles/globals.scss';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
    );
};

export default appWithTranslation(MyApp);