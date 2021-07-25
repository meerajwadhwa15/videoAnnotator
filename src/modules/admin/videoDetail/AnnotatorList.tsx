import { AnnotatorItem } from './AnnotatorItem';
import { Button } from 'shards-react';

import style from './style.module.scss';
import { FC } from 'react';
import { Segment } from 'models';
import { useTranslation } from 'next-i18next';

interface Props {
  onAnnotate: () => void;
  segments: Segment[];
  activeSegment: number | null;
  onSeekToSegment: (segment: Segment) => void;
}

export const AnnotatorList: FC<Props> = ({
  onAnnotate,
  segments,
  activeSegment,
  onSeekToSegment,
}) => {
  const { t } = useTranslation(['video-detail']);
  function renderAnnotator() {
    if (!segments.length) {
      return <div className="mt-2">No Data Found</div>;
    }
    return segments.map((it) => {
      return (
        <AnnotatorItem
          key={it.id}
          segment={it}
          onSeekToSegment={onSeekToSegment}
          active={activeSegment === it.id}
        />
      );
    });
  }

  return (
    <div>
      <h4 className="mb-2">{t('video-detail:annotatorListTitle')}</h4>
      <div className={style.annotatorList}>{renderAnnotator()}</div>
      <Button className="mt-2" onClick={onAnnotate}>
        {t('video-detail:addNewAnnotatationButton')}
      </Button>
    </div>
  );
};
