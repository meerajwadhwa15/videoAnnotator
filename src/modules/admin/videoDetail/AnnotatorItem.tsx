import { Segment, UserRole } from 'models';
import { FC, useState } from 'react';
import { Button, Tooltip } from 'shards-react';
import { convertSecondsToTimeString } from 'utils/helpers';
import debounce from 'lodash/debounce';
import classnames from 'classnames';
import style from './style.module.scss';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { loadingSelector, onEditSegment } from './slice';
import { userDataSelector } from 'redux/globalSlice';
import { dispatchDeleteAnnotator } from './actions';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

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
  const dispatch = useAppDispatch();
  const { roles, id } = useAppSelector(userDataSelector);
  const loading = useAppSelector(loadingSelector);
  const [tooltip, setTooltip] = useState<boolean>(false);
  const segmentId = `segment_${segment.id}`;
  const {
    query: { id: videoId },
  } = useRouter();
  const { t } = useTranslation(['video-detail']);

  const handleEditSegment = () => {
    dispatch(onEditSegment(segment));
  };

  const canUserManageSegment = () => {
    return roles.includes(UserRole.admin) || id === segment.user.id;
  };

  const onDelete = () => {
    const confirm = window.confirm(
      t('video-detail:deleteAnnotationConfirmMessage')
    );
    if (confirm) {
      dispatch(dispatchDeleteAnnotator({ segmentId: segment.id, videoId }));
    }
  };

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
          {t('video-detail:annotatorAddedBy')}:{' '}
          <strong>{segment.user.fullName}</strong>
        </div>
      </div>
      {canUserManageSegment() && (
        <div className="ml-auto d-flex align-items-center">
          <Button
            disabled={loading}
            onClick={handleEditSegment}
            className={classNames(style.annotatorAction, 'mr-2')}
          >
            <i className="material-icons">edit</i>
          </Button>
          <Button
            disabled={loading}
            onClick={onDelete}
            theme="danger"
            className={style.annotatorAction}
          >
            <i className="material-icons">delete_outline</i>
          </Button>
        </div>
      )}
      <Tooltip
        open={tooltip}
        toggle={() => setTooltip(!tooltip)}
        target={`#${segmentId}`}
      >
        {t('video-detail:annotationOnHoverTooltipLabel')}
      </Tooltip>
    </div>
  );
};
