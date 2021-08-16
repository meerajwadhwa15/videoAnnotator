import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { ForgotPassSchema } from 'validations/ForgotPassSchema';
import { Form, Button } from 'shards-react';
import { loadingSelector, setStatus } from '../slice';
import { Input } from 'components/elements';
import { dispatchForgetPass } from '../actions';
import { AuthStatus } from '../types';

export const ForgetPassword = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const loading = useAppSelector(loadingSelector);

  const form = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: ForgotPassSchema(t),
    onSubmit: (values) => {
      dispatch(dispatchForgetPass(values));
    },
  });

  const { values, handleChange, handleSubmit, errors } = form;
  return (
    <Form onSubmit={handleSubmit}>
      <Input
        value={values.email}
        onChange={handleChange}
        errorMessage={errors.email}
        placeholder={t('forgot-password:formEmailPlaceholder')}
        autoComplete="email"
        label={t('forgot-password:formEmailLabel')}
        name="email"
      />
      <Button
        disabled={loading}
        block
        className="d-table mx-auto"
        type="submit"
      >
        {loading
          ? t('forgot-password:loadingSubmit')
          : t('forgot-password:formSubmitButton')}
      </Button>
      <p
        className="mt-4 mb-0 text-center hover-underline cursor-pointer"
        onClick={() => dispatch(setStatus(AuthStatus.login))}
      >
        {t('forgot-password:toLogin')}
      </p>
    </Form>
  );
};
