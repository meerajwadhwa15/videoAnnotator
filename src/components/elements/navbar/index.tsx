import React, { useState } from 'react';
import {
  Container,
  Navbar,
  Form,
  InputGroup,
  FormInput,
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
import Image from 'next/image';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { toggleSidebar } from 'components/elements/slice';
import { userDataSelector } from 'redux/globalSlice';
import { removeAuthorizationHeader } from 'utils/apiClient';
import { clientCookies } from 'utils/clientCookies';
import styles from './style.module.scss';

const MainNavbar = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const { fullName } = useAppSelector(userDataSelector);

  function onToggleSidebar() {
    dispatch(toggleSidebar(true));
  }

  function handleLogout() {
    clientCookies.deleteSession();
    removeAuthorizationHeader();
    push('/login');
  }

  return (
    <div className={styles.mainNavbar}>
      <Container fluid className="p-0">
        <Navbar type="light" className={styles.navbar}>
          {/* Navbar search */}
          <Form className={`d-none d-md-flex d-lg-flex ${styles.form}`}>
            <InputGroup seamless>
              <FormInput
                style={{ border: 'none' }}
                className="navbar-search"
                placeholder="Search..."
              />
            </InputGroup>
          </Form>
          {/* Navbar user actions */}
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
              <DropdownToggle
                caret
                tag={NavLink}
                className="dropdownNavbar text-nowrap px-3"
              >
                <Image
                  className={`user-avatar rounded-circle mr-2 ${styles.img}`}
                  src="/images/avatar-default.jpg"
                  width={40}
                  height={40}
                  alt="User Avatar"
                />
                <span className={`d-md-inline-block ${styles.textToggle}`}>
                  {fullName}
                </span>
              </DropdownToggle>
              <Collapse
                tag={DropdownMenu}
                right
                small
                open={visible}
                className={styles.dropdownMenu}
              >
                <DropdownItem tag={NavLink} href="/profile">
                  Profile
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={handleLogout} className="text-danger">
                  Logout
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
