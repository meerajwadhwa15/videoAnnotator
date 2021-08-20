import { GetServerSidePropsContext } from 'next';
import Cookie from 'cookie';
import { v4 as uuidv4 } from 'uuid';
import { storage } from './firebase';
import { i18n } from 'next-i18next';

export const parseContextCookie = (context: GetServerSidePropsContext<any>) => {
  const { req } = context;
  const rawCookie =
    typeof window !== 'undefined' ? document.cookie : req.headers.cookie || '';
  const cookie = Cookie.parse(rawCookie);
  return cookie;
};

export const displayVideoStatus = (status) => {
  switch (status) {
    case 'ASSIGNED':
      return 'Assigned';
    case 'NOT_ASSIGNED':
      return 'Not assign';
    default:
      return 'N/A';
  }
};

/**
 * convert a number of hour, min, second to string with lenght = 2, 1 => '01'
 * @param {number} value
 */
export const convertNumberToStringWithPadStart = (value: number) => {
  return `${value}`.padStart(2, '0');
};

/**
 * convert a seconds to object of time { hour, minute, second }
 * @param {number} seconds
 */
export const convertSecondsToTime = (value: number | undefined) => {
  if (!value || value <= 0) {
    return {
      hour: 0,
      minute: 0,
      second: 0,
    };
  }
  const hour = Math.floor(value / 3600);
  const remainAfterHour = value % 3600;
  const minute = Math.floor(remainAfterHour / 60);
  const second = remainAfterHour % 60;
  return {
    hour,
    minute,
    second,
  };
};

/**
 * convert a seconds to time string hh:mm:ss
 * @param {number} seconds
 */
export const convertSecondsToTimeString = (value: number) => {
  const { hour, minute, second } = convertSecondsToTime(value);
  return `${convertNumberToStringWithPadStart(
    hour
  )}:${convertNumberToStringWithPadStart(
    minute
  )}:${convertNumberToStringWithPadStart(second)}`;
};

/**
 * @param {hour, minute, second}
 */
export const convertTimeValueToSecond = ({
  hour,
  minute,
  second,
}: {
  hour: number;
  minute: number;
  second: number;
}) => {
  const result = hour * 3600 + minute * 60 + second;
  return isNaN(result) ? 0 : result;
};

/**
 * @param {start, end} range: end is always bigger than start
 */
export const checkOverlapTimeRange = (
  range1: { start: number; end: number },
  range2: { start: number; end: number }
) => {
  if (range1.start < range2.start) {
    return range1.end > range2.start;
  } else if (range1.start > range2.start) {
    return range1.start < range2.end;
  }
  return true;
};

export const uploadImage = async (file: File) => {
  try {
    const snap = await storage
      .ref(`annotation/${uuidv4()}-${file.name}`)
      .put(file);
    const url = snap.ref.getDownloadURL();
    return url;
  } catch (error) {
    return null;
  }
};

/**
 * @param {htmlElement} element
 */
export const isElementScrollable = (htmlElement) => {
  const isContentScrollable =
    htmlElement.scrollHeight > htmlElement.clientHeight;
  const overflowYAttr = window.getComputedStyle(htmlElement).overflowY;
  const isOverflowYHidden = overflowYAttr.indexOf('hidden') !== -1;
  return isContentScrollable && !isOverflowYHidden;
};

export const onValidateImg = (file: File) => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    alert(i18n?.t('common:thumbnailImageSizeTooBigError'));
    return false;
  }
  const acceptExtensions = ['png', 'jpg', 'jpeg'];
  const fileExt = file.name.split('.').reverse()[0].toLowerCase();
  if (!acceptExtensions.includes(fileExt)) {
    alert(i18n?.t('common:thumbnailWrongExtensionError'));
    return false;
  }
  return true;
};
