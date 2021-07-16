import { AnnotatorItem } from './AnnotatorItem';
import range from 'lodash/range';
import { Button } from 'shards-react';

import style from './style.module.scss';
import { FC } from 'react';

interface Props {
  onAnnotate: () => void;
}

export const AnnotatorList: FC<Props> = ({ onAnnotate }) => {
  const annotators = range(0, 5);

  function renderAnnotator() {
    if (!annotators.length) {
      return <div className="mt-2">No Data Found</div>;
    }
    return annotators.map((it) => {
      return <AnnotatorItem onEditeAnnotator={onAnnotate} key={it} />;
    });
  }

  return (
    <div>
      <h4 className="mb-2">Annotators</h4>
      <div className={style.annotatorList}>{renderAnnotator()}</div>
      <Button onClick={onAnnotate}>Annotate</Button>
    </div>
  );
};
