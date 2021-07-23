import { render, screen, fireEvent } from 'utils/testUtil';
import Input from '.';

describe('testing input', () => {
  const onChange = jest.fn();

  it('should render correct', () => {
    render(
      <Input
        onChange={onChange}
        label="Input"
        type="text"
        name="name"
        placeholder="placeholder"
        value="default value"
      />
    );
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('default value');
    expect(input).toHaveAttribute('name', 'name');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('placeholder', 'placeholder');
    fireEvent.change(input, { target: { value: 'a' } });
    expect(onChange).toBeCalled();
  });

  it('should render prefix and errors', () => {
    render(
      <Input
        onChange={onChange}
        label="Input"
        type="text"
        name="name"
        value="default value"
        prefix={<span>prefix</span>}
        errorMessage="has error"
      />
    );
    expect(screen.getByText('prefix')).toBeInTheDocument();
    const error = screen.getByTestId('inputError');
    expect(error).toBeInTheDocument();
    expect(error).toHaveClass('error-text');
  });
});
