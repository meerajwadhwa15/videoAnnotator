import React from 'react';
import Head from 'next/head';
import Signup from 'modules/signup';

function Index() {
  return (
    <React.Fragment>
      <Head>
        <title>Video Annotator - Signup</title>
      </Head>
      <Signup />
    </React.Fragment>
  );
}

export default Index;
