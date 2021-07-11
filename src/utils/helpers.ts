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
