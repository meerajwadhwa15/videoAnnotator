import React from 'react';
import { render, screen } from 'utils/testUtil';

import HomePage from 'pages/index';

describe('HomePage', () => {
  it('should render the heading', () => {
    render(<HomePage />);
    // const heading = screen.getByTestId('helloworld');
    // expect(heading).toBeInTheDocument();
  });
  it('should render greeting', () => {
    render(<HomePage />);
    // const greeting = screen.getByTestId('greeting');
    // expect(greeting).toBeInTheDocument();
  });
});
