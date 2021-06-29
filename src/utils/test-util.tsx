import { ReactElement, FC, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';

import {store} from 'store/configureStore';

const AllProvider: FC = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => render(ui, { wrapper: AllProvider, ...options });

export * from '@testing-library/react';

export { customRender as render };
