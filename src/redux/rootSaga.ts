import { all } from 'redux-saga/effects';
import homeSaga from 'modules/home/saga';
import loginSaga from 'modules/login/sagas';

export default function* rootSaga() {
  yield all([homeSaga(), loginSaga()]);
}
