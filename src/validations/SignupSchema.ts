import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  fullname: Yup.string().required(),
  password: Yup.string().required(),
  matchingPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'passwords must match'
  ),
});
