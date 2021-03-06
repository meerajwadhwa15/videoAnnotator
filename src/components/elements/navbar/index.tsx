import React, { useState } from 'react';
import {
  Container,
  Navbar,
  Nav,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink,
} from 'shards-react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { toggleSidebar } from 'components/elements/slice';
import { userDataSelector } from 'redux/globalSlice';
import { removeAuthorizationHeader } from 'utils/apiClient';
import { clientCookies } from 'utils/clientCookies';
import { ADMIN_ROUTING } from 'utils/constants';
import styles from './style.module.scss';
import classNames from 'classnames';

const MainNavbar = () => {
  const { t } = useTranslation(['common']);
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { fullName, avatar } = useAppSelector(userDataSelector);

  function onToggleSidebar() {
    dispatch(toggleSidebar(true));
  }

  function handleLogout() {
    clientCookies.deleteSession();
    removeAuthorizationHeader();
    router.push(ADMIN_ROUTING.login, undefined, { locale: router.locale });
  }

  return (
    <div className={styles.mainNavbar}>
      <Container fluid className="p-0 d-flex">
        <Navbar type="light" className={classNames(styles.navbar, 'ml-auto')}>
          <Nav
            navbar
            className="border-left flex-row"
            style={{ cursor: 'pointer' }}
          >
            <NavItem
              tag={Dropdown}
              caret
              toggle={() => {
                setVisible(!visible);
              }}
            >
              <DropdownToggle tag={NavLink} className="px-3">
                <div className="d-flex">
                  <img
                    className={`user-avatar mr-2 ${styles.img}`}
                    src={avatar || '/images/avatar-default.jpg'}
                    alt="avatar"
                  />
                  <span className="d-flex align-items-center">
                    <span className="mr-2 font-weight-bold">{fullName}</span>
                    <i className="material-icons" style={{ fontSize: 24 }}>
                      arrow_drop_down
                    </i>
                  </span>
                </div>
              </DropdownToggle>
              <Collapse
                tag={DropdownMenu}
                right
                small
                open={visible}
                className={styles.dropdownMenu}
              >
                <div className="dropdown-item">
                  <Link href={ADMIN_ROUTING.profile} locale={router.locale}>
                    <a className="d-block">{t('profileLink')}</a>
                  </Link>
                </div>
                <DropdownItem divider />
                <DropdownItem onClick={handleLogout} className="text-danger">
                  {t('logoutLink')}
                </DropdownItem>
              </Collapse>
            </NavItem>
          </Nav>
          {/* Navbar toggle */}
          <nav className={`${styles.toggleNav} nav`}>
            <a
              href="#"
              onClick={onToggleSidebar}
              className="nav-link nav-link-icon toggle-sidebar d-sm-inline d-md-none d-lg-none text-center"
            >
              <i className="material-icons">menu</i>
            </a>
          </nav>
        </Navbar>
      </Container>
    </div>
  );
};

export default MainNavbar;
