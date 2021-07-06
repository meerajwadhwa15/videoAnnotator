import ForgotPassword from 'modules/forgotPassword';
import Head from 'next/head';

function Index() {
  return (
    <>
      <Head>
        <title>Video Annotator - Forgot Password</title>
      </Head>
      <ForgotPassword />
    </>
  );
}

export default Index;
