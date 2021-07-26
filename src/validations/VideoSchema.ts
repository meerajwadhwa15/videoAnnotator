import * as Yup from 'yup';
import { TFunction } from 'next-i18next';

export const VideoSchema = (t: TFunction) =>
  Yup.object().shape({
    name: Yup.string()
      .required(t('requiredNameError'))
      .min(5, t('minCharNameError'))
      .max(30, t('maxCharNameError')),
    url: Yup.string()
      .required(t('requiredUrlError'))
      .url(t('wrongUrlPatternError')),
    category: Yup.string().required(t('requiredCategoryError')),
    subcategoryId: Yup.string().required(t('requiredSubCategoryError')),
    description: Yup.string()
      .min(5, t('home:minCharDesError'))
      .max(100, t('home:maxCharDesError')),
  });
