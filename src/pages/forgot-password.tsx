import React from 'react';
import Head from 'next/head';
import ForgotPassword from 'modules/forgotPassword';

function Index() {
  return (
    <React.Fragment>
      <Head>
        <title>Video Annotator - Forgot Password</title>
      </Head>
      <ForgotPassword />
    </React.Fragment>
  );
}

export default Index;
