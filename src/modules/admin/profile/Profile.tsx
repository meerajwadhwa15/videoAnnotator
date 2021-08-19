import React, { useEffect } from 'react';
import { Col, Card, CardBody, CardFooter, CardHeader } from 'shards-react';
import { useTranslation } from 'next-i18next';

import PageTitle from 'components/elements/pageTitle';
import { ChangePasswordForm } from './ChangePasswordForm';
import { ProfileForm } from './ProfileForm';
import styles from './style.module.scss';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { clearMessage, messageSelector } from './slice';
import { toast } from 'react-toastify';
import { AlertMessageType } from 'utils/types';

export const Profile = () => {
  const message = useAppSelector(messageSelector);
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['profile']);

  useEffect(() => {
    if (message.type === AlertMessageType.success) {
      toast.success(message.text);
    } else if (message.type === AlertMessageType.error) {
      toast.error(message.text);
    }

    return () => {
      dispatch(clearMessage());
    };
  }, [message, dispatch]);

  return (
    <>
      <PageTitle title={t('title')} />
      <Col lg="8" className="mt-4">
        <Card small className="edit-user-details mb-4">
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
    </>
  );
};
