import React from 'react';
import ClientLayout from 'components/layouts/ClientLayout';

import { SearchBar } from './SearchBar';
import { VideoList } from './VideoList';

import styles from './style.module.scss';
import { SideBar } from './SideBar';
import { useTranslation } from 'next-i18next';

const Home = () => {
  const { t } = useTranslation();
  return (
    <ClientLayout>
      <div className={styles.homeWrapper}>
        <SideBar />
        <div className={styles.videoList}>
          <h1 className="mb-2">{t('client-home:discoverAllVideos')}</h1>
          <SearchBar />
          <VideoList />
        </div>
      </div>
    </ClientLayout>
  );
};

export default Home;
