import { TFunction } from 'next-i18next';
import * as Yup from 'yup';

export const SignupSchema = (t: TFunction) =>
  Yup.object().shape({
    email: Yup.string()
      .email(t('signup:emailInvalidError'))
      .required(t('signup:emailRequiredError')),
    fullName: Yup.string()
      .required(t('signup:fullNameRequiredError'))
      .matches(/^[A-z0-9_-]+$/, t('signup:fullNameInvalidError')),
    password: Yup.string().required(t('signup:passwordRequiredError')),
    matchingPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      t('signup:passwordMustMatchError')
    ),
  });
