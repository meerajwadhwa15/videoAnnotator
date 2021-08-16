import { Input } from 'components/elements';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { Form, Button } from 'shards-react';
import { SignupSchema } from 'validations/SignupSchema';
import { dispatchSignup } from '../actions';
import { loadingSelector, setStatus } from '../slice';
import { AuthStatus } from '../types';

export const Signup = ({ isAdmin }: { isAdmin: boolean }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['common', 'signup']);
  const loading = useAppSelector(loadingSelector);

  const { values, handleChange, errors, handleSubmit } = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      matchingPassword: '',
    },
    validationSchema: SignupSchema(t),
    onSubmit(values) {
      dispatch(dispatchSignup({ ...values, isAdmin }));
    },
  });

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
      <p
        onClick={() => dispatch(setStatus(AuthStatus.login))}
        className="mt-4 text-center hover-underline cursor-pointer"
      >
        {t('signup:toSigninLink')}
      </p>
    </Form>
  );
};
