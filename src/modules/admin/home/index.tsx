import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
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
  ButtonGroup,
  Button,
  NavLink,
} from 'shards-react';
import { useRouter } from 'next/router';
import FuzzySearch from 'fuzzy-search';
import { useTranslation } from 'next-i18next';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import DashboardLayout from 'components/layouts/DashboardLayout';
import PageTitle from 'components/elements/pageTitle';
import { userDataSelector } from 'redux/globalSlice';
import {
  videosListSelector,
  messageSelector,
  assignVideo,
  clearMessage,
  clearData,
} from './slice';
import { User, UserRole } from 'models/user.model';
import { displayVideoStatus } from 'utils/helpers';
import EditVideoModal from './EditVideoModal';
import DeleteVideoModal from './DeleteVideoModal';
import { AssignVideoModal } from './AssignVideoModal';
import { ADMIN_ROUTING } from 'utils/constants';
import styles from './style.module.scss';

const Home = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['home']);

  const tableDataStore = useAppSelector(videosListSelector);
  const currentUser = useAppSelector(userDataSelector);
  const message = useAppSelector(messageSelector);

  const [tableDataState, setTableDataState] = useState(tableDataStore);
  const [pageSizeOptions] = useState([5, 10, 15, 20]);
  const [pageSize, setPageSize] = useState(10);
  const [isAssignModalOpen, setAssignModal] = useState(false);
  const [isEditModalOpen, setEditModal] = useState(false);
  const [isDeleteModalOpen, setDeleteModal] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

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
      className: 'text-center',
      maxWidth: 60,
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
      className: 'text-center',
      maxWidth: 150,
      Cell: function displayStatus(row) {
        return <span>{row.original.format || 'N/A'}</span>;
      },
    },
    {
      Header: t('sizeColumn'),
      accessor: 'size',
      className: 'text-center',
      maxWidth: 150,
      Cell: function displayStatus(row) {
        return <span>{row.original.size || 'N/A'}</span>;
      },
    },
    {
      Header: t('statusColumn'),
      accessor: 'status',
      className: 'text-center',
      minWidth: 150,
      maxWidth: 300,
      Cell: function displayStatus(row) {
        return <span>{displayVideoStatus(row.original.status)}</span>;
      },
    },
    {
      Header: t('actionColumn'),
      accessor: 'action',
      sortable: false,
      minWidth: 200,
      maxWidth: 400,
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
              href={`${ADMIN_ROUTING.videoDetail}/${row.original.id}`}
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
    if (
      isAssignModalOpen === false &&
      currentVideoId.current > 0 &&
      message.type !== 'success' &&
      message.text !== 'assign_video_success'
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

    if (!isAssignModalOpen && message.type) {
      dispatch(clearMessage());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAssignModalOpen]);

  useEffect(() => {
    return () => {
      dispatch(clearData());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSearch(event) {
    setSearchKeyword(event.target.value);
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
      {/* Page Title */}
      <PageTitle title={t('title')} subtitle={t('subTitle')} />
      {/* Table */}
      <Card className={styles.card}>
        <CardHeader className="p-0">
          <Container fluid className={styles.containerHeader}>
            <Row>
              {isAdmin && (
                <Col xs="12" className={styles.newBtnWrapper}>
                  <Button outline size="sm" onClick={() => toggleEditModal()}>
                    {t('createNewBtn')}{' '}
                    <i className="material-icons">plus_one</i>
                  </Button>
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
                    value={searchKeyword}
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
            nextText={t('nextTableTextBtn')}
            previousText={t('home:previousTableTextBtn')}
            loadingText={t('home:loadingTableText')}
            noDataText={t('home:noDataTableText')}
            pageText={t('home:pageTableText')}
            ofText={t('home:ofTableText')}
            getTrProps={(state, row) => {
              return {
                style: {
                  cursor: 'pointer',
                },
                onClick: () => {
                  router.push(
                    `${ADMIN_ROUTING.videoDetail}/${row.original.id}`
                  );
                },
              };
            }}
            getTdProps={() => ({
              style: {
                minHeight: '48px',
              },
            })}
          />
        </CardBody>
      </Card>
      {/* Modal edit video */}
      <EditVideoModal
        isOpen={isEditModalOpen}
        videoId={currentVideoId.current}
        videoData={tableDataState}
        toggleEditModal={toggleEditModal}
        clearSearchKeyword={clearSearchKeyword}
      />
      {/* Modal delete video */}
      <DeleteVideoModal
        isOpen={isDeleteModalOpen}
        videoId={currentVideoId.current}
        toggleDeleteModal={toggleDeleteModal}
        clearSearchKeyword={clearSearchKeyword}
      />
      {/* Modal assign video */}
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
