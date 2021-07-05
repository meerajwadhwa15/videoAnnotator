import React, { FC } from 'react';
import { Container, Row, Nav, NavItem, NavLink } from 'shards-react';

interface Item {
	title: string,
	to: string,
}

interface Props {
  menuItems?: Item[];
  copyright?: string;
}

const Footer: FC<Props> = ({ menuItems, copyright }) => (
  <footer className="main-footer d-flex p-2 px-3 bg-white border-top">
    <Container fluid={false}>
      <Row>
        <Nav>
          {menuItems?.map((item, idx) => (
            <NavItem key={idx}>
              <NavLink to={item.to}>{item.title}</NavLink>
            </NavItem>
          ))}
        </Nav>
        <span className="copyright ml-auto my-auto mr-2">{copyright}</span>
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
      title: 'Page1',
      to: '#',
    },
    {
      title: 'Page2',
      to: '#',
    },
    {
      title: 'Page3',
      to: '#',
    },
  ],
};

export default Footer;
