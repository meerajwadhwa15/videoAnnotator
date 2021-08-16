import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { requestServer } from 'utils/apiClient';
import { API_ENDPOINT } from 'utils/constants';

export function withAuthConsumerPage(
  gssp: (context: GetServerSidePropsContext, user?: any) => any
): GetServerSideProps {
  return async (context: GetServerSidePropsContext<any>) => {
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
      return await gssp(context);
    }
  };
}
