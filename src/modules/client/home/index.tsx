import React from 'react';
import ClientLayout from 'components/layouts/ClientLayout';

import { SearchBar } from './SearchBar';
import { VideoList } from './VideoList';

import styles from './style.module.scss';
import { SideBar } from './SideBar';

const Home = () => {
  return (
    <ClientLayout>
      <div className={styles.homeWrapper}>
        <SideBar />
        <div className={styles.videoList}>
          <SearchBar />
          <VideoList />
        </div>
      </div>
    </ClientLayout>
  );
};

export default Home;
