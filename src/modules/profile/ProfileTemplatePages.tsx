import React from 'react';
import {
  Col,
  Card,
  CardBody,
  CardFooter,
  Nav,
  NavItem,
  NavLink,
  CardHeader,
} from 'shards-react';

import DashboardLayout from 'components/layouts/DashboardLayout';
import PageTitle from 'components/elements/pageTitle';
import { ChangePasswordForm } from './ChangePasswordForm';
import { ProfileForm } from './ProfileForm';
import styles from './style.module.scss';

export const ProfileTemplate = () => {
  return (
    <DashboardLayout>
      {/* Page Title */}
      <PageTitle title="User Profile" subtitle="Profile" />
      {/* User Profile */}
      <Col lg="8" className="mt-4">
        <Card small className="edit-user-details mb-4">
          {/* Profile Photo */}
          <CardHeader className="p-0">
            <div className={styles.editProfileheadbg}></div>
          </CardHeader>

          <CardBody className="p-0">
            <div className="border-bottom clearfix d-flex">
              <Nav tabs className="border-0 mt-auto mx-4 pt-2">
                <NavItem>
                  <NavLink active>General</NavLink>
                </NavItem>
              </Nav>
            </div>
            {/* Form Section Title :: My profile */}
            <ProfileForm />
            <hr />
            {/* Change Password form */}
            <ChangePasswordForm />
          </CardBody>
          <CardFooter className="border-top"></CardFooter>
        </Card>
      </Col>
    </DashboardLayout>
  );
};
