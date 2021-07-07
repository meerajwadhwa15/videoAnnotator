import React from 'react';
import { render } from 'utils/testUtil';
import ResetPassword from '.';

it('It should mount', () => {
  render(<ResetPassword />);
  // expect(screen.getByText('Login Form')).toBeInTheDocument();
});
