/* eslint jsx-a11y/anchor-is-valid: 0 */
import React, { useEffect } from 'react';
import { AuthenticationModule } from 'modules/authentication';
import { useAppDispatch } from 'redux/hooks';
import { resetAuthStatus } from 'modules/authentication/slice';

const Login = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetAuthStatus());
    };
  }, [dispatch]);

  return <AuthenticationModule isAdmin />;
};

export default Login;
