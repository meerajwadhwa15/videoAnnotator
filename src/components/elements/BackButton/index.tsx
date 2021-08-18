import { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import styles from './style.module.scss';

const BackButton: FC = () => {
  const { t } = useTranslation(['common']);
  const router = useRouter();

  return (
    <button className={styles.button} onClick={() => router.back()}>
      <i className="material-icons">arrow_back_ios</i>
      {t('backButton')}
    </button>
  );
};

export default BackButton;
