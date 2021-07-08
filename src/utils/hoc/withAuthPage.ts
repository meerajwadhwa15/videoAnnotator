import { GetServerSideProps } from 'next';
import { parseContextCookie } from 'utils/helpers';
import { ACCESS_TOKEN } from 'utils/clientCookies';
import { requestServer } from 'utils/apiClient';

export function withAuthPage(gssp: GetServerSideProps): GetServerSideProps {
  const redirectPayload = {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
  return async (context) => {
    const cookie = parseContextCookie(context);
    const accessToken = cookie[ACCESS_TOKEN];
    if (!accessToken) {
      return redirectPayload;
    }
    try {
      const user = await requestServer.get({
        url: 'user/current',
        context,
      });
      const gsspData: any = await gssp(context);
      return {
        ...gsspData,
        props: {
          ...(gsspData.props || {}),
          user,
        },
      };
    } catch (error) {
      return redirectPayload;
    }
  };
}
