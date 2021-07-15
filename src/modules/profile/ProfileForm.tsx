import { Row, Col, Button, Form, FormTextarea, FormGroup } from 'shards-react';
import { useFormik } from 'formik';
import Input from 'components/elements/Input';
import Image from 'next/image';
import { useAppSelector } from 'redux/hooks';
import { userDataSelector } from 'redux/globalSlice';

export const ProfileForm = () => {
  const userData = useAppSelector(userDataSelector);
  const { email, fullName } = userData;

  const { values, handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      fullName: fullName,
      address: '',
      phone: '',
      introduction: '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Form className="py-4" onSubmit={handleSubmit}>
      <Row form className="mx-4">
        <Col lg="8">
          <Row form>
            <Col md="6" className="form-group">
              <Input
                label="Email Address"
                disabled
                name="email"
                value={email}
                prefix={<i className="material-icons">&#xE0BE;</i>}
              />
            </Col>
            <Col md="6" className="form-group">
              <Input
                label="Full Name"
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                errorMessage={errors.fullName}
                prefix={<i className="material-icons">&#xE0C8;</i>}
              />
            </Col>
            <Col md="6" className="form-group">
              <Input
                label="Address"
                name="address"
                value={values.address}
                onChange={handleChange}
                errorMessage={errors.address}
                prefix={<i className="material-icons">&#xE0C8;</i>}
              />
            </Col>
            <Col md="6" className="form-group">
              <Input
                label="Phone Number"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                errorMessage={errors.phone}
                prefix={<i className="material-icons">&#xE0CD;</i>}
              />
            </Col>
            <Col md="12">
              <FormGroup>
                <label>Introduction</label>
                <FormTextarea
                  style={{ height: 80 }}
                  value={values.introduction}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
        </Col>
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
              src="/images/avatar-default.jpg"
              width={100}
              height={100}
              alt="User Avatar"
            />
          </div>
        </Col>
        <Col nog>
          <Button block className="d-table mr-3">
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
