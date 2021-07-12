import { GetServerSideProps } from 'next';
import { requestServer } from 'utils/apiClient';
import { ACCESS_TOKEN } from 'utils/clientCookies';
import { API_ENDPOINT } from 'utils/constants';
import { parseContextCookie } from 'utils/helpers';

export function withNonAuthPage(gssp: GetServerSideProps): GetServerSideProps {
  return async (context) => {
    try {
      const cookie = parseContextCookie(context);
      const accessToken = cookie[ACCESS_TOKEN];
      const user = await requestServer.get({
        url: API_ENDPOINT.profile,
        context,
      });
      if (accessToken && user) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
          props: {},
        };
      } else {
        const gsspData = await gssp(context);
        return gsspData;
      }
    } catch {
      const gsspData = await gssp(context);
      return gsspData;
    }
  };
}
