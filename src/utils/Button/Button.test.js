import { fireEvent, render } from '@testing-library/react';
import Button from './';

describe('Test the Button functionality', () => {
  const baseProps = {
    onClick: jest.fn(),
  };

  it('is disabled when type is passed as disabled', () => {
    const button = render(<Button {...baseProps} type='disabled' />);
    expect(button.getByRole('button')).toBeDisabled();
  });

  it('is not disabled when type is not passed as disabled', () => {
    const button = render(<Button {...baseProps} />);
    expect(button.getByRole('button')).not.toBeDisabled();
  });

  it('does not pass onClick event when clicked for disabled button', () => {
    const button = render(<Button {...baseProps} type='disabled' />);
    fireEvent.click(button.getByRole('button'));
    expect(baseProps.onClick).toHaveBeenCalledTimes(0);
  });

  it('passes onClick event when clicked', () => {
    const button = render(<Button {...baseProps} />);
    fireEvent.click(button.getByRole('button'));
    expect(baseProps.onClick).toHaveBeenCalledTimes(1);
  });
});
