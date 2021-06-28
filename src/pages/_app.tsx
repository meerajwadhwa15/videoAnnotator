import { FC } from "react";
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { store } from '../store/configureStore';

import 'styles/globals.scss';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
    )
};

export default MyApp;