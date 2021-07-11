import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  fullName: Yup.string()
    .required()
    .matches(/^[A-z0-9_-]+$/, 'username cannot contain special characters'),
  password: Yup.string().required(),
  matchingPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Password must match'
  ),
});
