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
import { convertTimeValueToSecond } from 'utils/helpers';
import { InputTime } from 'components/elements/InputTime';

interface Props {
  open: boolean;
  toggleModal: () => void;
}

export const AnnotatorForm: FC<Props> = ({ open, toggleModal }) => {
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
      console.log('startFrameBySecond', startFrameBySecond);
      if (startFrameBySecond === null) {
        errors.startFrame = 'Invalid start time';
      }
      if (endFrameBySecond === null) {
        errors.endFrame = 'Invalid end time';
      } else if (startFrameBySecond && startFrameBySecond >= endFrameBySecond) {
        errors.endFrame = 'End time must be after start time';
      }
      return errors;
    },
    onSubmit(values) {
      console.log('values', values);
    },
  });

  return (
    <Modal open={open} toggle={toggleModal}>
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
        <Button type="submit" onClick={handleSubmit}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};
