import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { AppStore, wrapper } from 'redux/store';
import { requestServer } from 'utils/apiClient';
import { ACCESS_TOKEN } from 'utils/clientCookies';
import { API_ENDPOINT, ADMIN_ROUTING } from 'utils/constants';
import { parseContextCookie } from 'utils/helpers';

export function withNonAuthPage(
  gssp: (context: GetServerSidePropsContext, store?: AppStore) => any
): GetServerSideProps {
  return wrapper.getServerSideProps((store) => async (context) => {
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
            destination: ADMIN_ROUTING.home,
            permanent: false,
          },
          props: {},
        };
      } else {
        const gsspData = await gssp(context, store);
        return gsspData;
      }
    } catch {
      const gsspData = await gssp(context, store);
      return gsspData;
    }
  });
}
