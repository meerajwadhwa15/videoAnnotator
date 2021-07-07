import React, { useState } from 'react';
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
} from 'shards-react';

import DashboardLayout from 'components/layouts/DashboardLayout';
import PageTitle from 'components/elements/pageTitle';
import styles from './style.module.scss';

const Home = () => {
  const [pageSizeOptions] = useState([5, 10, 15, 20]);
  const [pageSize, setPageSize] = useState(10);
  const [tableData] = useState([
    {
      id: 1,
      name: 'Lava episode 1',
      type: 'mp4 file',
      size: '10mb',
      status: 'Awaited annotation',
    },
    {
      id: 2,
      name: 'Lava episode 2',
      type: 'mp4 file',
      size: '10mb',
      status: 'Awaited annotation',
    },
    {
      id: 3,
      name: 'Lava episode 3',
      type: 'mp4 file',
      size: '10mb',
      status: 'Awaited annotation',
    },
    {
      id: 4,
      name: 'Lava episode 4',
      type: 'mp4 file',
      size: '10mb',
      status: 'Awaited annotation',
    },
    {
      id: 5,
      name: 'Lava episode 5',
      type: 'mp4 file',
      size: '10mb',
      status: 'Awaited annotation',
    },
    {
      id: 6,
      name: 'Lava episode 6',
      type: 'mp4 file',
      size: '10mb',
      status: 'Awaited annotation',
    },
    {
      id: 7,
      name: 'Lava episode 7',
      type: 'mp4 file',
      size: '10mb',
      status: 'Awaited annotation',
    },
    {
      id: 8,
      name: 'Lava episode 8',
      type: 'mp4 file',
      size: '10mb',
      status: 'Awaited annotation',
    },
    {
      id: 9,
      name: 'Lava episode 9',
      type: 'mp4 file',
      size: '10mb',
      status: 'Awaited annotation',
    },
    {
      id: 10,
      name: 'Lava episode 10',
      type: 'mp4 file',
      size: '10mb',
      status: 'Awaited annotation',
    },
    {
      id: 11,
      name: 'Lava episode 11',
      type: 'mp4 file',
      size: '10mb',
      status: 'Awaited annotation',
    },
  ]);
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
    },
    {
      Header: 'Type',
      accessor: 'type',
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
      Cell: function displayStatus(row: any) {
        return <span>{row.original.status}</span>;
      },
      className: 'text-center',
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
            <Button
              theme="white"
              className={styles.button}
              onClick={() => {
                onViewItemDetail(row);
              }}
            >
              <i className={`${styles.icon} material-icons`}>pageview</i>
            </Button>
            <Button
              theme="white"
              className={styles.button}
              onClick={() => {
                onDeleteItem(row);
              }}
            >
              <i className={`${styles.icon} material-icons`}>delete</i>
            </Button>
          </ButtonGroup>
        );
      },
    },
  ];

  function onSearch() {
    console.log('search');
  }

  function onViewItemDetail(item) {
    console.log('view detail', item);
  }

  function onDeleteItem(item) {
    console.log('delete item', item);
  }

  function onPageSizeChange(e) {
    setPageSize(e.target.value);
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
                  <FormInput placeholder="Search..." onChange={onSearch} />
                </InputGroup>
              </Col>
            </Row>
          </Container>
        </CardHeader>
        <CardBody className="p-0">
          <div className="">
            <ReactTable
              columns={tableColumns}
              data={tableData}
              pageSize={pageSize}
              showPageSizeOptions={false}
              resizable={false}
            />
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
};

export default Home;
