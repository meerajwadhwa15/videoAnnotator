import { UserRole } from 'models';
import { Button } from 'shards-react';
import { userDataSelector } from 'redux/globalSlice';
import { useAppSelector } from 'redux/hooks';
import { displayVideoStatus } from 'utils/helpers';
import { videosListSelector } from './slice';
import styles from './style.module.scss';
import { useTranslation } from 'react-i18next';
import { ADMIN_ROUTING } from 'utils/constants';
import { useRouter } from 'next/router';

export const VideoList = ({
  toggleAssignModal,
  toggleEditModal,
  toggleDeleteModal,
}) => {
  const videos = useAppSelector(videosListSelector);
  const { t } = useTranslation('home');
  const { push } = useRouter();
  const tableHeader = [
    '#',
    t('nameColumn'),
    t('descriptionColumn'),
    t('statusColumn'),
    t('actionColumn'),
  ];
  const currentUser = useAppSelector(userDataSelector);
  const { roles } = currentUser;
  const isAdmin = roles.includes(UserRole.admin);

  const renderVideos = () => {
    return (
      <tbody>
        {videos.map((video, index) => (
          <tr
            key={video.id}
            onClick={() => push(`${ADMIN_ROUTING.videoDetail}/${video.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <td>
              <strong>{index + 1}</strong>
            </td>
            <td>{video.name}</td>
            <td>{video.description}</td>
            <td>{displayVideoStatus(video.status)}</td>
            <td>
              {isAdmin && (
                <div className={styles.actions}>
                  <Button
                    title={t('assignBtnToolTip')}
                    theme="success"
                    className={styles.button}
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleAssignModal(video.id);
                    }}
                  >
                    <i className="material-icons">assignment</i>
                  </Button>
                  <span className="mr-2" />
                  <Button
                    title={t('editBtnToolTip')}
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleEditModal(video.id);
                    }}
                  >
                    <i className="material-icons">edit</i>
                  </Button>
                  <span className="mr-2" />
                  <Button
                    title={t('deleteBtnToolTip')}
                    theme="danger"
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleDeleteModal(video.id);
                    }}
                  >
                    <i className="material-icons">delete</i>
                  </Button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover table-bordered">
        <thead className="thead-dark">
          <tr>
            {tableHeader.map((it) => (
              <th key={it}>{it}</th>
            ))}
          </tr>
        </thead>
        {renderVideos()}
      </table>
      {!videos.length && (
        <h6 className="text-center mt-4">{t('noDataTableText')}</h6>
      )}
    </div>
  );
};
