import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useTranslation } from 'next-i18next';
import { Button } from 'shards-react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import DashboardLayout from 'components/layouts/DashboardLayout';
import { videosListSelector, assignVideo, clearData } from './slice';
import { User, UserRole } from 'models/user.model';
import EditVideoModal from './EditVideoModal';
import DeleteVideoModal from './DeleteVideoModal';
import { AssignVideoModal } from './AssignVideoModal';
import { VideoList } from './VideoList';
import { VideoSearchBar } from './VideoSearchBar';

const Home = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['home']);
  const tableDataStore = useAppSelector(videosListSelector);
  const user = useAppSelector((state) => state.app.user);
  const [tableDataState, setTableDataState] = useState(tableDataStore);
  const [isAssignModalOpen, setAssignModal] = useState(false);
  const [isEditModalOpen, setEditModal] = useState(false);
  const [isDeleteModalOpen, setDeleteModal] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const currentVideoId = useRef(0);
  const isAdmin = user.roles.includes(UserRole.admin);

  useEffect(() => {
    setTableDataState(tableDataStore);
  }, [tableDataStore]);

  useEffect(() => {
    return () => {
      dispatch(clearData());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isAssignModalOpen === false && currentVideoId.current > 0) {
      const currentVideoIndex = tableDataState.findIndex(
        (video) => video.id === currentVideoId.current
      );
      const originalVideoData = tableDataStore.find(
        (video) => video.id === tableDataState[currentVideoIndex].id
      );
      const tableDataTemp = JSON.parse(JSON.stringify(tableDataState));
      tableDataTemp[currentVideoIndex] = originalVideoData;
      setTableDataState(tableDataTemp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAssignModalOpen]);

  function toggleAssignModal(videoId = -1) {
    currentVideoId.current = videoId;
    setAssignModal(!isAssignModalOpen);
  }

  function toggleEditModal(videoId = -1) {
    currentVideoId.current = videoId;
    setEditModal(!isEditModalOpen);
  }

  function toggleDeleteModal(videoId = -1) {
    currentVideoId.current = videoId;
    setDeleteModal(!isDeleteModalOpen);
  }

  function onCheckbox(event: ChangeEvent<HTMLInputElement>, user: User) {
    const currentVideoIndex = tableDataState.findIndex(
      (video) => video.id === currentVideoId.current
    );
    if (currentVideoIndex != -1) {
      const tableDataTemp = JSON.parse(JSON.stringify(tableDataState));
      if (event.target.checked) {
        tableDataTemp[currentVideoIndex].assignedUsers.push(user);
      } else {
        const assignedIndex = tableDataTemp[
          currentVideoIndex
        ].assignedUsers.findIndex(
          (assignedUser) => assignedUser.id === user.id
        );
        tableDataTemp[currentVideoIndex].assignedUsers.splice(assignedIndex, 1);
      }
      setTableDataState(tableDataTemp);
    }
  }

  function calculateChecked(user: User) {
    if (Array.isArray(tableDataState) && tableDataState.length > 0) {
      const currentVideoIndex = tableDataState.findIndex(
        (video) => video.id === currentVideoId.current
      );
      if (currentVideoIndex != -1) {
        const result = tableDataState[
          currentVideoIndex
        ].assignedUsers.findIndex(
          (assignedUser) => assignedUser.id === user.id
        );
        if (result != -1) {
          return true;
        } else {
          return false;
        }
      }
      return false;
    }
    return false;
  }

  function onUpdate() {
    const currentVideoIndex = tableDataState.findIndex(
      (video) => video.id === currentVideoId.current
    );
    const data = {
      id: currentVideoId.current,
      userId: tableDataState[currentVideoIndex].assignedUsers.map(
        (user) => user.id
      ),
    };
    dispatch(assignVideo(data));
  }

  function onCancel() {
    setAssignModal(false);
  }

  function clearSearchKeyword() {
    if (searchKeyword) {
      setSearchKeyword('');
    }
  }

  return (
    <DashboardLayout>
      <div className="d-flex mb-2 mt-4">
        <h3 className="page-title">{t('title')}</h3>
        {isAdmin && (
          <Button onClick={toggleEditModal} className="ml-auto">
            {t('addVideoButton')}
          </Button>
        )}
      </div>
      <VideoSearchBar />
      <VideoList
        toggleAssignModal={toggleAssignModal}
        toggleEditModal={toggleEditModal}
        toggleDeleteModal={toggleDeleteModal}
      />
      <EditVideoModal
        isOpen={isEditModalOpen}
        videoId={currentVideoId.current}
        videoData={tableDataState}
        toggleEditModal={toggleEditModal}
        clearSearchKeyword={clearSearchKeyword}
      />
      <DeleteVideoModal
        isOpen={isDeleteModalOpen}
        videoId={currentVideoId.current}
        toggleDeleteModal={toggleDeleteModal}
        clearSearchKeyword={clearSearchKeyword}
      />
      <AssignVideoModal
        onCancel={onCancel}
        onUpdate={onUpdate}
        open={isAssignModalOpen}
        onCheckbox={onCheckbox}
        calculateChecked={calculateChecked}
        toggleModal={() => toggleAssignModal(currentVideoId.current)}
      />
    </DashboardLayout>
  );
};

export default Home;
