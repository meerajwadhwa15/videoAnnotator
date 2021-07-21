import React, { FC } from 'react';
import { Container, Row, Nav, NavItem, NavLink } from 'shards-react';
import { useTranslation } from 'next-i18next';

import styles from './style.module.scss';

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
  const menuItems = [
    {
      title: t('footerLink1'),
      to: '#',
    },
    {
      title: t('footerLink2'),
      to: '#',
    },
    {
      title: t('footerLink3'),
      to: '#',
    },
    {
      title: t('footerLink4'),
      to: '#',
    },
  ];

  return (
    <footer className="main-footer d-flex p-2 px-3 bg-white border-top">
      <Container fluid={false}>
        <Row>
          <Nav className={styles.nav}>
            {menuItems?.map((item, idx) => (
              <NavItem key={idx}>
                <NavLink to={item.to}>{item.title}</NavLink>
              </NavItem>
            ))}
          </Nav>
          <div className={styles.copyright}>{t('footerCopyright')}</div>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
