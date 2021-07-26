import React, { FC } from 'react';
import {
  Form,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormTextarea,
} from 'shards-react';
import { useTranslation } from 'next-i18next';
import { useAppSelector } from 'redux/hooks';
import { Input, InputImage, Select } from 'components/elements';
import { VideoInfo } from 'models/video.model';
import { categoriesSelector, updateVideoLoadingSelector } from './slice';
import { useVideoFormik } from './useVideoFormik';
import { useVideoToastMessage } from './useVideoToastMessage';
import { useManageCategory } from './useManageCategory';

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
  const { t } = useTranslation('home');
  const loading = useAppSelector(updateVideoLoadingSelector);
  const categories = useAppSelector(categoriesSelector);
  const data = videoData.find((video) => video.id === videoId);
  const isEditVideo = !!data;
  useVideoToastMessage({ clearSearchKeyword, toggleEditModal });
  const { values, errors, handleChange, handleSubmit, setFieldValue } =
    useVideoFormik({
      data,
      videoId,
    });
  const { category } = values;
  const { subs, loadingSubs } = useManageCategory({ category });

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
              <Select
                label={t('videoCategoryLabel')}
                name="category"
                options={categories.map((it) => ({
                  value: it.id,
                  label: it.name,
                }))}
                value={category}
                onChange={handleChange}
                errorMessage={errors.category}
              />
              <Select
                label={t('videoSubCategoryLabel')}
                name="subcategoryId"
                options={(subs[values.category] || []).map((it) => ({
                  label: it.name,
                  value: it.id,
                }))}
                value={values.subcategoryId}
                onChange={handleChange}
                errorMessage={errors.subcategoryId}
              />
              <InputImage
                onChange={(url) => setFieldValue('thumbnail', url)}
                label="Video Thumbnail"
              />
              <div>
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
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              block
              type="submit"
              disabled={loading || loadingSubs}
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
