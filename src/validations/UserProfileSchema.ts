import * as Yup from 'yup';
import { TFunction } from 'next-i18next';

export const UserProfileSchema = (t: TFunction) =>
  Yup.object().shape({
    fullName: Yup.string().required(t('requiredNameError')),
    phone: Yup.string().matches(/[0-9]/, t('phonePatternError')),
    introduction: Yup.string(),
  });

export const ChangePasswordSchema = (t: TFunction) =>
  Yup.object().shape({
    oldPassword: Yup.string().required(t('requiredOldPwError')),
    password: Yup.string()
      .required(t('requiredNewPwError'))
      .notOneOf([Yup.ref('oldPassword'), null], t('diffWithOldPwError')),
    matchingPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      t('matchConfirmPwError')
    ),
  });
