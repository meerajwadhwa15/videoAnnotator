import React from 'react';
import {
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardFooter,
  Nav,
  NavItem,
  NavLink,
  Form,
  FormInput,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  CardHeader,
} from 'shards-react';
import Image from 'next/image';

import DashboardLayout from 'components/layouts/DashboardLayout';
import PageTitle from 'components/elements/pageTitle';
import styles from './style.module.scss';

const Profile = () => {
  return (
    <DashboardLayout>
      {/* Page Title */}
      <PageTitle title="User Profile" subtitle="Profile" />
      {/* User Profile */}
      <Col lg="8" className="mx-auto mt-4">
        <Card small className="edit-user-details mb-4">
          {/* Profile Photo */}
          <CardHeader className="p-0">
            <div className={styles.editProfileheadbg}></div>
          </CardHeader>

          <CardBody className="p-0">
            <div className="border-bottom clearfix d-flex">
              <Nav tabs className="border-0 mt-auto mx-4 pt-2">
                <NavItem>
                  <NavLink active>General</NavLink>
                </NavItem>
              </Nav>
            </div>

            {/* Form Section Title :: My profile */}
            <Form className="py-4">
              <Row form className="mx-4">
                <Col lg="8">
                  <Row form>
                    {/* Email */}
                    <Col md="6" className="form-group">
                      <label htmlFor="emailAddress">Email</label>
                      <InputGroup seamless>
                        <InputGroupAddon type="prepend">
                          <InputGroupText>
                            <i className="material-icons">&#xE0BE;</i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <FormInput
                          id="emailAddress"
                          disabled
                          onChange={() => {
                            console.log(1);
                          }}
                        />
                      </InputGroup>
                    </Col>

                    {/* User Name */}
                    <Col md="6" className="form-group">
                      <label htmlFor="firstName">User Name</label>
                      <InputGroup seamless>
                        <InputGroupAddon type="prepend">
                          <InputGroupText>
                            <i className="material-icons">&#xE0C8;</i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <FormInput
                          id="username"
                          onChange={() => {
                            console.log(1);
                          }}
                        />
                      </InputGroup>
                    </Col>

                    {/* Location */}
                    <Col md="6" className="form-group">
                      <label htmlFor="userLocation">Location</label>
                      <InputGroup seamless>
                        <InputGroupAddon type="prepend">
                          <InputGroupText>
                            <i className="material-icons">&#xE0C8;</i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <FormInput
                          id="userLocation"
                          onChange={() => {
                            console.log(1);
                          }}
                        />
                      </InputGroup>
                    </Col>

                    {/* Phone Number */}
                    <Col md="6" className="form-group">
                      <label htmlFor="phoneNumber">Phone Number</label>
                      <InputGroup seamless>
                        <InputGroupAddon type="prepend">
                          <InputGroupText>
                            <i className="material-icons">&#xE0CD;</i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <FormInput
                          id="phoneNumber"
                          onChange={() => {
                            console.log(1);
                          }}
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                </Col>

                {/* User Profile Picture */}
                <Col lg="4">
                  <label
                    htmlFor="userProfilePicture"
                    className="text-center w-100 mb-4"
                  >
                    Avatar
                  </label>
                  <div className="edit-user-details__avatar">
                    <Image
                      className={`user-avatar rounded-circle`}
                      src="/images/1.jpg"
                      width={100}
                      height={100}
                      alt="User Avatar"
                    />
                    <label className="edit-user-details__avatar__change">
                      <i className="material-icons mr-1">&#xE439;</i>
                      <FormInput id="userProfilePicture" className="d-none" />
                    </label>
                  </div>
                </Col>
                <Col nog>
                  <Button block className="ml-auto d-table mr-3">
                    Save
                  </Button>
                </Col>
              </Row>
            </Form>
            <hr />
            {/* Change Password form */}
            <Form>
              <Row form className="mx-4">
                <Col className="mb-3">
                  <h6 className="form-text m-0">Change Password</h6>
                  <p className="form-text text-muted m-0">
                    Change your current password.
                  </p>
                </Col>
              </Row>
              <Row form className="mx-4">
                <Col md="4" className="form-group">
                  <label htmlFor="oldPassword">Old Password</label>
                  <FormInput
                    id="oldPassword"
                    name="oldPassword"
                    placeholder="Old Password"
                    onChange={() => {
                      console.log(1);
                    }}
                  />
                </Col>

                <Col md="4" className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <FormInput
                    id="newPassword"
                    name="newPassword"
                    placeholder="New Password"
                    onChange={() => {
                      console.log(1);
                    }}
                  />
                </Col>

                <Col md="4" className="form-group">
                  <label htmlFor="repeatNewPassword">Repeat New Password</label>
                  <FormInput
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={() => {
                      console.log(1);
                    }}
                  />
                </Col>
                <Col xs="12" className="form-group">
                  <Button block className="ml-auto d-table mr-3">
                    Change password
                  </Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
          <CardFooter className="border-top"></CardFooter>
        </Card>
      </Col>
    </DashboardLayout>
  );
};

export default Profile;
