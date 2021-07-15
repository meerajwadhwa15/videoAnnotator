import * as Yup from 'yup';

export const UserProfileSchema = Yup.object().shape({
  fullName: Yup.string().required('Full name is required'),
  address: Yup.string().required('Address is required'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/[0-9]/, 'Phone number must contain only numbers'),
  introduction: Yup.string(),
});

export const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Old password is required'),
  password: Yup.string()
    .required('New password is required')
    .notOneOf(
      [Yup.ref('oldPassword'), null],
      'New password must be different with old password'
    ),
  matchingPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Confirm password must be match with new password'
  ),
});
