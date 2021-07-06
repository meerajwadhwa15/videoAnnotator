import { all } from 'redux-saga/effects';

import homeSaga from 'modules/home/saga';
import loginSaga from 'modules/login/saga';
import signupSaga from 'modules/signup/saga';

export default function* rootSaga() {
  yield all([homeSaga(), loginSaga(), signupSaga()]);
}
