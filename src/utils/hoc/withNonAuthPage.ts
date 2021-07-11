import { GetStaticProps, GetStaticPropsContext } from 'next';
import { clientCookies } from 'utils/clientCookies';

export function withNonAuthPage(gsp: GetStaticProps): GetStaticProps {
  const redirectPayload = {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };

  return async (context: GetStaticPropsContext<any>) => {
    if (clientCookies.getToken()) {
      return redirectPayload;
    }

    const gspData: any = await gsp(context);

    return {
      ...gspData,
      props: {
        ...(gspData.props || {}),
      },
    };
  };
}
