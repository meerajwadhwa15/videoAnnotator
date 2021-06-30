import { fireEvent, render, screen } from 'utils/test-util';
import Button from './index';

test('should render button', () => {
  render(<Button label="click me" />);
  expect(screen.getByRole('button')).toBeInTheDocument();
  expect(screen.getByText('click me')).toBeInTheDocument();
});

test('button should be clickable', () => {
  const handleClick = jest.fn();
  render(<Button label="click me" onClick={handleClick} />);
  const button = screen.getByText('click me');
  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalled();
  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(2);
});
