import { PayloadAction } from '@reduxjs/toolkit';
import { SignupData } from 'modules/admin/signup/types';
import { toast } from 'react-toastify';
import { takeLatest, all, call, put } from 'redux-saga/effects';
import { request, setAuthorizationHeader } from 'utils/apiClient';

import { API_ENDPOINT } from 'utils/constants';
import { UserType } from 'utils/types';
import { i18n } from 'next-i18next';
import * as actions from './actions';
import { LoginData } from 'modules/admin/login/types';
import { clientCookies } from 'utils/clientCookies';
import { ResetPassData } from 'modules/admin/resetPassword/types';

export function* signUpWorker({ payload }: PayloadAction<SignupData>) {
  try {
    yield call(request.post, API_ENDPOINT.signup, {
      ...payload,
      userType: UserType.consumer,
    });
    yield put(actions.dispatchSignupSuccess({ email: payload.email }));
    toast.success(i18n?.t('signup:signupSuccessMessage'));
    toast.success('Signup successfull');
  } catch (error) {
    toast.error(i18n?.t('signup:failToSignupError'));
    yield put(actions.dispatchSignupFail());
  }
}

export function* verifyEmailWorker({
  payload,
}: PayloadAction<{ token: string }>) {
  try {
    const { token } = payload;
    yield call(request.post, `${API_ENDPOINT.confirmEmail}?token=${token}`);
    yield put(actions.dispatchVerifyEmailSuccess());
    toast.success(i18n?.t('signup:verifyPasscodeSuccess'));
  } catch {
    toast.error(i18n?.t('signup:verifyPasscodeFail'));
    yield put(actions.dispatchVerifyEmailFail());
  }
}

export function* loginWorker({ payload }: PayloadAction<LoginData>) {
  try {
    const { remember, ...data } = payload;
    const result = yield call(request.post, API_ENDPOINT.login, data);
    const token = result.token.replace('Bearer ', '');
    clientCookies.saveToken({ token, remember });
    setAuthorizationHeader();
    yield put(actions.dispatchLoginSuccess());
    toast.success(i18n?.t('login:loginSuccessMessage'));
    window.location.reload();
  } catch (error) {
    toast.error(i18n?.t('login:loginFailMessage'));
    yield put(actions.dispatchLoginFail());
  }
}

function* forgotPasswordWorker({ payload }: PayloadAction<{ email: string }>) {
  try {
    const { email } = payload;
    yield call(request.post, `${API_ENDPOINT.forgotPassword}?email=${email}`);
    yield put(actions.dispatchForgetPassSuccess({ email }));
    toast.success(i18n?.t('forgot-password:sendSuccess'));
  } catch (error) {
    toast.error(i18n?.t('forgot-password:sendError'));
    yield put(actions.dispatchForgetPassFail());
  }
}

function* resetPasswordWorker({ payload }: PayloadAction<ResetPassData>) {
  try {
    const { token, ...data } = payload;
    yield call(
      request.post,
      `${API_ENDPOINT.resetPassword}?token=${token}`,
      data
    );
    yield put(actions.dispatchResetPassSuccess());
    toast.success(i18n?.t('reset-password:createNewPasswordSuccess'));
  } catch (error) {
    yield put(actions.dispatchResetPassFail());
    toast.error(i18n?.t('reset-password:createNewPasswordFail'));
  }
}

function* authConsumerSaga() {
  yield all([
    takeLatest(actions.dispatchSignup.type, signUpWorker),
    takeLatest(actions.dispatchVerifyEmail.type, verifyEmailWorker),
    takeLatest(actions.dispatchLogin.type, loginWorker),
    takeLatest(actions.dispatchForgetPass.type, forgotPasswordWorker),
    takeLatest(actions.dispatchResetPass.type, resetPasswordWorker),
  ]);
}

export default authConsumerSaga;
