import {
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'shards-react';
import { useFormik } from 'formik';
import Input from 'components/elements/Input';
import { FC } from 'react';
import {
  convertTimeValueToSecond,
  checkOverlapTimeRange,
  convertSecondsToTime,
} from 'utils/helpers';
import { InputTime } from 'components/elements/InputTime';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  annotateModalSelector,
  edittingSegmentSelector,
  loadingSelector,
  toggleAnnotateModal,
  videoDetailSelector,
} from './slice';
import { useRouter } from 'next/router';
import { dispatchCreateSegment, dispatchEditSegment } from './actions';
import { useTranslation } from 'next-i18next';

interface Props {
  videoDuration: number;
}

export const AnnotatorForm: FC<Props> = ({ videoDuration }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['video-detail', 'common']);
  const videoDetail = useAppSelector(videoDetailSelector);
  const edittingSegment = useAppSelector(edittingSegmentSelector);
  const annotateModal = useAppSelector(annotateModalSelector);
  const loading = useAppSelector(loadingSelector);
  const {
    query: { id: videoId },
  } = useRouter();

  const { handleSubmit, values, handleChange, errors } = useFormik({
    initialValues: {
      label: edittingSegment ? edittingSegment.label : '',
      startFrame: convertSecondsToTime(edittingSegment?.startFrame),
      endFrame: convertSecondsToTime(edittingSegment?.endFrame),
    },
    enableReinitialize: true,
    validate(values) {
      const errors: Record<string, string> = {};
      const { label, startFrame, endFrame } = values;
      if (!label.trim()) {
        errors.label = t('video-detail:annotationRequiredError');
      }
      const startFrameBySecond = convertTimeValueToSecond(startFrame);
      const endFrameBySecond = convertTimeValueToSecond(endFrame);
      if (startFrameBySecond >= endFrameBySecond) {
        errors.endFrame = t('video-detail:endTimeMustBiggerThanStartTimeError');
      }
      if (videoDuration < endFrameBySecond) {
        errors.endFrame = t(
          'video-detail:endTimeMustLimitByVideoDurationError'
        );
      }
      const foundOverlapSegment = videoDetail.segments.find(
        (segment) =>
          segment.id !== edittingSegment?.id &&
          checkOverlapTimeRange(
            { start: startFrameBySecond, end: endFrameBySecond },
            { start: segment.startFrame, end: segment.endFrame }
          )
      );
      if (foundOverlapSegment) {
        errors.endFrame = t('video-detail:annotationTimeOverlapError');
      }
      return errors;
    },
    onSubmit(values) {
      const { label, startFrame, endFrame } = values;
      const data = {
        id: edittingSegment?.id,
        videoId,
        label,
        startFrame: convertTimeValueToSecond(startFrame),
        endFrame: convertTimeValueToSecond(endFrame),
      };
      if (edittingSegment) {
        dispatch(dispatchEditSegment(data));
      } else {
        dispatch(dispatchCreateSegment(data));
      }
    },
  });

  const toggleModal = () => dispatch(toggleAnnotateModal());

  return (
    <Modal open={annotateModal} toggle={toggleModal}>
      <ModalHeader>{t('video-detail:annotationFormTitle')}</ModalHeader>
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
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={toggleModal} theme="danger">
          {t('common:cancelButton')}
        </Button>
        <Button disabled={loading} type="submit" onClick={handleSubmit}>
          {t('common:saveButton')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
