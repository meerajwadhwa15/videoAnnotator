export const API_ENDPOINT = {
  login: 'user/signin',
  signup: 'user/signup',
  confirmEmail: 'user/confirmEmail',
  forgotPassword: 'user/resetPassword',
  resetPassword: 'user/newPassword',
  changePassword: 'user/changePassword',
  profile: 'user/profile',
  video: 'video',
  usersList: 'user/list',
  updateProfile: 'user/update',
  videoSegment: ({ videoId }: { videoId: string | string[] | undefined }) =>
    `video/${videoId}/segment`,
  category: 'category',
  clientVideoList: 'video/public',
};

export const ADMIN_ROUTING = {
  home: '/admin',
  login: '/admin/login',
  signup: '/admin/signup',
  confirmEmail: '/admin/email-confirmation',
  forgotPassword: '/admin/forgot-password',
  resetPassword: '/admin/reset-password',
  profile: '/admin/profile',
  videoDetail: '/admin/video-detail',
};

export const CLIENT_ROUTING = {
  home: '/',
};

export const PAGE_SIZE = 10;
export const CONSUMER_PAGE_SIZE = 48;
