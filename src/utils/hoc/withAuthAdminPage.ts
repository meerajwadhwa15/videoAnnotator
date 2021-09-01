import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { requestServer } from 'utils/apiClient';
import { ACCESS_TOKEN } from 'utils/clientCookies';
import { parseContextCookie } from 'utils/helpers';
import { API_ENDPOINT, ADMIN_ROUTING } from 'utils/constants';
import { AppStore, wrapper } from 'redux/store';
import { setCurrentLoginUser } from 'redux/globalSlice';

export function withAuthAdminPage(
  gssp: (
    context: GetServerSidePropsContext,
    user?: any,
    store?: AppStore
  ) => any
): GetServerSideProps {
  const redirectPayload = {
    redirect: {
      destination: ADMIN_ROUTING.login,
      permanent: false,
    },
  };
  return wrapper.getServerSideProps(
    (store) => async (context: GetServerSidePropsContext<any>) => {
      const cookie = parseContextCookie(context);
      const accessToken = cookie[ACCESS_TOKEN];
      if (!accessToken) {
        return redirectPayload;
      }

      try {
        let user: any = store.getState().app.user;
        if (!user?.email) {
          user = await requestServer.get({
            url: API_ENDPOINT.profile,
            context,
          });
          store.dispatch(setCurrentLoginUser(user));
        }
        return await gssp(context, user, store);
      } catch (error) {
        context.res.setHeader('set-cookie', '');
        return redirectPayload;
      }
    }
  );
}
