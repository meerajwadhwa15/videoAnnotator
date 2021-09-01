import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { setCurrentLoginUser } from 'redux/globalSlice';
import { AppStore, wrapper } from 'redux/store';
import { requestServer } from 'utils/apiClient';
import { API_ENDPOINT } from 'utils/constants';

export function withAuthConsumerPage(
  gssp: (
    context: GetServerSidePropsContext,
    store?: AppStore,
    user?: any
  ) => any
): GetServerSideProps {
  return wrapper.getServerSideProps(
    (store) => async (context: GetServerSidePropsContext<any>) => {
      try {
        let user: any = store.getState().app.user;
        if (!user?.email) {
          user = await requestServer.get({
            url: API_ENDPOINT.profile,
            context,
          });
          store.dispatch(setCurrentLoginUser(user));
        }
        return await gssp(context, store, user);
      } catch (error) {
        return await gssp(context, store);
      }
    }
  );
}
