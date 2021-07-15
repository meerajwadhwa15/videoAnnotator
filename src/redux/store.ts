import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

import appReducer from './globalSlice';
import homeReducer from 'modules/home/slice';
import loginReducer from 'modules/login/slice';
import signupReducer from 'modules/signup/slice';
import resetPasswordReducer from 'modules/resetPassword/slice';
import forgotPassReducer from 'modules/forgotPassword/slice';
import videoDetailReducer from 'modules/videoDetail/slice';
import elementReducer from 'components/elements/slice';
import profileReducer from 'modules/profile/slice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    app: appReducer,
    home: homeReducer,
    login: loginReducer,
    signup: signupReducer,
    forgotPass: forgotPassReducer,
    resetPassword: resetPasswordReducer,
    videoDetail: videoDetailReducer,
    element: elementReducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
