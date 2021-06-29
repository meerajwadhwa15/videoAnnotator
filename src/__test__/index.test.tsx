import React from "react";
import { render, screen } from 'utils/test-util';

import HomePage from "pages/index";

describe("HomePage", () => {
  it("should render the heading", () => {
    render(<HomePage />);
    const heading = screen.getByText('Hello World!');
    expect(heading).toBeInTheDocument();
  });
  it('should render greeting', () => {
    render(<HomePage />);
    const greeting = screen.getByText('common:greeting');
    expect(greeting).toBeInTheDocument();
  });
});