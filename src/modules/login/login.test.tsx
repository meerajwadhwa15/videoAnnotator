import React from 'react';
import { render, screen } from 'utils/testUtil';
import Login from '.';

it('It should mount', () => {
  render(<Login />);
  expect(screen.getByText('login:loginFormTitle')).toBeInTheDocument();
});
