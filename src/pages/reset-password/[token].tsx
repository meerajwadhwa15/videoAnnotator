import React from 'react';
import Head from 'next/head';
import ResetPassword from 'modules/resetPassword';

function Index() {
  return (
    <React.Fragment>
      <Head>
        <title>Video Annotator - Reset Password</title>
      </Head>
      <ResetPassword />
    </React.Fragment>
  );
}

export default Index;
