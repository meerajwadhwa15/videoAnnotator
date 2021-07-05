import React from 'react';

import DashboardLayout from 'components/layouts/DashboardLayout';
import PageTitle from 'components/elements/pageTitle';
// import styles from './style.module.scss';

const Home = () => {
  return (
    <DashboardLayout>
      <PageTitle
        title="Videos"
        subtitle="Videos"
        className="text-sm-left mb-3"
      />
    </DashboardLayout>
  );
};

export default Home;
