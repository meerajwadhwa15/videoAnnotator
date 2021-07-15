import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import _get from 'lodash/get';
import {
  updateUserProfile,
  updateUserProfileSuccess,
  updateUserProfileFail,
  changeUserPasswordSuccess,
  changeUserPasswordFail,
  changeUserPassword,
} from './slice';
import { ChangePasswordData, ProfileUpdateData } from './types';
import { API_ENDPOINT } from 'utils/constants';
import { request } from 'utils/apiClient';
import { setCurrentLoginUser } from 'redux/globalSlice';

function* updateProfileWorker({ payload }: PayloadAction<ProfileUpdateData>) {
  try {
    const result = yield call(request.put, API_ENDPOINT.upateProfile, payload);
    yield put(setCurrentLoginUser(result));
    yield put(updateUserProfileSuccess());
  } catch (error) {
    put(updateUserProfileFail());
  }
}

function* changeUserPasswordWorker({
  payload,
}: PayloadAction<ChangePasswordData>) {
  try {
    yield call(request.post, API_ENDPOINT.changePassword, payload);
    yield put(changeUserPasswordSuccess());
  } catch (error) {
    const errorMessage = _get(
      error,
      'response.data.message',
      '🚀 Update password failed'
    );
    yield put(changeUserPasswordFail(errorMessage));
  }
}

function* profileSaga() {
  yield all([
    takeLatest(updateUserProfile.type, updateProfileWorker),
    takeLatest(changeUserPassword.type, changeUserPasswordWorker),
  ]);
}

export default profileSaga;
