import React from 'react';
import { Col, Card, CardBody, CardFooter, CardHeader } from 'shards-react';

import DashboardLayout from 'components/layouts/DashboardLayout';
import PageTitle from 'components/elements/pageTitle';
import { ChangePasswordForm } from './ChangePasswordForm';
import { ProfileForm } from './ProfileForm';
import styles from './style.module.scss';

const Profile = () => {
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
            <ProfileForm />
            <hr />
            <ChangePasswordForm />
          </CardBody>
          <CardFooter className="border-top"></CardFooter>
        </Card>
      </Col>
    </DashboardLayout>
  );
};

export default Profile;
