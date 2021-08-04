import React, { FC } from 'react';
import { Container, Row } from 'shards-react';
import { useTranslation } from 'next-i18next';
import classnames from 'classnames';
import styles from './style.module.scss';
import { Languages } from './Languages';

interface Item {
  title: string;
  to: string;
}

interface Props {
  menuItems?: Item[];
  copyright?: string;
}

const Footer: FC<Props> = () => {
  const { t } = useTranslation(['common']);

  return (
    <footer
      className={classnames(
        'main-footer d-flex p-2 px-3 bg-white border-top',
        styles.footer
      )}
    >
      <Container fluid={false}>
        <Row>
          <Languages />
          <div className={styles.copyright}>{t('footerCopyright')}</div>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
