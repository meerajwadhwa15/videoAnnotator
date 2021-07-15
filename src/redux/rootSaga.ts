import { all } from 'redux-saga/effects';

import homeSaga from 'modules/home/saga';
import loginSaga from 'modules/login/saga';
import signupSaga from 'modules/signup/saga';
import forgotPassSaga from 'modules/forgotPassword/saga';
import resetPasswordSaga from 'modules/resetPassword/saga';
import videoDetailSaga from 'modules/videoDetail/saga';
import profileSaga from 'modules/profile/saga';

export default function* rootSaga() {
  yield all([
    homeSaga(),
    loginSaga(),
    signupSaga(),
    forgotPassSaga(),
    resetPasswordSaga(),
    videoDetailSaga(),
    profileSaga(),
  ]);
}
