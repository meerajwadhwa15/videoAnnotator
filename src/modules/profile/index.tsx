import React from 'react';
import { useAppSelector } from 'redux/hooks';
import Image from 'next/image';

import DashboardLayout from 'components/layouts/DashboardLayout';
import { userDataSelector } from 'redux/globalSlice';

import isEmpty from 'lodash/isEmpty';
import { UserRole } from 'models/user.model';
import PageTitle from 'components/elements/pageTitle';

const Profile = () => {
  const userData = useAppSelector(userDataSelector);
  const { fullName, email, roles } = userData;

  const renderContent = () => {
    if (isEmpty(userData)) {
      return null;
    }
    const isAdmin = roles.includes(UserRole.admin);
    return (
      <div className="d-flex flex-column">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <Image
              className={`user-avatar rounded-circle`}
              src="/images/avatar-default.jpg"
              width={120}
              height={120}
              alt="User Avatar"
            />
          </li>
          <li className="list-group-item">
            <i>Full Name: </i>
            <strong className="mr-1">{fullName}</strong>
          </li>
          <li className="list-group-item">
            <i>Title: </i>
            {isAdmin ? (
              <span className="badge badge-primary">Admin</span>
            ) : (
              <span className="badge badge-secondary">Member</span>
            )}
          </li>
          <li className="list-group-item">
            <i>Email: </i>
            <strong>{email}</strong>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="d-flex flex-column justify-content-center">
        <PageTitle title="Profile" subtitle="" />
        {renderContent()}
      </div>
    </DashboardLayout>
  );
};

export default Profile;
