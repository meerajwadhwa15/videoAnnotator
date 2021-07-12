/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { Form, FormGroup, FormCheckbox, Button } from 'shards-react';
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
          {t('signup:termOfUseMessage')}
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
    </Form>
  );
};

export default SignupForm;
