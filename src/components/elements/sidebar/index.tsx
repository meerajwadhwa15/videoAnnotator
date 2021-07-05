import React from 'react';
import classNames from 'classnames';
import { Col, Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'shards-react';
import { useAppSelector, useAppDispatch } from 'redux/hooks';

import { isSidebarOpen, toggleSidebar } from 'components/elements/slice';
import styles from './style.module.scss';

const Sidebar = () => {
	const sidebarVisible = useAppSelector(isSidebarOpen);
	const dispatch = useAppDispatch();
  const classes = classNames(styles.mainSidebar, 'px-0', 'col-12', sidebarVisible && styles.menuOpen);
  const items = [
    {
      title: 'Dashboards',
      items: [
        {
          title: 'Dashboard',
          to: '/',
          htmlBefore: '<i class="material-icons">&#xE917;</i>',
          htmlAfter: '',
        },
        {
          title: 'Login',
          to: '/login',
          htmlBefore: '<i class="material-icons">&#xE8D1;</i>',
          htmlAfter: '',
        },
        {
          title: 'Signup',
          to: '/signup',
          htmlBefore: '<i class="material-icons">edit</i>',
          htmlAfter: '',
        },
      ],
    },
  ];

  function onToggleSidebar() {
    dispatch(toggleSidebar(false));
  }

  return (
    <Col tag="aside" className={classes} lg={{ size: 2 }} md={{ size: 3 }}>
      {/* Navbar brand */}
        <Navbar className={styles.navbar} type="light">
          <NavbarBrand className={styles.navbarBrand} href="/">
            <span>Video Annotator Dashboard</span>
          </NavbarBrand>
          <a className={`${styles.toggleSidebar} d-sm-inline d-md-none d-lg-none`} onClick={onToggleSidebar}>
            {/* <i className="material-icons">&#xE5C4;</i> */}
						Toggle
          </a>
        </Navbar>
      {/* Navbar items */}
      <div className={styles.navWrapper}>
        {items.map((nav, idx) => (
          <div key={idx}>
            <h6 className={styles.navTitle}>{nav.title}</h6>
            {typeof nav.items !== 'undefined' && nav.items.length && (
              <Nav className={styles.navUlWrapper}>
                {nav.items.map((item, idx) => (
                  <NavItem key={idx} style={{ position: 'relative' }}>
                    <NavLink href={item.to} className={styles.navLink}>
                      {item.title && <span>{item.title}</span>}
                    </NavLink>
                  </NavItem>
                ))}
              </Nav>
            )}
          </div>
        ))}
      </div>
    </Col>
  );
};

export default Sidebar;
