import React from 'react';
import Head from 'next/head';
import Profile from 'modules/profile';

function Index() {
  return (
    <React.Fragment>
      <Head>
        <title>Video Annotator - Profile</title>
      </Head>
      <Profile />
    </React.Fragment>
  );
}

export default Index;
