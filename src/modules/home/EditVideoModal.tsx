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
import styles from './style.module.scss';

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
  // const message = useAppSelector(messageSelector);
  const dispatch = useAppDispatch();
  const form = useFormik({
    initialValues: {
      name: '',
      url: '',
      format: '',
      size: '',
      description: '',
    },
    validationSchema: VideoSchema,
    onSubmit: (values) => {
      const { name, url, format, size, description } = values;
      // dispatch(dispatchLogin({ email, password, remember }));
    },
  });
  const {
    values,
    errors,
    setFieldValue,
    setErrors,
    handleChange,
    handleSubmit,
  } = form;

  useEffect(() => {
    console.log('effect', isOpen, videoId, videoData);
    setErrors({});
    if (
      Array.isArray(videoData) &&
      videoData.length > 0 &&
      videoId > 0 &&
      isOpen
    ) {
      const data: any = videoData.find((video) => video.id === videoId);
      setFieldValue('name', data.name);
      setFieldValue('url', data.url);
      setFieldValue('format', data.format);
      setFieldValue('size', data.size);
      setFieldValue('description', data.description);
    }

    if (!isOpen) {
      setErrors({});
    }
  }, [isOpen]);

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
              <Input
                value={values.format}
                onChange={handleChange}
                errorMessage={errors.format}
                name="format"
                label="Video Format"
                placeholder="Format such as mp4, mkv,..."
                autoComplete="format"
              />
              <Input
                value={values.size}
                onChange={handleChange}
                errorMessage={errors.size}
                name="size"
                label="Video Size"
                placeholder="Enter video size"
                autoComplete="size"
              />
              <label>Video description</label>
              <FormTextarea
                style={{ height: 80 }}
                name="description"
                placeholder="Video description"
                value={values.description}
                onChange={handleChange}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              block
              type="submit"
              // disabled={loading}
              className="d-table mx-auto"
            >
              {/* {loading
                                    ? t('login:loadingSigninTitle')
                                    : t('login:loginFormSubmitButton')} */}
              Update
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default EditVideoModal;
