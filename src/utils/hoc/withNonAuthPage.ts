import { GetServerSideProps } from 'next';
import { ACCESS_TOKEN } from 'utils/clientCookies';
import { parseContextCookie } from 'utils/helpers';

export function withNonAuthPage(gssp: GetServerSideProps): GetServerSideProps {
  return async (context) => {
    const cookie = parseContextCookie(context);
    const accessToken = cookie[ACCESS_TOKEN];
    if (accessToken) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
        props: {},
      };
    }
    const gsspData = await gssp(context);
    return gsspData;
  };
}
