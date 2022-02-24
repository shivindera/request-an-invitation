import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import RequestInvite from './';

describe('Test the RequestInvite field validations', () => {
  it('validates name input correctly', () => {
    const requestInvite = render(<RequestInvite onSubmitSuccess={() => null} />);
    const input = requestInvite.getByPlaceholderText('Full Name');
    const inputError = input.closest('.broccoli-input-container').querySelector('.broccoli-input-error');
    fireEvent.change(input, { target: { value: 'Ab' } });
    expect(inputError).toHaveTextContent('Name has to be more than 3 characters');
    fireEvent.change(input, { target: { value: 'Abcde' } });
    expect(inputError).toHaveTextContent('');
  });

  it('validates email input correctly', () => {
    const requestInvite = render(<RequestInvite onSubmitSuccess={() => null} />);
    const input = requestInvite.getByPlaceholderText('Email');
    const inputError = input.closest('.broccoli-input-container').querySelector('.broccoli-input-error');
    fireEvent.change(input, { target: { value: 'abcd' } });
    expect(inputError).toHaveTextContent('Email not valid');
    fireEvent.change(input, { target: { value: 'abcde@abc.com' } });
    expect(inputError).toHaveTextContent('');
  });

  it('validates confirm email input correctly', () => {
    const requestInvite = render(<RequestInvite onSubmitSuccess={() => null} />);

    const emailInput = requestInvite.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'abcde@abc.com' } });

    const input = requestInvite.getByPlaceholderText('Confirm Email');
    const inputError = input.closest('.broccoli-input-container').querySelector('.broccoli-input-error');
    fireEvent.change(input, { target: { value: 'abcd' } });
    expect(inputError).toHaveTextContent('Emails should match');
    fireEvent.change(input, { target: { value: 'abcde@abc.com' } });
    expect(inputError).toHaveTextContent('');
  });
});

describe('Test the Send button when fields are valid', () => {
  const baseProps = {
    onSubmitSuccess: jest.fn(),
  };

  beforeEach(() => {
    const requestInvite = render(<RequestInvite {...baseProps} />);

    expect(screen.getByText('Send!')).toBeDisabled();
    const name = requestInvite.getByPlaceholderText('Full Name');
    fireEvent.change(name, { target: { value: 'Abc Def' } });
    expect(screen.getByText('Send!')).toBeDisabled();
    const email = requestInvite.getByPlaceholderText('Email');
    fireEvent.change(email, { target: { value: 'abcde@abc.com' } });
    expect(screen.getByText('Send!')).toBeDisabled();
    const confirmEmail = requestInvite.getByPlaceholderText('Confirm Email');
    fireEvent.change(confirmEmail, { target: { value: 'abcde@abc.com' } });
  });

  it('enables button on valid fields', () => {
    expect(screen.getByText('Send!')).not.toBeDisabled();
  });

  it('shows loading on click of Send', () => {
    fireEvent.click(screen.getByText('Send!'));
    expect(screen.getByText('Sending, please wait!')).toBeDisabled();
  });

  it('calls onSubmitSuccess callback when receiving 200 from API', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ errorMessage: '' }),
      })
    );
    fireEvent.click(screen.getByText('Send!'));
    await waitForElementToBeRemoved(() => screen.getByText('Sending, please wait!'));
    expect(baseProps.onSubmitSuccess).toHaveBeenCalledTimes(1);
  });

  it('shows error message when receiving 400 from API', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ errorMessage: 'Bad Request: Email is already in use' }),
      })
    );
    fireEvent.click(screen.getByText('Send!'));
    await waitForElementToBeRemoved(() => screen.getByText('Sending, please wait!'));
    expect(screen.getByText('Bad Request: Email is already in use')).toBeInTheDocument();
  });
});
