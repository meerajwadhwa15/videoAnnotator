import * as Yup from 'yup';

export const VideoSchema = Yup.object().shape({
  name: Yup.string().required(),
  url: Yup.string().required().url(),
});
