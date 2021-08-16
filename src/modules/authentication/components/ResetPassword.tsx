import { Input } from 'components/elements';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import * as Yup from 'yup';
import { Form, Button } from 'shards-react';
import { loadingSelector, setStatus } from '../slice';
import { dispatchResetPass } from '../actions';
import { AuthStatus } from '../types';
import { ResendPasscode } from './ResendPasscode';

export const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(loadingSelector);
  const { t } = useTranslation();

  const form = useFormik({
    initialValues: {
      password: '',
      token: '',
      matchingPassword: '',
    },
    validationSchema: Yup.object().shape({
      password: Yup.string().required(
        t('reset-password:newPasswordRequiredError')
      ),
      matchingPassword: Yup.string().oneOf(
        [Yup.ref('password'), null],
        t('reset-password:passwordsMustMatchError')
      ),
    }),
    onSubmit: (values) => {
      dispatch(dispatchResetPass(values));
    },
  });

  const { values, handleChange, handleSubmit, errors } = form;

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        value={values.password}
        onChange={handleChange}
        errorMessage={errors.password}
        name="password"
        label={t('reset-password:passwordInputLabel')}
        type="password"
        placeholder={t('reset-password:passwordInputPlaceholer')}
      />
      <Input
        value={values.matchingPassword}
        onChange={handleChange}
        errorMessage={errors.matchingPassword}
        name="matchingPassword"
        label={t('reset-password:confirmPasswordInputLabel')}
        type="password"
        placeholder={t('reset-password:confirmPasswordInputPlaceholder')}
      />
      <Input
        value={values.token}
        onChange={handleChange}
        errorMessage={errors.token}
        name="token"
        label={t('signup:enterPasscode')}
        placeholder={t('signup:enterPasscode')}
      />
      <ResendPasscode />
      <Button
        block
        type="submit"
        disabled={loading}
        className="d-table mx-auto mt-1"
      >
        {loading
          ? t('reset-password:createNewPasswordLoadingBtn')
          : t('reset-password:createNewPasswordSubmitBtn')}
      </Button>
      <p
        onClick={() => dispatch(setStatus(AuthStatus.login))}
        className="mt-4 mb-0 text-center hover-underline cursor-pointer"
      >
        {t('signup:toSigninLink')}
      </p>
    </Form>
  );
};
