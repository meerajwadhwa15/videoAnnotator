import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  updateUserProfile,
  updateUserProfileSuccess,
  updateUserProfileFail,
} from './slice';
import { ProfileUpdateData } from './types';
import { API_ENDPOINT } from 'utils/constants';
import { request } from 'utils/apiClient';
import { setCurrentLoginUser } from 'redux/globalSlice';

function* updateProfileWorker({ payload }: PayloadAction<ProfileUpdateData>) {
  try {
    const result = yield call(request.post, API_ENDPOINT.upateProfile, payload);
    yield put(setCurrentLoginUser(result));
    yield put(updateUserProfileSuccess());
  } catch (error) {
    put(updateUserProfileFail());
  }
}

function* profileSaga() {
  yield all([takeLatest(updateUserProfile.type, updateProfileWorker)]);
}

export default profileSaga;
