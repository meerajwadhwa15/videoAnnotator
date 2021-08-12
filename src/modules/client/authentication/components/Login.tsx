import { Input } from 'components/elements';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { Form, FormGroup, FormCheckbox, Button } from 'shards-react';
import { LoginSchema } from 'validations/LoginSchema';
import { dispatchLogin } from '../actions';
import { loadingSelector, setStatus } from '../slice';
import { AuthStatus } from '../types';

export const Login = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const loading = useAppSelector(loadingSelector);

  const { values, handleChange, setFieldValue, errors, handleSubmit } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
        remember: false,
      },
      validationSchema: LoginSchema(t),
      onSubmit(values) {
        dispatch(dispatchLogin(values));
      },
    });

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        value={values.email}
        onChange={handleChange}
        errorMessage={errors.email}
        name="email"
        label={t('login:loginFormEmailLabel')}
        placeholder={t('login:loginFormEmailPlaceholder')}
        autoComplete="email"
      />
      <Input
        value={values.password}
        onChange={handleChange}
        errorMessage={errors.password}
        name="password"
        label={t('login:loginFormPasswordTitle')}
        type="password"
        placeholder={t('login:loginFormPasswordPlaceholder')}
        autoComplete="current-password"
      />
      <FormGroup>
        <FormCheckbox
          id="remember_me"
          name="remember"
          checked={values.remember}
          onChange={() => setFieldValue('remember', !values.remember)}
        >
          {t('login:loginFormRememberTitle')}
        </FormCheckbox>
      </FormGroup>
      <Button
        block
        type="submit"
        disabled={loading}
        className="d-table mx-auto"
      >
        {loading
          ? t('login:loadingSigninTitle')
          : t('login:loginFormSubmitButton')}
      </Button>
      <div className="d-flex mt-4">
        <p
          onClick={() => dispatch(setStatus(AuthStatus.forgotPass))}
          className="text-center hover-underline cursor-pointer mr-2"
        >
          {t('login:toForgotPassword')}
        </p>
        <p
          onClick={() => dispatch(setStatus(AuthStatus.signup))}
          className="text-center hover-underline cursor-pointer"
        >
          {t('login:toSignup')}
        </p>
      </div>
    </Form>
  );
};
