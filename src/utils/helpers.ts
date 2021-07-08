import { GetServerSidePropsContext } from 'next';
import Cookie from 'cookie';

export const parseContextCookie = (context: GetServerSidePropsContext<any>) => {
  const { req } = context;
  const rawCookie = process.browser
    ? document.cookie
    : req.headers.cookie || '';
  const cookie = Cookie.parse(rawCookie);
  return cookie;
};
