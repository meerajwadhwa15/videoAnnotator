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
import Image from 'next/image';
import styles from './style.module.scss';

const MainNavbar = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.mainNavbar}>
      <Container fluid className="p-0">
        <Navbar type="light" className={styles.navbar}>
          {/* Navbar search */}
          <Form className="w-100 d-none d-md-flex d-lg-flex">
            <InputGroup seamless>
              <FormInput
                style={{ border: 'none' }}
                className="navbar-search"
                placeholder="Search..."
              />
            </InputGroup>
          </Form>
          {/* Navbar user actions */}
          <Nav navbar className="border-left flex-row" style={{ cursor: 'pointer' }}>
            <NavItem
              tag={Dropdown}
              caret
              toggle={() => {
                setVisible(!visible);
              }}
            >
              <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
                <Image
                  className={`user-avatar rounded-circle mr-2 ${styles.img}`}
                  src="/images/1.jpg"
                  width={30}
                  height={30}
                  alt="User Avatar"
                />
                <span className="d-none d-md-inline-block">Phuongdk</span>
              </DropdownToggle>
              <Collapse
                tag={DropdownMenu}
                right
                small
                open={visible}
                className={styles.dropdownMenu}
              >
                <DropdownItem to="/">Profile</DropdownItem>
                <DropdownItem divider />
                <DropdownItem to="/" className="text-danger">
                  Logout
                </DropdownItem>
              </Collapse>
            </NavItem>
          </Nav>
        </Navbar>
      </Container>
    </div>
  );
};

export default MainNavbar;
