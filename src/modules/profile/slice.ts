import { createAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { AlertMessageType } from 'utils/types';
import { ChangePasswordData, ProfileState, ProfileUpdateData } from './types';

const initialState: ProfileState = {
  loading: false,
  message: {
    type: AlertMessageType.default,
    text: '',
  },
};

const name = 'profile';

export const [
  updateUserProfile,
  updateUserProfileSuccess,
  updateUserProfileFail,
] = [
  createAction<ProfileUpdateData>(`${name}/updateUserProfile`),
  createAction(`${name}/updateUserProfileSuccess`),
  createAction(`${name}/updateUserProfileFail`),
];

export const [
  changeUserPassword,
  changeUserPasswordSuccess,
  changeUserPasswordFail,
] = [
  createAction<ChangePasswordData>(`${name}/changeUserPassword`),
  createAction(`${name}/changeUserPasswordSuccess`),
  createAction<string>(`${name}/changeUserPasswordFail`),
];

export const profileSlice = createSlice({
  name,
  initialState,
  reducers: {
    clearMessage(state) {
      state.message.type = AlertMessageType.default;
      state.message.text = '';
    },
  },
  extraReducers: {
    [updateUserProfile.type](state: ProfileState) {
      state.loading = true;
    },
    [updateUserProfileSuccess.type](state: ProfileState) {
      state.loading = false;
      state.message.type = AlertMessageType.success;
      state.message.text = '🚀 Update profile successfully!';
    },
    [updateUserProfileFail.type](state: ProfileState) {
      state.loading = false;
      state.message.type = AlertMessageType.error;
      state.message.text = '🚀 Update profile failed!';
    },
    [changeUserPassword.type](state: ProfileState) {
      state.loading = true;
    },
    [changeUserPasswordSuccess.type](state: ProfileState) {
      state.loading = false;
      state.message.type = AlertMessageType.success;
      state.message.text = '🚀 Update password successfully!';
    },
    [changeUserPasswordFail.type](state: ProfileState, action) {
      state.loading = false;
      state.message.type = AlertMessageType.error;
      state.message.text = action.payload;
    },
  },
});

export const { clearMessage } = profileSlice.actions;
export const loadingSelector = (state: RootState) => state.profile.loading;
export const messageSelector = (state: RootState) => state.profile.message;

export default profileSlice.reducer;
