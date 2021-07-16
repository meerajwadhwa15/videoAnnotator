import { FC } from 'react';
import { Button } from 'shards-react';

import style from './style.module.scss';

interface Props {
  onEditeAnnotator: () => void;
}

export const AnnotatorItem: FC<Props> = ({ onEditeAnnotator }) => {
  return (
    <div className={`${style.annotatorItem} d-flex`}>
      <div>
        <div>
          <strong>Annotator</strong>
        </div>
        <div>00:00 - 01:00</div>
      </div>
      <Button onClick={onEditeAnnotator} theme="secondary" className="ml-auto">
        EDIT
      </Button>
    </div>
  );
};
