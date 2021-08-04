import { AnnotatorItem } from './AnnotatorItem';
import { Button, FormInput } from 'shards-react';

import style from './style.module.scss';
import { ChangeEvent, FC, useEffect, useState } from 'react';
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
  const [search, setSearch] = useState<string>('');
  const [list, setList] = useState(segments);

  useEffect(() => {
    setList(
      segments.filter((segment) => {
        const label = segment.label.toLocaleLowerCase();
        return label.includes(search.trim().toLocaleLowerCase());
      })
    );
  }, [search, segments]);

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function renderAnnotator() {
    if (!list.length) {
      return <div className="mt-4 text-center">{t('common:noDataFound')}</div>;
    }

    return list.map((it) => {
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
    <div className="border rounded border-primary pb-2">
      <div className="p-2 text-center  bg-primary border-bottom">
        <h6 className="text-white">{t('video-detail:annotatorListTitle')}</h6>
      </div>
      <div>
        <FormInput
          value={search}
          onChange={handleSearch}
          className="border-0 border-bottom rounded-0"
          placeholder={t('video-detail:searchForAnnotation')}
        />
      </div>
      <div className={style.annotatorList}>{renderAnnotator()}</div>
      <Button className="mt-2 ml-2" onClick={onAnnotate}>
        {t('video-detail:addNewAnnotatationButton')}
      </Button>
    </div>
  );
};
