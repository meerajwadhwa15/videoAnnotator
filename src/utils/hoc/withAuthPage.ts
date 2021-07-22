import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { requestServer } from 'utils/apiClient';
import { ACCESS_TOKEN } from 'utils/clientCookies';
import { parseContextCookie } from 'utils/helpers';
import { API_ENDPOINT, ADMIN_ROUTING } from 'utils/constants';

export function withAuthPage(
  gssp: (context: GetServerSidePropsContext, user?: any) => any
): GetServerSideProps {
  const redirectPayload = {
    redirect: {
      destination: ADMIN_ROUTING.login,
      permanent: false,
    },
  };
  return async (context: GetServerSidePropsContext<any>) => {
    const cookie = parseContextCookie(context);
    const accessToken = cookie[ACCESS_TOKEN];
    if (!accessToken) {
      return redirectPayload;
    }

    try {
      const user = await requestServer.get({
        url: API_ENDPOINT.profile,
        context,
      });
      const gsspData = await gssp(context, user);

      return {
        ...gsspData,
        props: {
          ...(gsspData.props || {}),
          user,
        },
      };
    } catch (error) {
      // clear user cookie
      context.res.setHeader('set-cookie', '');
      return redirectPayload;
    }
  };
}
