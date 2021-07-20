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
import { convertTimeValueToSecond, checkOverlapTimeRange } from 'utils/helpers';
import { InputTime } from 'components/elements/InputTime';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  annotateModalSelector,
  loadingSelector,
  toggleAnnotateModal,
  videoDetailSelector,
} from './slice';
import { useRouter } from 'next/router';
import { dispatchCreateSegment } from './actions';

interface Props {
  videoDuration: number;
}

export const AnnotatorForm: FC<Props> = ({ videoDuration }) => {
  const dispatch = useAppDispatch();
  const videoDetail = useAppSelector(videoDetailSelector);
  const annotateModal = useAppSelector(annotateModalSelector);
  const loading = useAppSelector(loadingSelector);
  const {
    query: { id: videoId },
  } = useRouter();

  const { handleSubmit, values, handleChange, errors } = useFormik({
    initialValues: {
      label: '',
      startFrame: {
        hour: 0,
        minute: 0,
        second: 0,
      },
      endFrame: {
        hour: 0,
        minute: 0,
        second: 0,
      },
    },
    validate(values) {
      const errors: Record<string, string> = {};
      const { label, startFrame, endFrame } = values;
      if (!label.trim()) {
        errors.label = 'Annotator is required';
      }
      const startFrameBySecond = convertTimeValueToSecond(startFrame);
      const endFrameBySecond = convertTimeValueToSecond(endFrame);
      if (startFrameBySecond >= endFrameBySecond) {
        errors.endFrame = 'End time must be after start time';
      }
      if (videoDuration < endFrameBySecond) {
        errors.endFrame = 'End time cannot bigger than video duration';
      }
      const foundOverlapSegment = videoDetail.segments.find((segment) =>
        checkOverlapTimeRange(
          { start: startFrameBySecond, end: endFrameBySecond },
          { start: segment.startFrame, end: segment.endFrame }
        )
      );
      if (foundOverlapSegment) {
        errors.endFrame = 'Time cannot overlap with other annotation';
      }
      return errors;
    },
    onSubmit(values) {
      const { label, startFrame, endFrame } = values;
      dispatch(
        dispatchCreateSegment({
          videoId,
          label,
          startFrame: convertTimeValueToSecond(startFrame),
          endFrame: convertTimeValueToSecond(endFrame),
        })
      );
    },
  });

  const toggleModal = () => dispatch(toggleAnnotateModal());

  return (
    <Modal open={annotateModal} toggle={toggleModal}>
      <ModalHeader>Setting Annotator</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <Input
            label="Annotator"
            name="label"
            errorMessage={errors.label}
            onChange={handleChange}
            value={values.label}
            placeholder="Annotator"
          />
          <InputTime
            name="startFrame"
            errorMessage={errors.startFrame}
            value={values.startFrame}
            handleChange={handleChange}
            label="Start Time"
          />
          <InputTime
            name="endFrame"
            value={values.endFrame}
            errorMessage={errors.endFrame}
            handleChange={handleChange}
            label="End Time"
          />
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={toggleModal} theme="danger">
          Cancel
        </Button>
        <Button disabled={loading} type="submit" onClick={handleSubmit}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};
