import React, { useState, useEffect, useRef } from 'react';
import ReactTable from 'react-table';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  FormSelect,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
  FormCheckbox,
  ButtonGroup,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  NavLink,
} from 'shards-react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import FuzzySearch from 'fuzzy-search';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import DashboardLayout from 'components/layouts/DashboardLayout';
import PageTitle from 'components/elements/pageTitle';
import { userDataSelector, usersListDataSelector } from 'redux/globalSlice';
import {
  videosListSelector,
  messageSelector,
  assignVideoLoadingSelector,
  assignVideo,
  clearMessage,
} from './slice';
import { UserRole } from 'models/user.model';
import { displayVideoStatus } from 'utils/helpers';
import CreateVideoModal from './CreateVideoModal';
import EditVideoModal from './EditVideoModal';
import DeleteVideoModal from './DeleteVideoModal';
import styles from './style.module.scss';

const Home = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['home']);

  const tableDataStore = useAppSelector(videosListSelector);
  const currentUser = useAppSelector(userDataSelector);
  const usersList = useAppSelector(usersListDataSelector);
  const message = useAppSelector(messageSelector);
  const assignVideoLoading = useAppSelector(assignVideoLoadingSelector);
  const [tableDataState, setTableDataState] = useState(tableDataStore);
  const [pageSizeOptions] = useState([5, 10, 15, 20]);
  const [pageSize, setPageSize] = useState(10);
  const [isAssignModalOpen, setAssignModal] = useState(false);
  const [isEditModalOpen, setEditModal] = useState(false);
  const [isDeleteModalOpen, setDeleteModal] = useState(false);

  const { roles } = currentUser;
  const isAdmin = roles.includes(UserRole.admin);
  const searcher = new FuzzySearch(
    tableDataStore,
    ['name', 'type', 'size', 'status'],
    {
      caseSensitive: false,
    }
  );
  const currentVideoId = useRef(0);

  const tableColumns = [
    {
      Header: t('idColumn'),
      accessor: 'id',
      maxWidth: 60,
      className: 'text-center',
    },
    {
      Header: t('nameColumn'),
      accessor: 'name',
      className: 'text-center',
      minWidth: 250,
    },
    {
      Header: t('typeColumn'),
      accessor: 'format',
      maxWidth: 150,
      className: 'text-center',
      Cell: function displayStatus(row) {
        return <span>{row.original.format || 'N/A'}</span>;
      },
    },
    {
      Header: t('sizeColumn'),
      accessor: 'size',
      maxWidth: 150,
      className: 'text-center',
      Cell: function displayStatus(row) {
        return <span>{row.original.size || 'N/A'}</span>;
      },
    },
    {
      Header: t('statusColumn'),
      accessor: 'status',
      minWidth: 150,
      maxWidth: 300,
      className: 'text-center',
      Cell: function displayStatus(row) {
        return <span>{displayVideoStatus(row.original.status)}</span>;
      },
    },
    {
      Header: t('actionColumn'),
      accessor: 'action',
      minWidth: 200,
      maxWidth: 400,
      sortable: false,
      Cell: function displayAction(row) {
        return (
          <ButtonGroup size="sm" className="d-table mx-auto">
            {isAdmin && (
              <Button
                title={t('assignBtnToolTip')}
                theme="white"
                className={styles.button}
                onClick={(event) => {
                  event.stopPropagation();
                  toggleAssignModal(row.original.id);
                }}
              >
                <i className={`${styles.icon} material-icons`}>assignment</i>
              </Button>
            )}
            {isAdmin && (
              <Button
                title={t('editBtnToolTip')}
                theme="white"
                className={styles.button}
                onClick={(event) => {
                  event.stopPropagation();
                  toggleEditModal(row.original.id);
                }}
              >
                <i className={`${styles.icon} material-icons`}>edit</i>
              </Button>
            )}
            {isAdmin && (
              <Button
                title={t('deleteBtnToolTip')}
                theme="white"
                className={styles.button}
                onClick={(event) => {
                  event.stopPropagation();
                  toggleDeleteModal(row.original.id);
                }}
              >
                <i className={`${styles.icon} material-icons`}>delete</i>
              </Button>
            )}
            <Button
              tag={NavLink}
              href={`/video-detail/${row.original.id}`}
              title={t('viewDetailBtnToolTip')}
              theme="white"
              className={styles.button}
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <i className={`${styles.icon} material-icons`}>visibility</i>
            </Button>
          </ButtonGroup>
        );
      },
    },
  ];

  useEffect(() => {
    setTableDataState(tableDataStore);
  }, [tableDataStore]);

  useEffect(() => {
    if (!isAssignModalOpen && message.type) {
      dispatch(clearMessage());
    }

    if (
      isAssignModalOpen === false &&
      currentVideoId.current > 0 &&
      message.type !== 'success' &&
      message.text !== 'update_assign_success'
    ) {
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

  useEffect(() => {
    if (message.type === 'success') {
      if (message.text === 'assign_video_success') {
        toast.success(t('assignSuccessMsg'));
      }
    }

    if (message.type === 'error') {
      if (message.text === 'assign_video_error') {
        toast.error(t('assignErrorMsg'));
      }
    }
  }, [message, t]);

  function onSearch(event) {
    setTableDataState(searcher.search(event.target.value));
  }

  function onPageSizeChange(e) {
    setPageSize(e.target.value);
  }

  function toggleAssignModal(videoId = 0) {
    currentVideoId.current = videoId;
    setAssignModal(!isAssignModalOpen);
  }

  function toggleEditModal(videoId = 0) {
    currentVideoId.current = videoId;
    setEditModal(!isEditModalOpen);
  }

  function toggleDeleteModal(videoId = 0) {
    currentVideoId.current = videoId;
    setDeleteModal(!isDeleteModalOpen);
  }

  function onCheckbox(event, user) {
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

  function calculateChecked(user) {
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

  return (
    <DashboardLayout>
      {/* Page Title */}
      <PageTitle title={t('title')} subtitle={t('subTitle')} />
      {/* Table */}
      <Card className={styles.card}>
        <CardHeader className="p-0">
          <Container fluid className={styles.containerHeader}>
            <Row>
              {/* Create New Video Button */}
              {isAdmin && (
                <Col xs="12" className={styles.newBtnWrapper}>
                  <CreateVideoModal />
                </Col>
              )}
              {/*  Show Row */}
              <Col className={styles.rowFilterLeft} xs="6" md="6">
                <span>{t('showPageOptionText')}</span>
                <FormSelect
                  size="sm"
                  value={pageSize}
                  onChange={onPageSizeChange}
                >
                  {pageSizeOptions.map((size, idx) => (
                    <option key={idx} value={size}>
                      {`${size} ${t('rows')}`}
                    </option>
                  ))}
                </FormSelect>
              </Col>
              {/* Search */}
              <Col className="d-flex" xs="6" md="6">
                <InputGroup
                  seamless
                  size="sm"
                  className={`${styles.inputGroup} ml-auto`}
                >
                  <InputGroupAddon type="prepend">
                    <InputGroupText>
                      <i className="material-icons">search</i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <FormInput
                    placeholder={t('searchPlaceHolder')}
                    onChange={(event) => {
                      onSearch(event);
                    }}
                  />
                </InputGroup>
              </Col>
            </Row>
          </Container>
        </CardHeader>
        <CardBody className="p-0">
          <ReactTable
            columns={tableColumns}
            data={tableDataState}
            pageSize={pageSize}
            showPageSizeOptions={false}
            resizable={true}
            className="-highlight"
            getTrProps={(state, row) => {
              return {
                style: {
                  cursor: 'pointer',
                },
                onClick: () => {
                  router.push(`video-detail/${row.original.id}`);
                },
              };
            }}
            nextText={t('nextTableTextBtn')}
            previousText={t('home:previousTableTextBtn')}
            loadingText={t('home:loadingTableText')}
            noDataText={t('home:noDataTableText')}
            pageText={t('home:pageTableText')}
            ofText={t('home:ofTableText')}
          />
        </CardBody>
      </Card>
      {/* Modal edit video */}
      <EditVideoModal
        isOpen={isEditModalOpen}
        videoId={currentVideoId.current}
        videoData={tableDataState}
        toggleEditModal={() => toggleEditModal()}
      />
      {/* Modal edit video */}
      <DeleteVideoModal
        isOpen={isDeleteModalOpen}
        videoId={currentVideoId.current}
        toggleDeleteModal={() => toggleDeleteModal()}
      />
      {/* Modal assign video */}
      <Modal
        centered
        size="md"
        open={isAssignModalOpen}
        toggle={() => toggleAssignModal(currentVideoId.current)}
      >
        <ModalHeader>{t('assignModalHeaderText')}</ModalHeader>
        <ModalBody>
          <div className="content-wrapper">
            {Array.isArray(usersList) && usersList.length > 0 ? (
              usersList.map((user) => (
                <div key={user.id} className={styles.modalCheckbox}>
                  <FormCheckbox
                    className={styles.checkLabel}
                    checked={calculateChecked(user)}
                    onChange={(event) => onCheckbox(event, user)}
                  >
                    <Image
                      className="user-avatar rounded-circle"
                      src="/images/avatar-default.jpg"
                      width={45}
                      height={45}
                      alt="Avatar"
                    />
                    <span>{`${user.fullName} - ${user.email}`}</span>
                  </FormCheckbox>
                </div>
              ))
            ) : (
              <p className={styles.notFoundUsers}>{t('noUserFound')}</p>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          {
            <Button
              disabled={assignVideoLoading}
              onClick={() => {
                onUpdate();
              }}
            >
              {assignVideoLoading
                ? t('assignSubmitBtnLoading')
                : t('assignSubmitBtn')}
            </Button>
          }
          <Button
            theme="white"
            onClick={() => {
              onCancel();
            }}
          >
            {t('assignCancelBtn')}
          </Button>
        </ModalFooter>
      </Modal>
    </DashboardLayout>
  );
};

export default Home;
