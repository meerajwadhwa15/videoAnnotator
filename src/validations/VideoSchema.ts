import * as Yup from 'yup';
import { TFunction } from 'next-i18next';

export const VideoSchema = (t: TFunction) =>
  Yup.object().shape({
    name: Yup.string()
      .required(t('home:requiredNameError'))
      .min(5, t('home:minCharNameError'))
      .max(30, t('home:maxCharNameError')),
    url: Yup.string()
      .required(t('home:requiredUrlError'))
      .url(t('home:wrongUrlPatternError')),
    description: Yup.string()
      .min(5, t('home:minCharDesError'))
      .max(100, t('home:maxCharDesError')),
  });
