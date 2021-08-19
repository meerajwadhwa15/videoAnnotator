import { useTranslation } from 'next-i18next';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

import { Col, Modal, ModalBody, ModalHeader } from 'shards-react';
import { onValidateImg } from 'utils/helpers';
import { CropImg } from './CropImg';
import { updateUserProfile } from './slice';

export const Avatar = () => {
  const { t } = useTranslation(['profile', 'common']);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.app.user);
  const [open, setOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState<string | ArrayBuffer>('');

  const toggle = () => setOpen(!open);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (onValidateImg(file)) {
      const reader = new FileReader();
      reader.addEventListener('load', function (e) {
        const url = e.target?.result || '';
        setImgUrl(url);
      });
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const onUpdateAvatar = (avatar: string) => {
    setOpen(false);
    dispatch(
      updateUserProfile({
        ...user,
        avatar,
      })
    );
  };

  const onCancel = () => {
    if (window.confirm(t('common:confirmToCancel'))) {
      toggle();
    }
  };

  return (
    <Col lg="4">
      <label htmlFor="userProfilePicture" className="text-center w-100 mb-4">
        {t('avatarLabel')}
      </label>
      <div className="edit-user-details__avatar">
        <img
          className="rounded-circle cursor-pointer"
          src={user.avatar || '/images/avatar-default.jpg'}
          alt="User Avatar"
        />
        <div onClick={toggle} className="overlay justify-content-center pt-1">
          {t('common:editButton')}
        </div>
      </div>
      <Modal
        className="d-flex align-items-center"
        open={open}
        toggle={onCancel}
      >
        <ModalHeader>{t('profile:updateAvatar')}</ModalHeader>
        <ModalBody className="modal-body">
          <div>
            {imgUrl ? (
              <CropImg
                onUpload={onUpdateAvatar}
                onCancel={() => setImgUrl('')}
                url={imgUrl}
              />
            ) : (
              <div
                className="dropzone d-flex justify-content-center align-items-center cursor-pointer"
                {...getRootProps()}
              >
                <input type="file" accept="image/*" {...getInputProps()} />
                <div className="d-flex flex-column align-items-center">
                  <i style={{ fontSize: 40 }} className="material-icons">
                    file_upload
                  </i>
                  <span>{t('profile:dragOrSelectImage')}</span>
                </div>
              </div>
            )}
          </div>
        </ModalBody>
      </Modal>
      <style>
        {`
        .edit-user-details__avatar {
          position: relative;
        }
        .overlay {
          opacity: 0;
          position: absolute;
          height: 40%;
          width: 100%;
          transition: opacity ease .3s;
          display: flex;
          cursor: pointer;
        }

        .edit-user-details__avatar:hover > .overlay {
          opacity: 0.5;
          color: white;
          background: black;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }

        .modal-content {
          width: 480px;
        }

        .modal-body {
          padding: 16px;
          border-radius: 10px;
        }

        .dropzone {
          height: 120px;
          border-radius: 6px;
          border: 1px dotted gray;
        }
      `}
      </style>
    </Col>
  );
};
