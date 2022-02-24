import { fireEvent, render, screen } from '@testing-library/react';
import Homepage from './';

it('renders Header as expected', () => {
  const homepage = render(<Homepage />);
  expect(homepage.container).toMatchSnapshot();
});

it('Request an invite buttom opens popup as expected', () => {
  const homepage = render(<Homepage />);
  fireEvent.click(homepage.getByText('Request an invite'));
  expect(screen.getByText('Send!')).toBeDisabled();
});
