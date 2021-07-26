import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import { useAppDispatch } from 'redux/hooks';
import { VideoSchema } from 'validations/VideoSchema';
import { createVideo, editVideo } from './slice';

export function useVideoFormik({ data, videoId }) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('home');

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: data?.name || '',
      url: data?.url || '',
      category: '',
      thumbnail: '',
      subcategoryId: '',
      description: data?.description || '',
    },
    validationSchema: VideoSchema(t),
    onSubmit: (values) => {
      const { name, url, description } = values;
      if (data) {
        dispatch(editVideo({ id: videoId, name, url, description }));
      } else {
        dispatch(createVideo(values));
      }
    },
  });

  return form;
}
