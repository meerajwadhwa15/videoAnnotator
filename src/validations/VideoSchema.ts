import * as Yup from 'yup';

export const VideoSchema = Yup.object().shape({
  name: Yup.string()
    .required()
    .min(5, 'Must be at least 5 characters')
    .max(30, 'Must be under 30 characters'),
  url: Yup.string().required().url(),
  description: Yup.string().min(5).max(100),
});
