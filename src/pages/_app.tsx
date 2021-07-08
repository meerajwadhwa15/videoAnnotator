import { FC, useEffect } from 'react';
import { Provider } from 'react-redux';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import { store } from 'redux/store';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css';

import 'styles/globals.scss';
import { setCurrentLoginUser } from 'redux/globalSlice';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    if (process.browser) {
      const user = pageProps.user;
      if (user) {
        store.dispatch(setCurrentLoginUser(user));
      }
    }
  }, [pageProps]);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default appWithTranslation(MyApp);
