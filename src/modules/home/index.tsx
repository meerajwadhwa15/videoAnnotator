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
} from 'shards-react';
import Image from 'next/image';
import FuzzySearch from 'fuzzy-search';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

import DashboardLayout from 'components/layouts/DashboardLayout';
import PageTitle from 'components/elements/pageTitle';
import { userDataSelector, usersListDataSelector } from 'redux/globalSlice';
import {
  videoListsSelector,
  messageSelector,
  loadingSelector,
  assignVideo,
  clearMessage,
} from './slice';
import { UserRole } from 'models/user.model';
import { displayVideoStatus } from 'utils/helpers';
import styles from './style.module.scss';

const Home = () => {
  const dispatch = useAppDispatch();
  const tableDataStore = useAppSelector(videoListsSelector);
  const currentUser = useAppSelector(userDataSelector);
  const usersList = useAppSelector(usersListDataSelector);
  const message = useAppSelector(messageSelector);
  const loading = useAppSelector(loadingSelector);

  const [tableDataState, setTableDataState] = useState(tableDataStore);
  const [pageSizeOptions] = useState([5, 10, 15, 20]);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setModal] = useState(false);

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
      Header: 'Id',
      accessor: 'id',
      maxWidth: 60,
      className: 'text-center',
    },
    {
      Header: 'Name',
      accessor: 'name',
      className: 'text-center',
      maxWidth: 300,
      // Cell: function displayName(data) {
      // 	// return <span>{data.original.url}</span>;
      // 	return (
      // 		<div>
      // 			{/* <video id={`video-${data.original.id}`} src="http://www.w3schools.com/html/mov_bbb.mp4" controls></video> */}
      // 			{/* <video controls>
      //   		<source src="www.youtube.com/watch?v=3bGNuRtlqAQ" type="video/mp4" />
      // 			</video> */}
      // 		</div>
      // 	);
      // }
    },
    {
      Header: 'Type',
      accessor: 'format',
      maxWidth: 150,
      className: 'text-center',
    },
    {
      Header: 'Size',
      accessor: 'size',
      maxWidth: 150,
      className: 'text-center',
    },
    {
      Header: 'Status',
      accessor: 'status',
      minWidth: 200,
      className: 'text-center',
      Cell: function displayStatus(row) {
        return <span>{displayVideoStatus(row.original.status)}</span>;
      },
    },
    {
      Header: 'Actions',
      accessor: 'action',
      minWidth: 200,
      maxWidth: 350,
      sortable: false,
      Cell: function displayAction(row) {
        return (
          <ButtonGroup size="sm" className="d-table mx-auto">
            {isAdmin && (
              <Button
                title="Assign Video"
                theme="white"
                className={styles.button}
                onClick={() => {
                  toggleModal(row.original.id);
                }}
              >
                <i className={`${styles.icon} material-icons`}>assignment</i>
              </Button>
            )}
            <Button
              title="View Detail"
              theme="white"
              className={styles.button}
              onClick={() => {
                onViewItemDetail(row);
              }}
            >
              <i className={`${styles.icon} material-icons`}>pageview</i>
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
    if (isModalOpen) {
      dispatch(clearMessage());
    }

    if (
      isModalOpen === false &&
      currentVideoId.current !== 0 &&
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
  }, [isModalOpen]);

  useEffect(() => {
    if (message.type === 'success') {
      if (message.text === 'update_assign_success') {
        toast.success('🚀 Update successfully!');
      }
    }

    if (message.type === 'error') {
      if (message.text === 'update_assign_error') {
        toast.error('🚀 Update error!');
      }
    }
  }, [message]);

  function onSearch(event) {
    setTableDataState(searcher.search(event.target.value));
  }

  function onViewItemDetail(item) {
    console.log('view detail', item);
  }

  function onPageSizeChange(e) {
    setPageSize(e.target.value);
  }

  function toggleModal(videoId = 0) {
    setModal(!isModalOpen);
    currentVideoId.current = videoId;
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
    setModal(false);
  }

  return (
    <DashboardLayout>
      {/* Page Title */}
      <PageTitle title="Videos" subtitle="Video List" />
      {/* Table */}
      <Card className={styles.card}>
        <CardHeader className="p-0">
          <Container fluid className={styles.filterWrapper}>
            <Row>
              <Col className={styles.rowFilterLeft} md="6">
                <span>Show</span>
                <FormSelect
                  size="sm"
                  value={pageSize}
                  onChange={onPageSizeChange}
                >
                  {pageSizeOptions.map((size, idx) => (
                    <option key={idx} value={size}>
                      {size} rows
                    </option>
                  ))}
                </FormSelect>
              </Col>

              {/* Search */}
              <Col className="d-flex" md="6">
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
                    placeholder="Search..."
                    onChange={(e) => {
                      onSearch(e);
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
            noDataText={'No data found'}
          />
        </CardBody>
      </Card>
      {/* Modal */}
      <Modal
        centered
        size="md"
        open={isModalOpen}
        toggle={() => toggleModal(currentVideoId.current)}
      >
        <ModalHeader>Assign/Retract this video for</ModalHeader>
        <ModalBody>
          <div className="content-wrapper">
            {usersList.length > 0 ? (
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
                    <span className="test">{`${user.fullName} - ${user.email}`}</span>
                  </FormCheckbox>
                </div>
              ))
            ) : (
              <p className={styles.notFoundUsers}>No users found.</p>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          {
            <Button
              disabled={loading}
              onClick={() => {
                onUpdate();
              }}
            >
              {loading ? 'Updating...' : 'Update'}
            </Button>
          }
          <Button
            theme="white"
            onClick={() => {
              onCancel();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </DashboardLayout>
  );
};

export default Home;
