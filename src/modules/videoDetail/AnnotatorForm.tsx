import {
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'shards-react';
import Input from 'components/elements/Input';
import { FC } from 'react';

interface Props {
  open: boolean;
  toggleModal: () => void;
}

export const AnnotatorForm: FC<Props> = ({ open, toggleModal }) => {
  return (
    <Modal open={open} toggle={toggleModal}>
      <ModalHeader>Setting Annotator</ModalHeader>
      <ModalBody>
        <Form>
          <Input
            label="Annotator"
            value=""
            placeholder="Annotator"
            name="annotator"
          />
          <Input
            label="Start time"
            value=""
            type="time"
            placeholder="Annotator"
            name="annotator"
          />
          <Input
            label="End time"
            value=""
            type="time"
            placeholder="Annotator"
            name="annotator"
          />
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={toggleModal} theme="danger">
          Cancel
        </Button>
        <Button onClick={toggleModal}>Save</Button>
      </ModalFooter>
    </Modal>
  );
};
