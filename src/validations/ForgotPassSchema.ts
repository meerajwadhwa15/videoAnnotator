import * as Yup from 'yup';

export const ForgotPassSchema = Yup.object().shape({
  email: Yup.string().email().required(),
});
