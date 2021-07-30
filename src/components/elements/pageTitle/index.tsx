import React, { FC } from 'react';
import { Col } from 'shards-react';

import styles from './style.module.scss';

interface Props {
  title: string;
  subtitle?: string;
}

const PageTitle: FC<Props> = ({ title, subtitle, ...attrs }) => {
  return (
    <Col xs="12" {...attrs} style={{ marginBottom: '20px' }}>
      {subtitle && <span className="page-title">{subtitle}</span>}
      <h3 className={styles.title}>{title}</h3>
    </Col>
  );
};

export default PageTitle;
