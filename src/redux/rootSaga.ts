import { all } from 'redux-saga/effects';

import homeSaga from 'modules/admin/home/saga';
import loginSaga from 'modules/admin/login/saga';
import signupSaga from 'modules/admin/signup/saga';
import forgotPassSaga from 'modules/admin/forgotPassword/saga';
import resetPasswordSaga from 'modules/admin/resetPassword/saga';
import videoDetailSaga from 'modules/admin/videoDetail/saga';
import profileSaga from 'modules/admin/profile/saga';
import clientHomeSaga from 'modules/client/home/saga';

export default function* rootSaga() {
  yield all([
    homeSaga(),
    loginSaga(),
    signupSaga(),
    forgotPassSaga(),
    resetPasswordSaga(),
    videoDetailSaga(),
    profileSaga(),
    clientHomeSaga(),
  ]);
}
