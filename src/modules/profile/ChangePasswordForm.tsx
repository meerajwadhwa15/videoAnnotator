import { Row, Col, Button, Form } from 'shards-react';
import Input from 'components/elements/Input';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { changeUserPassword, loadingSelector } from './slice';
import { ChangePasswordSchema } from 'validations/UserProfileSchema';

export const ChangePasswordForm = () => {
  const loading = useAppSelector(loadingSelector);
  const dispatch = useAppDispatch();

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      oldPassword: '',
      password: '',
      matchingPassword: '',
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: (values) => {
      dispatch(changeUserPassword(values));
    },
  });

  return (
    <Form onSubmit={handleSubmit}>
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
          <Input
            label="Old Password"
            name="oldPassword"
            type="password"
            errorMessage={errors.oldPassword}
            placeholder="Enter old password"
            value={values.oldPassword}
            onChange={handleChange}
          />
        </Col>
        <Col md="4" className="form-group">
          <Input
            label="New Password"
            name="password"
            type="password"
            errorMessage={errors.password}
            placeholder="Enter new password"
            value={values.password}
            onChange={handleChange}
          />
        </Col>
        <Col md="4" className="form-group">
          <Input
            label="Repeat New Password"
            name="matchingPassword"
            type="password"
            errorMessage={errors.matchingPassword}
            placeholder="Repeat new password"
            value={values.matchingPassword}
            onChange={handleChange}
          />
        </Col>
        <Col xs="12" className="form-group">
          <Button
            type="submit"
            disabled={loading}
            block
            className="d-table mr-3"
          >
            Change password
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
