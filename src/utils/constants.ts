export const API_ENDPOINT = {
  login: 'user/signin',
  signup: 'user/signup',
  confirmEmail: 'user/confirmEmail',
  forgotPassword: 'user/resetPassword',
  resetPassword: 'user/newPassword',
  profile: 'user/profile',
  video: 'video',
  usersList: 'user/list',
  upateProfile: 'user/update',
  changePassword: 'user/changePassword',
  videoSegment: ({ videoId }: { videoId: string | string[] | undefined }) =>
    `video/${videoId}/segment`,
};
