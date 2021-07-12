import { FC, useEffect } from 'react';
import { Provider } from 'react-redux';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import { toast, Flip } from 'react-toastify';
import { store } from 'redux/store';

import { setCurrentLoginUser } from 'redux/globalSlice';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'styles/globals.scss';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  toast.configure({
    autoClose: 3000,
    draggable: true,
    position: 'bottom-right',
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    newestOnTop: true,
    pauseOnFocusLoss: false,
    transition: Flip,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { user } = pageProps;
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
