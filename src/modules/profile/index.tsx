import React from 'react';
import { useAppSelector } from 'redux/hooks';
import Image from 'next/image';

import DashboardLayout from 'components/layouts/DashboardLayout';
import PageTitle from 'components/elements/pageTitle';
import { userDataSelector } from 'redux/globalSlice';

import isEmpty from 'lodash/isEmpty';
import { UserRole } from 'models/user.model';

const Profile = () => {
  const userData = useAppSelector(userDataSelector);

  const renderContent = () => {
    if (isEmpty(userData)) {
      return null;
    }
    const { fullName, email, roles } = userData;
    const isAdmin = roles.includes(UserRole.admin);
    return (
      <div className="d-flex flex-column">
        <div>
          <Image
            className={`user-avatar rounded-circle`}
            src="/images/1.jpg"
            width={100}
            height={100}
            alt="User Avatar"
          />
        </div>
        <div className="mt-4">
          <p>
            <i>Full Name: </i>
            <strong className="mr-1">{fullName}</strong>
            {isAdmin ? (
              <span className="badge badge-primary">Admin</span>
            ) : (
              <span className="badge badge-secondary">Member</span>
            )}
          </p>
          <p>
            <i>Email Address: </i>
            <strong>{email}</strong>
          </p>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="d-flex flex-column justify-content-center">
        <PageTitle title="User Profile" subtitle="Profile" />
        {renderContent()}
      </div>
    </DashboardLayout>
  );
};

export default Profile;
