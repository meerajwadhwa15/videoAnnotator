import * as Yup from 'yup';
import { TFunction } from 'next-i18next';

export const ForgotPassSchema = (t: TFunction) =>
  Yup.object().shape({
    email: Yup.string()
      .email(t('forgot-password:invalidEmailError'))
      .required(t('forgot-password:requiredEmailError')),
  });
