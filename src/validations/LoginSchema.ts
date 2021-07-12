import { TFunction } from 'next-i18next';
import * as Yup from 'yup';

export const LoginSchema = (t: TFunction) =>
  Yup.object().shape({
    email: Yup.string()
      .email(t('login:invalidEmailError'))
      .required(t('login:requiredEmailError')),
    password: Yup.string().required(t('login:requiredPasswordError')),
  });
