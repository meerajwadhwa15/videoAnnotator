import { GetServerSidePropsContext } from 'next';
import Cookie from 'cookie';

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
 * convert a seconds to time string hh:mm:ss
 * @param {number} seconds
 */
export const convertSecondsToTimeString = (value: number): string => {
  if (value <= 0) {
    return '00:00:00';
  }
  const hour = Math.floor(value / 3600);
  const remainAfterHour = value % 3600;
  const minutes = Math.floor(remainAfterHour / 60);
  const seconds = remainAfterHour % 60;
  return `${convertNumberToStringWithPadStart(
    hour
  )}:${convertNumberToStringWithPadStart(
    minutes
  )}:${convertNumberToStringWithPadStart(seconds)}`;
};
