import { all } from 'redux-saga/effects';

import homeSaga from 'modules/admin/home/saga';
import videoDetailSaga from 'modules/admin/videoDetail/saga';
import profileSaga from 'modules/admin/profile/saga';
import clientHomeSaga from 'modules/client/home/saga';
import clientVideoDetailSaga from 'modules/client/videoDetail/saga';

import authConsumerSaga from 'modules/authentication/saga';

export default function* rootSaga() {
  yield all([
    homeSaga(),
    videoDetailSaga(),
    profileSaga(),
    clientHomeSaga(),
    authConsumerSaga(),
    clientVideoDetailSaga(),
  ]);
}
