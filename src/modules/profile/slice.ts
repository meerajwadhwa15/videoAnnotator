import { createAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { AlertMessageType } from 'utils/types';
import { ProfileState, ProfileUpdateData } from './types';

const initialState: ProfileState = {
  loading: false,
  message: {
    type: '',
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

export const profileSlice = createSlice({
  name,
  initialState,
  reducers: {
    clearMessage(state) {
      state.message.type = '';
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
    },
    [updateUserProfileFail.type](state: ProfileState) {
      state.loading = false;
      state.message.type = AlertMessageType.success;
    },
  },
});

export const { clearMessage } = profileSlice.actions;
export const loadingSelector = (state: RootState) => state.profile.loading;
export const messageSelector = (state: RootState) => state.profile.message;

export default profileSlice.reducer;
