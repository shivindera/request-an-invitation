import { fireEvent, render } from '@testing-library/react';
import Input from './';

describe('Test the Button functionality', () => {
  const baseProps = {
    name: 'test-input',
    placeholder: 'Test Input',
    type: 'text',
    error: '',
    value: '',
    onChange: jest.fn(),
  };

  it('shows error text when there is an error', () => {
    const input = render(<Input {...baseProps} error='Test Input Error' />);
    expect(input.getByText('Test Input Error')).toBeInTheDocument();
  });

  it('shows no error when no error exists', () => {
    const input = render(<Input {...baseProps} />);
    const inputEl = input.getByPlaceholderText('Test Input');
    const inputError = inputEl.closest('.broccoli-input-container').querySelector('.broccoli-input-error');
    expect(inputError).toHaveTextContent('');
  });

  it('should trigger onChange when text is added', () => {
    const input = render(<Input {...baseProps} />);
    const inputEl = input.getByPlaceholderText('Test Input');
    fireEvent.change(inputEl, { target: { value: 'abcd' } });
    expect(baseProps.onChange).toHaveBeenCalledTimes(1);
  });
});
