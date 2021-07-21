import React from 'react';
import classNames from 'classnames';
import { Col, Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'shards-react';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { useTranslation } from 'next-i18next';

import { isSidebarOpen, toggleSidebar } from 'components/elements/slice';
import styles from './style.module.scss';

const Sidebar = () => {
  const { t } = useTranslation(['common']);
  const sidebarVisible = useAppSelector(isSidebarOpen);
  const dispatch = useAppDispatch();
  const classes = classNames(
    styles.mainSidebar,
    'px-0',
    'col-12',
    sidebarVisible && styles.menuOpen
  );
  const items = [
    {
      title: 'Dashboards',
      items: [
        {
          title: t('videoListLink'),
          to: '/',
          htmlBefore: '<i class="material-icons">videocam</i>',
          htmlAfter: '',
        },
        {
          title: t('profileLink'),
          to: '/profile',
          htmlBefore: '<i class="material-icons">person</i>',
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
          <span>{t('appTitle')}</span>
        </NavbarBrand>
        <a
          className={`${styles.toggleSidebar} d-sm-inline d-md-none d-lg-none`}
          onClick={onToggleSidebar}
        >
          <i className="material-icons">arrow_back</i>
        </a>
      </Navbar>
      {/* Navbar items */}
      <div className={styles.navWrapper}>
        {items.map((nav, index) => (
          <div key={index}>
            <h6 className={styles.navTitle}>{nav.title}</h6>
            {typeof nav.items !== 'undefined' && nav.items.length && (
              <Nav className={styles.navUlWrapper}>
                {nav.items.map((item, index) => (
                  <NavItem key={index} style={{ position: 'relative' }}>
                    <NavLink href={item.to} className={styles.navLink}>
                      {item.htmlBefore && (
                        <div
                          className={styles.itemIconWrapper}
                          dangerouslySetInnerHTML={{ __html: item.htmlBefore }}
                        />
                      )}
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
