import { GetServerSideProps } from 'next';
import Cookie from 'cookie';
import { ACCESS_TOKEN } from 'utils/clientCookies';

export function withAuthPage(gssp: GetServerSideProps): GetServerSideProps {
  return async (context) => {
    const { req } = context;
    const rawCookie = process.browser
      ? document.cookie
      : req.headers.cookie || '';
    const cookie = Cookie.parse(rawCookie);
    const accessToken = cookie[ACCESS_TOKEN];
    if (!accessToken) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
    return await gssp(context);
  };
}
