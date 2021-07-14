import React from 'react';
import { render } from 'utils/testUtil';
import ResetPassword from '.';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: {},
      asPath: '',
    };
  },
}));

it('It should mount', () => {
  render(<ResetPassword isTokenValid />);
  // expect(screen.getByText('Login Form')).toBeInTheDocument();
});
