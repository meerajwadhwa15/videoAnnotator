import { GetServerSideProps } from 'next';
import { parseContextCookie } from 'utils/helpers';
import { ACCESS_TOKEN } from 'utils/clientCookies';
import { requestServer } from 'utils/apiClient';
import { UserRole } from 'models/user.model';

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
      let usersList: any = [];
      const user = await requestServer.get({
        url: 'user/current',
        context,
      });

      if (
        Array.isArray(user['roles']) &&
        user['roles'].includes(UserRole.admin)
      ) {
        usersList = await requestServer.get({
          url: 'user/list',
          context,
        });
      }

      const videosList = await requestServer.get({
        url: 'video/list',
        context,
      });
      const gsspData: any = await gssp(context);

      return {
        ...gsspData,
        props: {
          ...(gsspData.props || {}),
          user,
          videosList,
          usersList,
        },
      };
    } catch (error) {
      return redirectPayload;
    }
  };
}
