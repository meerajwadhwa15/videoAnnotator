import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

import appReducer from './globalSlice';
import homeReducer from 'modules/admin/home/slice';
import videoDetailReducer from 'modules/admin/videoDetail/slice';
import profileReducer from 'modules/admin/profile/slice';
import clientHomeReducer from 'modules/client/home/slice';
import elementReducer from 'components/elements/slice';

import authClientReducer from 'modules/authentication/slice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    app: appReducer,
    home: homeReducer,
    videoDetail: videoDetailReducer,
    profile: profileReducer,
    clientHome: clientHomeReducer,
    element: elementReducer,
    authClient: authClientReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
