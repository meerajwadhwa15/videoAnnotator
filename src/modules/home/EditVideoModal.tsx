import React, { FC, useEffect } from 'react';
import {
  Form,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormTextarea,
} from 'shards-react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { VideoSchema } from 'validations/VideoSchema';
import Input from 'components/elements/Input';
import { VideoInfo } from 'models/video.model';
import {
  editVideo,
  messageSelector,
  createVideo,
  updateVideoLoadingSelector,
} from './slice';

interface props {
  isOpen: boolean;
  videoId: number;
  videoData: VideoInfo[];
  toggleEditModal: () => void;
  clearSearchKeyword: () => void;
}

const EditVideoModal: FC<props> = ({
  isOpen,
  videoId,
  videoData,
  toggleEditModal,
  clearSearchKeyword,
}) => {
  const { t } = useTranslation(['home']);
  const message = useAppSelector(messageSelector);
  const loading = useAppSelector(updateVideoLoadingSelector);
  const dispatch = useAppDispatch();

  const data = videoData.find((video) => video.id === videoId);
  const isEditVideo = !!data;

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: data?.name || '',
      url: data?.url || '',
      description: data?.description || '',
    },
    validationSchema: VideoSchema(t),
    onSubmit: (values) => {
      const { name, url, description } = values;
      if (isEditVideo) {
        dispatch(editVideo({ id: videoId, name, url, description }));
      } else {
        dispatch(createVideo(values));
      }
    },
  });
  const { values, errors, handleChange, handleSubmit } = form;

  useEffect(() => {
    if (message.type === 'success' && message.text === 'edit_video_success') {
      toast.success(t('editSuccessMsg'));
      toggleEditModal();
      clearSearchKeyword();
    }

    if (message.type === 'error' && message.text === 'edit_video_error') {
      toast.error(t('editErrorMsg'));
    }
    if (message.type === 'success' && message.text === 'create_video_success') {
      toast.success(t('createSuccessMsg'));
      clearSearchKeyword();
    }

    if (message.type === 'error' && message.text === 'create_video_error') {
      toast.error(t('createErrorMsg'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  return (
    <React.Fragment>
      <Modal centered size="md" open={isOpen} toggle={() => toggleEditModal()}>
        <ModalHeader>
          {t(isEditVideo ? 'editModalHeaderText' : 'createModalHeaderText')}
        </ModalHeader>
        <Form onSubmit={handleSubmit}>
          <ModalBody>
            <div className="content-wrapper">
              <Input
                value={values.name}
                onChange={handleChange}
                errorMessage={errors.name}
                name="name"
                label={t('videoNameLabel')}
                placeholder={t('videoNamePlaceholder')}
                autoComplete="name"
              />
              <Input
                value={values.url}
                onChange={handleChange}
                errorMessage={errors.url}
                name="url"
                label={t('videoUrlLabel')}
                placeholder={t('videoUrlPlaceholder')}
                autoComplete="url"
              />
              <label>{t('videoDesLabel')}</label>
              <FormTextarea
                style={{ height: 80 }}
                name="description"
                placeholder={t('videoDesPlaceholder')}
                value={values.description}
                onChange={handleChange}
              />
              {errors.description && (
                <p className="error-text">{errors.description}</p>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              block
              type="submit"
              disabled={loading}
              className="d-table mx-auto"
            >
              {loading ? t('editSubmitBtnLoading') : t('editSubmitBtn')}
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default EditVideoModal;
