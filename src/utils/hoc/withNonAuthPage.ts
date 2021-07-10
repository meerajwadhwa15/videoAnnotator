// import { GetServerSideProps } from 'next';
// import { parseContextCookie } from 'utils/helpers';
import { clientCookies } from 'utils/clientCookies';

export function withNonAuthPage(props) {
  const redirectPayload = {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
  // return async (context) => {
  // const cookie = parseContextCookie(context);
  // const accessToken = cookie[ACCESS_TOKEN];
  const accessToken = clientCookies.getToken();
  if (accessToken) {
    return redirectPayload;
  }
  return { ...props };
  // try {
  // const gsspData: any = await gssp(context);
  // return {
  // 	...gsspData,
  // };
  // } catch (error) {
  // 	return redirectPayload;
  // }
  // };
  // };
}
