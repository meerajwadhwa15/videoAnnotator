import { UserRole } from 'models';
import { userDataSelector } from 'redux/globalSlice';
import { useAppSelector } from 'redux/hooks';
import { displayVideoStatus } from 'utils/helpers';
import { videoListTotalPageSelector, videosListSelector } from './slice';
import styles from './style.module.scss';
import { useTranslation } from 'react-i18next';
import { ADMIN_ROUTING, PAGE_SIZE } from 'utils/constants';
import { useRouter } from 'next/router';
import { Pagination } from 'components/elements/Pagination';
import { IconButton } from 'components/elements';

export const VideoList = ({
  toggleAssignModal,
  toggleEditModal,
  toggleDeleteModal,
}) => {
  const videos = useAppSelector(videosListSelector);
  const { t } = useTranslation('home');
  const { push, query } = useRouter();
  const currentPage = Number(query.page || 1);
  const { totalPage, totalRecord } = useAppSelector(videoListTotalPageSelector);
  const tableHeader = [
    '#',
    t('nameColumn'),
    t('descriptionColumn'),
    t('categoryColumn'),
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
              <strong>{(currentPage - 1) * PAGE_SIZE + index + 1}</strong>
            </td>
            <td>{video.name}</td>
            <td>{video.description}</td>
            <td>
              {video.subCategory?.category?.name} / {video.subCategory?.name}
            </td>
            <td>{displayVideoStatus(video.status)}</td>
            <td>
              {isAdmin && (
                <div className={styles.actions}>
                  <IconButton
                    className="mr-2"
                    iconName="assignment"
                    title={t('assignBtnToolTip')}
                    theme="success"
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleAssignModal(video.id);
                    }}
                  />
                  <IconButton
                    iconName="edit"
                    className="mr-2"
                    title={t('editBtnToolTip')}
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleEditModal(video.id);
                    }}
                  />
                  <IconButton
                    title={t('deleteBtnToolTip')}
                    theme="danger"
                    iconName="delete"
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleDeleteModal(video.id);
                    }}
                  />
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
      <Pagination
        unit="videos"
        totalRecord={totalRecord}
        totalPage={totalPage}
      />
    </div>
  );
};
