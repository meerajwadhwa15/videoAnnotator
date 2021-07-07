import { all } from 'redux-saga/effects';

import homeSaga from 'modules/home/saga';
import loginSaga from 'modules/login/saga';
import signupSaga from 'modules/signup/saga';
import forgotPassSaga from 'modules/forgotPassword/saga';

export default function* rootSaga() {
  yield all([homeSaga(), loginSaga(), signupSaga(), forgotPassSaga()]);
}
