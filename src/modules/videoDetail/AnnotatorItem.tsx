import { Segment } from 'models';
import { FC, useState } from 'react';
import { Button, Tooltip } from 'shards-react';
import { convertSecondsToTimeString } from 'utils/helpers';
import debounce from 'lodash/debounce';
import classnames from 'classnames';
import style from './style.module.scss';
import classNames from 'classnames';

interface Props {
  segment: Segment;
  active: boolean;
  onSeekToSegment: (segment: Segment) => void;
}

export const AnnotatorItem: FC<Props> = ({
  active,
  segment,
  onSeekToSegment,
}) => {
  const [tooltip, setTooltip] = useState<boolean>(false);

  const segmentId = `segment_${segment.id}`;

  return (
    <div
      className={classnames(style.annotatorItem, 'd-flex', {
        [style.activeAnnotator]: active,
      })}
    >
      <div
        className="flex-grow-1"
        onClick={debounce(() => onSeekToSegment(segment), 200)}
        id={segmentId}
      >
        <div>
          <strong>{segment.label}</strong>
        </div>
        <div>
          {convertSecondsToTimeString(segment.startFrame)} -{' '}
          {convertSecondsToTimeString(segment.endFrame)}
        </div>
        <div>
          Added by: <strong>{segment.user.fullName}</strong>
        </div>
      </div>
      <div className="ml-auto d-flex align-items-center">
        <Button className={classNames(style.annotatorAction, 'mr-2')}>
          <i className="material-icons">edit</i>
        </Button>
        <Button theme="danger" className={style.annotatorAction}>
          <i className="material-icons">delete_outline</i>
        </Button>
      </div>
      <Tooltip
        open={tooltip}
        toggle={() => setTooltip(!tooltip)}
        target={`#${segmentId}`}
      >
        Click To Go To Segment
      </Tooltip>
    </div>
  );
};
