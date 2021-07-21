import React, { useState, useEffect, FC } from 'react';
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
import {
  createVideo,
  messageSelector,
  createVideoLoadingSelector,
} from './slice';

interface props {
  clearSearchKeyword: () => void;
}

const CreateVideoModal: FC<props> = ({ clearSearchKeyword }) => {
  const message = useAppSelector(messageSelector);
  const loading = useAppSelector(createVideoLoadingSelector);
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['home']);

  const [isCreateModalOpen, setCreateModal] = useState(false);
  const form = useFormik({
    initialValues: {
      name: '',
      url: '',
      description: '',
    },
    validationSchema: VideoSchema(t),
    onSubmit: (values) => {
      const { name, url, description } = values;
      dispatch(createVideo({ name, url, description }));
    },
  });
  const { values, errors, handleChange, handleSubmit } = form;

  useEffect(() => {
    if (!isCreateModalOpen) {
      form.resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreateModalOpen]);

  useEffect(() => {
    if (message.type === 'success' && message.text === 'create_video_success') {
      toast.success(t('createSuccessMsg'));
      clearSearchKeyword();
    }

    if (message.type === 'error' && message.text === 'create_video_error') {
      toast.error(t('createErrorMsg'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  function toggleCreateModal() {
    setCreateModal(!isCreateModalOpen);
  }

  return (
    <React.Fragment>
      <Button outline size="sm" onClick={() => toggleCreateModal()}>
        {t('createNewBtn')} <i className="material-icons">plus_one</i>
      </Button>
      <Modal
        centered
        size="md"
        open={isCreateModalOpen}
        toggle={() => toggleCreateModal()}
      >
        <ModalHeader>{t('createModalHeaderText')}</ModalHeader>
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
              disabled={loading}
              type="submit"
              className="d-table mx-auto"
            >
              {loading ? t('createSubmitBtnLoading') : t('createSubmitBtn')}
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default CreateVideoModal;
