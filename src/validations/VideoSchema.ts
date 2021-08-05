import * as Yup from 'yup';
import { TFunction } from 'next-i18next';

export const VideoSchema = (t: TFunction) =>
  Yup.object().shape({
    name: Yup.string()
      .required(t('requiredNameError'))
      .min(5, t('minCharError', { value: 5 }))
      .max(50, t('maxCharError', { value: 50 })),
    url: Yup.string()
      .required(t('requiredUrlError'))
      .url(t('wrongUrlPatternError')),
    thumbnail: Yup.string(),
    category: Yup.string().required(t('requiredCategoryError')),
    subcategoryId: Yup.string().required(t('requiredSubCategoryError')),
    description: Yup.string()
      .min(5, t('home:minCharError', { value: 5 }))
      .max(100, t('home:maxCharError', { value: 100 })),
  });
