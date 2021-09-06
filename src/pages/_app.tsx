import { FC, useEffect } from 'react';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { toast, Flip } from 'react-toastify';
import NProgress from 'nprogress';
import { wrapper } from 'redux/store';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'nprogress/nprogress.css';
import 'styles/globals.scss';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

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

  NProgress.configure({
    minimum: 0.1,
    showSpinner: false,
  });

  useEffect(() => {
    const minimumTimeToShow = 500;
    let timer;

    function onStart() {
      timer = setTimeout(function () {
        NProgress.start();
      }, minimumTimeToShow);
    }

    function onEnd() {
      clearTimeout(timer);
      NProgress.done();
    }

    router.events.on('routeChangeStart', () => onStart());
    router.events.on('routeChangeComplete', () => onEnd());
    router.events.on('routeChangeError', () => onEnd());

    return () => {
      router.events.off('routeChangeStart', NProgress.remove());
    };
  }, []); // eslint-disable-line

  return <Component {...pageProps} />;
};

export default wrapper.withRedux(appWithTranslation(MyApp));
