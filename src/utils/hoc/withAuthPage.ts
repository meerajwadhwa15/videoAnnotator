import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { UserRole } from 'models/user.model';
import { requestServer } from 'utils/apiClient';
import { ACCESS_TOKEN } from 'utils/clientCookies';
import { parseContextCookie } from 'utils/helpers';
import { API_ENDPOINT } from 'utils/constants';

export function withAuthPage(gssp: GetServerSideProps): GetServerSideProps {
  const redirectPayload = {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
  return async (context: GetServerSidePropsContext<any>) => {
    const currentPath = context.resolvedUrl;
    const cookie = parseContextCookie(context);
    const accessToken = cookie[ACCESS_TOKEN];
    if (!accessToken) {
      return redirectPayload;
    }

    try {
      let videosList: any = null;
      let usersList: any = null;
      let videoDetail: any = null;
      const user = await requestServer.get({
        url: API_ENDPOINT.profile,
        context,
      });
      if (currentPath == '/') {
        if (
          Array.isArray(user['roles']) &&
          user['roles'].includes(UserRole.admin)
        ) {
          usersList = await requestServer.get({
            url: API_ENDPOINT.usersList,
            context,
          });
        }

        videosList = await requestServer.get({
          url: API_ENDPOINT.videosList,
          context,
        });
      }

      if (currentPath.includes('video-detail')) {
        const { id } = context.params;
        videoDetail = await requestServer.get({
          url: `${API_ENDPOINT.videoDetail}/${id}`,
          context,
        });
      }
      const gsspData: any = await gssp(context);

      return {
        ...gsspData,
        props: {
          ...(gsspData.props || {}),
          user,
          videosList,
          usersList,
          videoDetail,
        },
      };
    } catch (error) {
      return redirectPayload;
    }
  };
}
