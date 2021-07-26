/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Form,
  FormGroup,
  FormCheckbox,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from 'shards-react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { SignupSchema } from 'validations/SignupSchema';
import Input from 'components/elements/Input';
import {
  dispatchSignup,
  loadingSelector,
  messageSelector,
  clearMessage,
} from './slice';
import { useTranslation } from 'next-i18next';

const SignupForm = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(loadingSelector);
  const message = useAppSelector(messageSelector);
  const { t } = useTranslation(['signup']);

  const [isModalOpen, setModal] = useState(false);

  const signUpForm = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      matchingPassword: '',
      policyChecked: false,
    },
    validationSchema: SignupSchema(t),
    onSubmit: (values) => {
      dispatch(dispatchSignup(values));
    },
  });

  const { values, handleChange, handleSubmit, errors, setFieldValue } =
    signUpForm;

  useEffect(() => {
    if (message.type === 'success') {
      signUpForm.resetForm();
      toast.success(t('signup:signupSuccessMessage'));
    }

    if (message.type === 'error') {
      toast.error(t('signup:failToSignupError'));
    }

    return () => {
      dispatch(clearMessage());
    };
  }, [message, dispatch, signUpForm, t]);

  function toggleModal() {
    setModal(!isModalOpen);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        name="email"
        value={values.email}
        onChange={handleChange}
        errorMessage={errors.email}
        label={t('signup:formInputEmailLabel')}
        placeholder={t('signup:formInputEmailPlaceholder')}
      />
      <Input
        label={t('signup:formInputUserNameLabel')}
        value={values.fullName}
        errorMessage={errors.fullName}
        onChange={handleChange}
        name="fullName"
        placeholder={t('signup:formInputUserNamePlaceholder')}
      />
      <Input
        value={values.password}
        errorMessage={errors.password}
        onChange={handleChange}
        name="password"
        label={t('signup:formInputPasswordLabel')}
        type="password"
        placeholder={t('signup:formInputPasswordPlaceholder')}
      />
      <Input
        value={values.matchingPassword}
        errorMessage={errors.matchingPassword}
        onChange={handleChange}
        name="matchingPassword"
        label={t('signup:formInputMatchPasswordLabel')}
        type="password"
        placeholder={t('signup:formInputPasswordPlaceholder')}
      />
      <FormGroup>
        <FormCheckbox
          id="checkbox"
          required
          checked={values.policyChecked}
          onChange={() => setFieldValue('policyChecked', !values.policyChecked)}
        >
          {t('signup:agreeWith')}{' '}
          <a
            style={{ textDecoration: 'underline' }}
            href="#"
            onClick={(event) => {
              event.stopPropagation();
              toggleModal();
            }}
          >
            {t('signup:termOfUseMessage')}
          </a>
        </FormCheckbox>
      </FormGroup>
      <Button
        block
        type="submit"
        disabled={loading}
        className="d-table mx-auto"
      >
        {loading
          ? t('signup:loadingSubmitButtonLabel')
          : t('signup:signupSubmitButtonLabel')}
      </Button>
      {/* Modal */}
      <Modal centered size="md" open={isModalOpen} toggle={() => toggleModal()}>
        <ModalHeader>{t('signup:termModalHeader')}</ModalHeader>
        <ModalBody>
          <div style={{ textAlign: 'justify' }}>{t('signup:dummyText')}</div>
        </ModalBody>
      </Modal>
    </Form>
  );
};

export default SignupForm;
