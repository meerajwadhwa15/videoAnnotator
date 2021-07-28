import {
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'shards-react';
import { FC } from 'react';
import { InputTime, Input, InputImage } from 'components/elements';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  annotateModalSelector,
  edittingSegmentSelector,
  loadingSelector,
  toggleAnnotateModal,
} from './slice';
import { useTranslation } from 'next-i18next';
import { useAnnotationForm } from './useAnnotationForm';

interface Props {
  videoDuration: number;
}

export const AnnotatorForm: FC<Props> = ({ videoDuration }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['video-detail', 'common']);
  const edittingSegment = useAppSelector(edittingSegmentSelector);
  const annotateModal = useAppSelector(annotateModalSelector);
  const loading = useAppSelector(loadingSelector);

  const { handleSubmit, values, handleChange, errors, setFieldValue } =
    useAnnotationForm({ videoDuration });

  const toggleModal = () => dispatch(toggleAnnotateModal());

  return (
    <Modal open={annotateModal} toggle={toggleModal}>
      <ModalHeader>
        {edittingSegment
          ? t('video-detail:editAnnotationFormTitle')
          : t('video-detail:createAnnotationFormTitle')}
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <Input
            label={t('video-detail:annotationInputLabel')}
            name="label"
            errorMessage={errors.label}
            onChange={handleChange}
            value={values.label}
            placeholder={t('video-detail:annotationInputPlaceholder')}
          />
          <InputTime
            name="startFrame"
            errorMessage={errors.startFrame}
            value={values.startFrame}
            handleChange={handleChange}
            label={t('video-detail:startFrameInputLabel')}
          />
          <InputTime
            name="endFrame"
            value={values.endFrame}
            errorMessage={errors.endFrame}
            handleChange={handleChange}
            label={t('video-detail:endFrameInputLabel')}
          />
          <InputImage
            errorMessage={errors.thumbnail}
            fileUrl={values.thumbnail}
            onChange={(file) => setFieldValue('thumbnail', file)}
            label="Thumbnail"
          />
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={toggleModal} theme="danger">
          {t('common:cancelButton')}
        </Button>
        <Button disabled={loading} type="submit" onClick={handleSubmit}>
          {loading ? t('common:savingButton') : t('common:saveButton')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
