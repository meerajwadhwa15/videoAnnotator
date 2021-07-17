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
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { VideoSchema } from 'validations/VideoSchema';
import Input from 'components/elements/Input';
import { VideoInfo } from 'models/video.model';
import {
  editVideo,
  messageSelector,
  editVideoLoadingSelector,
  clearMessage,
} from './slice';

interface props {
  isOpen: boolean;
  videoId: number;
  videoData: VideoInfo[];
  toggleEditModal: () => void;
}

const EditVideoModal: FC<props> = ({
  isOpen,
  videoId,
  videoData,
  toggleEditModal,
}) => {
  const message = useAppSelector(messageSelector);
  const loading = useAppSelector(editVideoLoadingSelector);

  const dispatch = useAppDispatch();
  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      url: '',
      description: '',
    },
    validationSchema: VideoSchema,
    onSubmit: (values) => {
      const { name, url, description } = values;
      dispatch(editVideo({ id: videoId, name, url, description }));
    },
  });
  const { values, errors, setFieldValue, handleChange, handleSubmit } = form;

  useEffect(() => {
    if (!isOpen && message.type) {
      dispatch(clearMessage());
    }

    if (
      Array.isArray(videoData) &&
      videoData.length > 0 &&
      videoId > 0 &&
      isOpen
    ) {
      const data: any = videoData.find((video) => video.id === videoId);
      setFieldValue('name', data.name);
      setFieldValue('url', data.url);
      setFieldValue('description', data.description);
    }
  }, [isOpen]);

  useEffect(() => {
    if (message.type === 'success' && message.text === 'edit_video_success') {
      toast.success('Update video successfully!');
      toggleEditModal();
    }

    if (message.type === 'error' && message.text === 'edit_video_error') {
      toast.error('Edit video error!');
    }
  }, [message, dispatch]);

  return (
    <React.Fragment>
      <Modal centered size="md" open={isOpen} toggle={() => toggleEditModal()}>
        <ModalHeader>Edit Video Data</ModalHeader>
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
              type="submit"
              disabled={loading}
              className="d-table mx-auto"
            >
              {loading ? 'Updating' : 'Update'}
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default EditVideoModal;
