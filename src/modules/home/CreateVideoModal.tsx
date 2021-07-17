import React, { useState, useEffect } from 'react';
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
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { VideoSchema } from 'validations/VideoSchema';
import Input from 'components/elements/Input';
import {
  fetchVideosList,
  createVideo,
  messageSelector,
  createVideoLoadingSelector,
  clearMessage,
} from './slice';

const CreateVideoModal = () => {
  const message = useAppSelector(messageSelector);
  const loading = useAppSelector(createVideoLoadingSelector);
  const dispatch = useAppDispatch();

  const [isCreateModalOpen, setCreateModal] = useState(false);
  const form = useFormik({
    initialValues: {
      name: '',
      url: '',
      description: '',
    },
    validationSchema: VideoSchema,
    onSubmit: (values) => {
      const { name, url, description } = values;
      dispatch(createVideo({ name, url, description }));
    },
  });
  const { values, errors, handleChange, handleSubmit } = form;

  useEffect(() => {
    if (!isCreateModalOpen && message.type) {
      dispatch(clearMessage());
      form.resetForm();
    }
  }, [isCreateModalOpen]);

  useEffect(() => {
    if (message.type === 'success' && message.text === 'create_video_success') {
      // toast.success(t('reset-password:createNewPasswordSuccess'));
      toast.success('Create video successfully!');
    }

    if (message.type === 'error' && message.text === 'create_video_error') {
      dispatch(fetchVideosList());
      toast.error('Create video error!');
    }
  }, [message, dispatch]);

  function toggleCreateModal() {
    setCreateModal(!isCreateModalOpen);
  }

  return (
    <React.Fragment>
      <Button outline size="sm" onClick={() => toggleCreateModal()}>
        Create new <i className="material-icons">plus_one</i>
      </Button>
      <Modal
        centered
        size="md"
        open={isCreateModalOpen}
        toggle={() => toggleCreateModal()}
      >
        <ModalHeader>Create Video Data</ModalHeader>
        <Form onSubmit={handleSubmit}>
          <ModalBody>
            <div className="content-wrapper">
              <Input
                value={values.name}
                onChange={handleChange}
                errorMessage={errors.name}
                name="name"
                label="Video Name"
                placeholder="Enter video name"
                autoComplete="name"
              />
              <Input
                value={values.url}
                onChange={handleChange}
                errorMessage={errors.url}
                name="url"
                label="Video Url"
                placeholder="Url such as youtube, vimeo,..."
                autoComplete="url"
              />
              <label>Video description</label>
              <FormTextarea
                style={{ height: 80 }}
                name="description"
                placeholder="Video description"
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
              {loading ? 'Creating...' : 'Submit'}
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default CreateVideoModal;
