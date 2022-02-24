import { render, screen } from '@testing-library/react';
import Broccoli from './Broccoli';

it('renders Request an invite button on the homepage', () => {
  render(<Broccoli />);
  const btnElement = screen.getByText(/Request an invite/i);
  expect(btnElement).toBeInTheDocument();
});
