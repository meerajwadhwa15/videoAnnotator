import React, { FC } from 'react';
import { Container, Row, Nav, NavItem, NavLink } from 'shards-react';

import styles from './style.module.scss';

interface Item {
  title: string;
  to: string;
}

interface Props {
  menuItems?: Item[];
  copyright?: string;
}

const Footer: FC<Props> = ({ menuItems, copyright }) => (
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
        <div className={styles.copyright}>{copyright}</div>
      </Row>
    </Container>
  </footer>
);

Footer.defaultProps = {
  copyright: 'Copyright © 2021 Video Annotator',
  menuItems: [
    {
      title: 'Home',
      to: '#',
    },
    {
      title: 'Services',
      to: '#',
    },
    {
      title: 'Contacts',
      to: '#',
    },
    {
      title: 'About Us',
      to: '#',
    },
  ],
};

export default Footer;
