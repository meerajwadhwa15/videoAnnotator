import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  checkOverlapTimeRange,
  convertSecondsToTime,
  convertTimeValueToSecond,
} from 'utils/helpers';
import { dispatchCreateSegment, dispatchEditSegment } from './actions';
import { edittingSegmentSelector, videoDetailSelector } from './slice';

export const useAnnotationForm = ({ videoDuration }) => {
  const { t } = useTranslation(['video-detail']);
  const dispatch = useAppDispatch();
  const videoDetail = useAppSelector(videoDetailSelector);
  const edittingSegment = useAppSelector(edittingSegmentSelector);
  const {
    query: { id: videoId },
  } = useRouter();
  const form = useFormik({
    initialValues: {
      label: edittingSegment ? edittingSegment.label : '',
      startFrame: convertSecondsToTime(edittingSegment?.startFrame),
      endFrame: convertSecondsToTime(edittingSegment?.endFrame),
      thumbnail: edittingSegment ? edittingSegment.thumbnail : '',
    },
    enableReinitialize: true,
    validate(values) {
      const errors: Record<string, string> = {};
      const { label, startFrame, endFrame, thumbnail } = values;
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
      if (!thumbnail) {
        errors.thumbnail = t('video-detail:thumbnailRequiredError');
      }
      return errors;
    },
    onSubmit(values) {
      const { label, startFrame, endFrame, thumbnail } = values;
      const data = {
        id: edittingSegment?.id,
        videoId,
        label,
        thumbnail,
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
  return form;
};
